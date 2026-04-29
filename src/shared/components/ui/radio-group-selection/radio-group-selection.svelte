<script lang="ts">
	// COMPONENTS
	import Label from '@/shared/components/ui/label/label.svelte';
	import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';

	type Option = {
		id: string;
		label: string;
		/** Short secondary text (e.g. duration), shown at the end of the row */
		detail?: string;
	};

	type Props = {
		value?: string;
		options: Option[];
		ariaLabel?: string;
	};

	let {
		value = $bindable(''),
		options,
		ariaLabel = 'Selection'
	}: Props = $props();
</script>

<RadioGroup bind:value class="mt-5 gap-3" aria-label={ariaLabel}>
	{#each options as option (option.id)}
		<Label
			for={option.id}
			class="flex w-full cursor-pointer items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5 transition-colors hover:bg-muted/40 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5"
		>
			<RadioGroupItem id={option.id} value={option.id} />
			<span class="flex min-w-0 flex-1 items-center justify-between gap-2">
				<span class="text-sm font-medium text-foreground">{option.label}</span>
				{#if option.detail}
					<span class="shrink-0 text-xs font-medium tabular-nums text-muted-foreground">{option.detail}</span>
				{/if}
			</span>
		</Label>
	{/each}
</RadioGroup>
