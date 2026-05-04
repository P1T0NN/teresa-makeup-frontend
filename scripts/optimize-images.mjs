#!/usr/bin/env node
/**
 * Optimizes images under static and writes responsive WebPs to <dir>/opt/.
 * Targets:
 *   static/root/              → URLs like /root/hero.webp
 *   static/root/testimonials/ → /root/testimonials/…
 *   static/testimonials/      → /testimonials/…
 * Run: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { mkdir, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const STATIC = join(PROJECT_ROOT, 'static');

/** Matches /root/*, /root/testimonials/*, and /testimonials/* static URLs */
const INPUT_DIRS = [
	join(STATIC, 'root'),
	join(STATIC, 'root', 'testimonials'),
	join(STATIC, 'testimonials'),
];

const GRID_SIZES = [640, 960, 1280];
const IMAGE_EXT = /\.(png|jpg|jpeg|webp)$/i;

async function ensureDir(p) {
	await mkdir(p, { recursive: true });
}

async function optimizeImage(inputDir, file) {
	const src = join(inputDir, file);
	if (!existsSync(src)) return;

	const baseName = file.replace(IMAGE_EXT, '');
	const outDir = join(inputDir, 'opt');
	await ensureDir(outDir);

	for (const w of GRID_SIZES) {
		await sharp(src)
			.trim()
			.resize(w)
			.webp({ quality: 75 })
			.toFile(join(outDir, `${baseName}-${w}w.webp`));
	}
	console.log(`  ✓ ${file}`);
}

async function main() {
	try {
		const anyDirExists = INPUT_DIRS.some((d) => existsSync(d));
		if (!anyDirExists) {
			console.warn(
				'⊘ No image folders found. Create any you need:\n' +
					'   static/root/                (site images: /root/…)\n' +
					'   static/root/testimonials/\n' +
					'   static/testimonials/\n' +
					'then add .png / .jpg / .jpeg / .webp files (not inside opt/).'
			);
			process.exit(0);
			return;
		}

		let total = 0;
		for (const inputDir of INPUT_DIRS) {
			const label = relative(PROJECT_ROOT, inputDir);

			if (!existsSync(inputDir)) {
				console.log(`⊘ Skipped — folder missing: ${label}/\n`);
				continue;
			}

			const files = await readdir(inputDir);
			const images = files.filter((f) => IMAGE_EXT.test(f) && !f.startsWith('.'));

			if (images.length === 0) {
				console.log(`⊘ Skipped — no images in ${label}/\n`);
				continue;
			}

			console.log(`Optimizing ${label}/ …\n`);
			for (const file of images) {
				await optimizeImage(inputDir, file);
				total += 1;
			}
			console.log(`→ WebPs in ${label}/opt/\n`);
		}

		if (total === 0) {
			console.warn(
				'⊘ No images found in existing folders (only files matching *.png|jpg|jpeg|webp).'
			);
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
