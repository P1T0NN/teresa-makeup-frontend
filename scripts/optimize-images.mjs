#!/usr/bin/env node
/**
 * Optimizes source images under static/ and writes responsive WebPs.
 *
 * Source files: .png / .jpg / .jpeg in each target folder (not existing -{N}w.webp outputs).
 * Output:
 *   static/root/, static/root/about-me/, static/root/portfolio/ → same folder (URLs like /root/…)
 *   static/logo/                                              → opt/ (+ logo.webp primary)
 *   static/root/testimonials/, static/testimonials/             → <dir>/opt/
 *
 * Run: bun run optimize-images
 */
import sharp from 'sharp';
import { mkdir, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const STATIC = join(PROJECT_ROOT, 'static');

/** @type {{ path: string; inPlace: boolean; sizes?: number[]; primaryWebp?: boolean }[]} */
const INPUT_DIRS = [
	{ path: join(STATIC, 'root'), inPlace: true },
	{ path: join(STATIC, 'root', 'about-me'), inPlace: true },
	{ path: join(STATIC, 'root', 'portfolio'), inPlace: true },
	{ path: join(STATIC, 'logo'), inPlace: false, sizes: [64, 96, 128], primaryWebp: true },
	{ path: join(STATIC, 'root', 'testimonials'), inPlace: false },
	{ path: join(STATIC, 'testimonials'), inPlace: false },
];

const DEFAULT_SIZES = [640, 960, 1280];
const SOURCE_EXT = /\.(png|jpe?g)$/i;

async function ensureDir(p) {
	await mkdir(p, { recursive: true });
}

function isSourceImage(file) {
	return SOURCE_EXT.test(file) && !file.startsWith('.');
}

/**
 * @param {string} inputDir
 * @param {string} file
 * @param {{ inPlace: boolean; sizes?: number[]; primaryWebp?: boolean }} options
 */
async function optimizeImage(inputDir, file, { inPlace, sizes, primaryWebp }) {
	const src = join(inputDir, file);
	if (!existsSync(src)) return;

	const baseName = file.replace(SOURCE_EXT, '');
	const outDir = inPlace ? inputDir : join(inputDir, 'opt');
	const widths = sizes ?? DEFAULT_SIZES;
	await ensureDir(outDir);

	for (const w of widths) {
		await sharp(src)
			.trim()
			.resize(w)
			.webp({ quality: 75 })
			.toFile(join(outDir, `${baseName}-${w}w.webp`));
	}

	if (primaryWebp) {
		const maxW = Math.max(...widths);
		await sharp(src)
			.trim()
			.resize(maxW)
			.webp({ quality: 75 })
			.toFile(join(inputDir, `${baseName}.webp`));
	}

	console.log(`  ✓ ${file}`);
}

async function main() {
	try {
		const anyDirExists = INPUT_DIRS.some(({ path }) => existsSync(path));
		if (!anyDirExists) {
			console.warn(
				'⊘ No image folders found. Create any you need:\n' +
					'   static/root/\n' +
					'   static/root/about-me/\n' +
					'   static/root/portfolio/\n' +
					'   static/logo/\n' +
					'   static/root/testimonials/\n' +
					'   static/testimonials/\n' +
					'then add .png / .jpg / .jpeg source files.'
			);
			process.exit(0);
			return;
		}

		let total = 0;
		for (const { path: inputDir, inPlace, sizes, primaryWebp } of INPUT_DIRS) {
			const label = relative(PROJECT_ROOT, inputDir);

			if (!existsSync(inputDir)) {
				console.log(`⊘ Skipped — folder missing: ${label}/\n`);
				continue;
			}

			const files = await readdir(inputDir);
			const images = files.filter(isSourceImage);

			if (images.length === 0) {
				console.log(`⊘ Skipped — no source images in ${label}/\n`);
				continue;
			}

			const outLabel = inPlace ? label : `${label}/opt`;
			console.log(`Optimizing ${label}/ …\n`);
			for (const file of images) {
				await optimizeImage(inputDir, file, { inPlace, sizes, primaryWebp });
				total += 1;
			}
			if (primaryWebp) {
				console.log(`→ WebPs in ${outLabel}/ (+ primary .webp in ${label}/)\n`);
			} else {
				console.log(`→ WebPs in ${outLabel}/\n`);
			}
		}

		if (total === 0) {
			console.warn('⊘ No source images found (.png / .jpg / .jpeg).');
			process.exit(0);
			return;
		}

		console.log(`Done (${total} source image(s)).`);
	} catch (err) {
		console.error('Error:', err.message);
		process.exit(1);
	}
}

main();
