<script lang="ts">
	// SVELTEKIT IMPORTS
	import { SvelteSet } from 'svelte/reactivity';

	// LIBRARIES
	import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';

	// COMPONENTS
	import { Button } from '@/shared/components/ui/button/index.js';
	import * as Card from '@/shared/components/ui/card/index.js';
	import Calendar from '@/shared/components/ui/calendar/calendar.svelte';

	// UTILS
	import { busyApiToMsIntervals, type BusyApiSlot } from '@/features/booking/utils/busyIntervals';
	import { buildBusyTimesForSelectedDate } from '@/features/booking/utils/busyTimesForSelectedDate';
	import { createIsDateUnavailable } from '@/features/booking/utils/isDateUnavailable';
	import { cn } from '@/shared/utils/utils.js';

	// TYPES
	import type { MsInterval } from '@/features/booking/utils/isOverlap';

	type Props = {
		/** Busy intervals from Google Calendar `freebusy` (ISO `start` / `end`). Passed from parent. */
		busy: readonly BusyApiSlot[];
		value?: CalendarDate;
		selectedTime?: string | null;
	};

	let {
		busy,
		value = $bindable<CalendarDate | undefined>(),
		selectedTime = $bindable<string | null>(null)
	}: Props = $props();

	const FIRST_HOUR = 10;
	const LAST_HOUR_INCLUSIVE = 19;
	const SLOT_MINUTES = 60;
	const SLOT_MS = SLOT_MINUTES * 60 * 1000;

	const todayDate = today(getLocalTimeZone());
	const timeSlots = Array.from(
		{ length: LAST_HOUR_INCLUSIVE - FIRST_HOUR + 1 },
		(_, i) => `${(FIRST_HOUR + i).toString().padStart(2, '0')}:00`
	);

	const tz = getLocalTimeZone();

	const busyIntervals: MsInterval[] = $derived(busyApiToMsIntervals(busy));

	const isDateUnavailable = $derived.by(() =>
		createIsDateUnavailable(timeSlots, busyIntervals, tz, SLOT_MS)
	);

	const busyTimesForSelectedDate = $derived.by(
		() =>
			new SvelteSet(
				buildBusyTimesForSelectedDate(value, timeSlots, busyIntervals, tz, SLOT_MS)
			)
	);

	$effect(() => {
		if (selectedTime && busyTimesForSelectedDate.has(selectedTime)) {
			selectedTime = null;
		}
	});
</script>

<Card.Root class="h-full gap-0 p-0">
	<Card.Content class="relative h-full p-0 md:pe-48">
		<div class="booking-calendar p-6">
			<Calendar
				type="single"
				bind:value
				minValue={todayDate}
				{isDateUnavailable}
				class="bg-transparent p-0 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(12)] [--cell-height:--spacing(9)] sm:[--cell-size:--spacing(14)] sm:[--cell-height:--spacing(10)] md:[--cell-size:--spacing(16)] md:[--cell-height:--spacing(11)] [&_tr]:gap-x-1.5"
				weekdayFormat="short"
			/>

			<div
				class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground"
			>
				<span class="inline-flex items-center gap-1.5">
					<span class="inline-block h-4 w-4 rounded-sm bg-green-100"></span>
					Available
				</span>
				<span class="inline-flex items-center gap-1.5">
					<span class="inline-block h-4 w-4 rounded-sm bg-red-100"></span>
					Unavailable
				</span>
				<span class="inline-flex items-center gap-1.5">
					<span class="inline-block h-4 w-4 rounded-sm bg-primary"></span>
					Selected
				</span>
			</div>
		</div>

		<div
			class="no-scrollbar inset-y-0 end-0 flex max-h-72 w-full scroll-pb-6 flex-col gap-4 overflow-y-auto border-t p-6 md:absolute md:max-h-none md:w-48 md:border-s md:border-t-0"
		>
			<div class="grid gap-2">
				{#each timeSlots as time (time)}
					{@const isBusy = busyTimesForSelectedDate.has(time)}
					<Button
						variant={selectedTime === time ? 'default' : isBusy ? 'destructive' : 'outline'}
						disabled={isBusy}
						onclick={() => (selectedTime = time)}
						class={cn('w-full shadow-none', isBusy && 'disabled:opacity-100 line-through')}
					>
						{time}
					</Button>
				{/each}
			</div>
		</div>
	</Card.Content>
</Card.Root>

<style>
	.booking-calendar :global([data-bits-day]) {
		background-color: var(--color-green-100);
		color: var(--color-green-800);
	}

	.booking-calendar :global([data-bits-day][data-unavailable]) {
		background-color: var(--color-red-100);
		color: var(--color-red-800);
		text-decoration: line-through;
	}

	.booking-calendar :global([data-bits-day][data-selected]) {
		background-color: var(--color-primary);
		color: var(--color-primary-foreground);
	}

	.booking-calendar :global([data-bits-day][data-outside-month]) {
		visibility: hidden;
		pointer-events: none;
	}

	.booking-calendar
		:global([data-bits-day][data-disabled]:not([data-selected]):not([data-unavailable])) {
		background-color: transparent;
		color: var(--color-muted-foreground);
	}

	.booking-calendar :global([data-bits-day][data-disabled][data-unavailable]) {
		opacity: 0.55;
	}
</style>
