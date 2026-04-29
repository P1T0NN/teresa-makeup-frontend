<script lang="ts">
	// SVELTEKIT
	import { page } from '$app/state';

	// LIBRARIES
	import { setLocale, getLocale } from '@/shared/lib/paraglide/runtime';

	// COMPONENTS
	import { Select, SelectTrigger, SelectContent, SelectItem } from '@/shared/components/ui/select';

	// SVGS
	import UnitedKingdomFlag from '@/shared/svgs/united-kingdom-flag.svelte';
	import GermanyFlag from '@/shared/svgs/germany-flag.svelte';
	import SpainFlag from '@/shared/svgs/spain-flag.svelte';

	// UTILS
	import { cn } from '@/shared/utils/utils';

	interface Props {
		variant?: 'default' | 'header';
	}

	let { variant = 'default' }: Props = $props();

	const languages = [
		{ name: 'English', locale: 'en' as const, code: 'EN' },
		{ name: 'Deutsch', locale: 'de' as const, code: 'DE' },
		{ name: 'Español', locale: 'es' as const, code: 'ES' }
	] as const;

	type AppLocale = (typeof languages)[number]['locale'];

	function localeFromRouter(): AppLocale {
		const l = getLocale();
		if (l === 'de' || l === 'es') return l;
		return 'en';
	}

	let selectedLanguage = $state<AppLocale>(localeFromRouter());

	$effect(() => {
		void page.url.href;
		selectedLanguage = localeFromRouter();
	});

	function handleLanguageChange(languageCode: string) {
		const locale = languageCode as AppLocale;
		selectedLanguage = locale;
		setLocale(locale);
	}
</script>

<Select type="single" bind:value={selectedLanguage} onValueChange={handleLanguageChange}>
	<SelectTrigger
		class={cn(
			'flex w-auto items-center space-x-2',
			variant === 'header' &&
				'border-hero-overlay-foreground/20 bg-hero-overlay-foreground/10 hover:bg-hero-overlay-foreground/20'
		)}
	>
		{#if selectedLanguage === 'en'}
			<UnitedKingdomFlag />
		{:else if selectedLanguage === 'de'}
			<GermanyFlag />
		{:else}
			<SpainFlag />
		{/if}

		<span
			class={cn(
				'font-dm-sans text-sm font-medium',
				variant === 'header' ? 'text-hero-overlay-foreground' : 'text-foreground'
			)}
		>
			{languages.find((l) => l.locale === selectedLanguage)?.code ?? 'EN'}
		</span>
	</SelectTrigger>

	<SelectContent>
		{#each languages as language}
			<SelectItem value={language.locale}>
				<div class="flex items-center space-x-3">
					{#if language.locale === 'en'}
						<UnitedKingdomFlag />
					{:else if language.locale === 'de'}
						<GermanyFlag />
					{:else}
						<SpainFlag />
					{/if}

					<div class="flex flex-col">
						<span class="font-dm-sans text-sm font-medium">
							{language.name}
						</span>

						<span class="font-dm-sans text-xs text-muted-foreground">
							{language.code}
						</span>
					</div>
				</div>
			</SelectItem>
		{/each}
	</SelectContent>
</Select>
