<script lang="ts">
	// LIBRARIES
	import { safeParse } from 'valibot';

	// COMPONENTS
	import * as Card from '@/shared/components/ui/card/index.js';
	import {
		Field,
		FieldContent,
		FieldError,
		FieldGroup,
		FieldLabel,
		FieldSet
	} from '@/shared/components/ui/field';
	import { Input } from '@/shared/components/ui/input/index.js';
	import { Button } from '@/shared/components/ui/button/index.js';

	// SCHEMAS
	import { bookingReservationFormSchema, type BookingReservationFormField } from '@/features/booking/schemas/bookingSchemas';

	// UTILS
	import { clearValibotFieldError, valibotFieldErrors } from '@/shared/utils/valibotFieldErrors.js';

	type Props = {
		statusText: string;
	};

	let { statusText }: Props = $props();

	let name = $state('');
	let email = $state('');
	let phone = $state('');

	let fieldErrors = $state<Partial<Record<BookingReservationFormField, string>>>({});

	function confirmReservation() {
		const result = safeParse(bookingReservationFormSchema, { name, email, phone });
		if (!result.success) {
			fieldErrors = valibotFieldErrors<BookingReservationFormField>(result.issues);
			return;
		}
		fieldErrors = {};
	}
</script>

<Card.Root class="h-full gap-0 p-4 sm:p-5">
	<Card.Header class="p-0">
		<Card.Title class="text-base font-semibold text-foreground">Your details</Card.Title>
		<p class="mt-2 text-sm font-semibold leading-snug text-foreground sm:text-base">
			{statusText}
		</p>
		<Card.Description class="mt-1.5 text-sm text-muted-foreground">
			We'll use this to confirm your reservation.
		</Card.Description>
	</Card.Header>

	<Card.Content class="p-0 pt-3">
		<FieldSet>
			<FieldGroup class="gap-4">
				<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
					<Field data-invalid={Boolean(fieldErrors.name)}>
						<FieldLabel for="booking-name">Name</FieldLabel>
						<FieldContent>
							<Input
								id="booking-name"
								bind:value={name}
								name="name"
								autocomplete="name"
								placeholder="Your full name"
								aria-invalid={Boolean(fieldErrors.name)}
								oninput={() =>
									(fieldErrors = clearValibotFieldError(fieldErrors, 'name'))}
							/>
							{#if fieldErrors.name}
								<FieldError>{fieldErrors.name}</FieldError>
							{/if}
						</FieldContent>
					</Field>

					<Field data-invalid={Boolean(fieldErrors.email)}>
						<FieldLabel for="booking-email">Email</FieldLabel>
						<FieldContent>
							<Input
								id="booking-email"
								bind:value={email}
								type="email"
								name="email"
								autocomplete="email"
								placeholder="you@example.com"
								aria-invalid={Boolean(fieldErrors.email)}
								oninput={() =>
									(fieldErrors = clearValibotFieldError(fieldErrors, 'email'))}
							/>
							{#if fieldErrors.email}
								<FieldError>{fieldErrors.email}</FieldError>
							{/if}
						</FieldContent>
					</Field>

					<Field data-invalid={Boolean(fieldErrors.phone)}>
						<FieldLabel
							for="booking-phone"
							class="inline-flex w-full min-w-0 flex-wrap items-baseline gap-x-1.5 gap-y-0"
						>
							<span>Phone</span>
							<span class="text-muted-foreground font-normal">(Optional)</span>
						</FieldLabel>
						<FieldContent>
							<Input
								id="booking-phone"
								bind:value={phone}
								type="tel"
								name="phone"
								autocomplete="tel"
								placeholder="+34 …"
								aria-invalid={Boolean(fieldErrors.phone)}
								oninput={() =>
									(fieldErrors = clearValibotFieldError(fieldErrors, 'phone'))}
							/>
							{#if fieldErrors.phone}
								<FieldError>{fieldErrors.phone}</FieldError>
							{/if}
						</FieldContent>
					</Field>
				</div>
			</FieldGroup>
		</FieldSet>

		<Button type="button" class="mt-4 w-full shadow-none" onclick={confirmReservation}>
			Confirm Reservation
		</Button>
	</Card.Content>
</Card.Root>
