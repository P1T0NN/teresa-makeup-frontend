<script lang="ts">
	// SVELTEKIT IMPORTS
	import { onMount } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';

	// LIBRARIES
	import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
	import { m } from '@/shared/lib/paraglide/messages';

	// CONFIG
	import { COMPANY_DATA } from '@/shared/constants';

	// COMPONENTS
	import { Button } from '@/shared/components/ui/button/index.js';
	import * as Card from '@/shared/components/ui/card/index.js';
	import Calendar from '@/shared/components/ui/calendar/calendar.svelte';

	// DATA
	import { getServiceBookingDurationMs } from '@/features/booking/utils/serviceBookingDuration';

	// UTILS
	import { busyApiToMsIntervals, type BusyApiSlot } from '@/features/booking/utils/busyIntervals';
	import { buildBusyTimesForSelectedDate } from '@/features/booking/utils/busyTimesForSelectedDate';
	import { getBookingStartTimeSlotsForService } from '@/features/booking/utils/bookingStartSlots';
	import { createIsDateUnavailable } from '@/features/booking/utils/isDateUnavailable';
	import { dateAtTimeMs } from '@/shared/utils/dateUtils';
	import { cn } from '@/shared/utils/utils.js';

	// TYPES
	import type { MsInterval } from '@/features/booking/utils/isOverlap';
	import type { typesServiceOptionId } from '@/features/services/types/servicesTypes';

	type Props = {
		/** Busy intervals from Google Calendar `freebusy` (ISO `start` / `end`). Passed from parent. */
		busy: readonly BusyApiSlot[];
		service: typesServiceOptionId;
		value?: CalendarDate;
		selectedTime?: string | null;
	};

	let {
		busy,
		service,
		value = $bindable<CalendarDate | undefined>(),
		selectedTime = $bindable<string | null>(null)
	}: Props = $props();

	const candidateSlots = $derived(getBookingStartTimeSlotsForService(service));
	const appointmentDurationMs = $derived(getServiceBookingDurationMs(service));

	const todayDate = today(getLocalTimeZone());

	/** Same-day and next-day bookings are not allowed — earliest selectable calendar day is the day after tomorrow */
	const earliestBookingDate = todayDate.add({ days: 2 });

	const tz = getLocalTimeZone();

	const busyIntervals: MsInterval[] = $derived(busyApiToMsIntervals(busy));

	const isDateUnavailable = $derived.by(() =>
		createIsDateUnavailable(candidateSlots, busyIntervals, tz, appointmentDurationMs)
	);

	const busyTimesForSelectedDate = $derived.by(
		() =>
			new SvelteSet(
				buildBusyTimesForSelectedDate(value, candidateSlots, busyIntervals, tz, appointmentDurationMs)
			)
	);

	let nowMs = $state(Date.now());

	onMount(() => {
		const id = window.setInterval(() => {
			nowMs = Date.now();
		}, 30_000);
		return () => clearInterval(id);
	});

	function slotHasEndedForSelectedDate(calDate: CalendarDate | undefined, timeSlot: string): boolean {
		if (calDate === undefined) return false;
		const start = dateAtTimeMs(calDate, timeSlot, COMPANY_DATA.SALON_TIMEZONE);
		return start + appointmentDurationMs <= nowMs;
	}

	$effect(() => {
		if (value === undefined) return;
		// Booking must be on/after earliestBookingDate; clear stale too-soon selections
		if (value.compare(earliestBookingDate) < 0) {
			value = undefined;
			selectedTime = null;
		}
	});

	$effect(() => {
		if (selectedTime && !candidateSlots.includes(selectedTime)) selectedTime = null;
	});

	$effect(() => {
		if (!selectedTime || !value) return;
		const busyNow = busyTimesForSelectedDate.has(selectedTime);
		const past = slotHasEndedForSelectedDate(value, selectedTime);
		if (busyNow || past) selectedTime = null;
	});
</script>

<Card.Root class="h-full gap-0 p-0">
	<Card.Content class="relative h-full p-0 md:pe-48">
		<div class="booking-calendar p-4 sm:p-6">
			<Calendar
				type="single"
				bind:value
				minValue={earliestBookingDate}
				{isDateUnavailable}
				class="bg-transparent p-0 [--cell-radius:var(--radius-md)] [--cell-height:--spacing(9)] sm:[--cell-height:--spacing(10)] md:[--cell-height:--spacing(11)] [&_tr]:gap-x-1 sm:[&_tr]:gap-x-1.5"
				weekdayFormat="short"
			/>

			<div
				class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground"
			>
				<span class="inline-flex items-center gap-1.5">
					<span class="inline-block h-4 w-4 rounded-sm bg-amber-300 ring-1 ring-amber-950/10 dark:bg-amber-400 dark:ring-amber-950/25"></span>
					{m['CalendarWithTime.todayNotBookable']()}
				</span>

				<span class="inline-flex items-center gap-1.5">
					<span class="inline-block h-4 w-4 rounded-sm bg-green-100"></span>
					{m['CalendarWithTime.available']()}
				</span>
				
				<span class="inline-flex items-center gap-1.5">
					<span class="inline-block h-4 w-4 rounded-sm bg-red-100"></span>
					{m['CalendarWithTime.unavailableBooked']()}
				</span>

				<span class="inline-flex items-center gap-1.5">
					<span class="inline-block h-4 w-4 rounded-sm bg-primary"></span>
					{m['CalendarWithTime.selected']()}
				</span>
			</div>
		</div>

		<div
			class="no-scrollbar inset-y-0 end-0 flex max-h-72 w-full scroll-pb-6 flex-col gap-4 overflow-y-auto border-t p-6 md:absolute md:max-h-none md:w-48 md:border-s md:border-t-0"
		>
			<div class="grid gap-2">
				{#each candidateSlots as time (time)}
					{@const isBusy = busyTimesForSelectedDate.has(time)}
					{@const isPast = value !== undefined && slotHasEndedForSelectedDate(value, time)}
					{@const blocked = isBusy || isPast}

					<Button
						variant={selectedTime === time ? 'default' : blocked ? 'destructive' : 'outline'}
						disabled={blocked}
						title={isPast
							? m['CalendarWithTime.thisTimeHasAlreadyEnded']()
							: isBusy
								? m['CalendarWithTime.notAvailable']()
								: ''}
						onclick={() => (selectedTime = time)}
						class={cn('w-full shadow-none', blocked && 'disabled:opacity-100 line-through')}
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
		background-color: transparent;
		color: var(--color-muted-foreground);
		text-decoration: none;
		opacity: 0.5;
		pointer-events: none;
	}

	.booking-calendar :global([data-bits-day][data-selected]) {
		background-color: var(--color-primary);
		color: var(--color-primary-foreground);
	}

	.booking-calendar :global([data-bits-day][data-outside-month]) {
		visibility: hidden;
		pointer-events: none;
	}

	/* Disabled “gray” days — not today (today uses amber block below) */
	.booking-calendar
		:global(
			[data-bits-day][data-disabled]:not([data-selected]):not([data-unavailable]):not([data-today])
		) {
		background-color: transparent;
		color: var(--color-muted-foreground);
	}

	.booking-calendar :global([data-bits-day][data-disabled][data-unavailable]) {
		opacity: 0.55;
	}

	/* Today: full amber fill (must beat disabled/transparent + Day `bg-accent` utilities) */
	.booking-calendar :global([data-bits-day][data-today]:not([data-selected])) {
		border: none !important;
		background-color: var(--color-amber-300) !important;
		color: var(--color-amber-950) !important;
		font-weight: 600;
		opacity: 1 !important;
		pointer-events: none;
		text-decoration: none !important;
		box-shadow: none;
	}

	.booking-calendar :global([data-bits-day][data-today]:not([data-selected]) span) {
		color: inherit !important;
		opacity: 1 !important;
	}
</style>
