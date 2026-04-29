<script lang="ts">
	// LIBRARIES
	import { m } from '@/shared/lib/paraglide/messages';
	
	// CLASSES
	import { bookingSectionClass } from './bookingSection.svelte.ts';

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
	import BookingConfirmButton from './booking-confirm-button.svelte';

	// UTILS
	import { clearValibotFieldError } from '@/shared/utils/validationUtils.js';

	type Props = {
		statusText: string;
	};

	let { statusText }: Props = $props();
</script>

<Card.Root class="h-full gap-0 p-4 sm:p-5">
	<Card.Header class="p-0">
		<Card.Title class="text-base font-semibold text-foreground">{m['RootPage.BookingSection.yourDetails']()}</Card.Title>

		<p class="mt-2 text-sm leading-snug font-semibold text-foreground sm:text-base">
			{statusText}
		</p>

		<Card.Description class="mt-1.5 text-sm text-muted-foreground">
			{m['RootPage.BookingSection.weWillUseThisToConfirmYourReservation']()}
		</Card.Description>
	</Card.Header>

	<Card.Content class="p-0 pt-3">
		<FieldSet>
			<FieldGroup class="gap-4">
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<Field data-invalid={Boolean(bookingSectionClass.fieldErrors.name)}>
						<FieldLabel for="booking-name">{m['RootPage.BookingSection.name']()}</FieldLabel>

						<FieldContent>
							<Input
								id="booking-name"
								bind:value={bookingSectionClass.bookingInputs.name}
								name="name"
								autocomplete="name"
								placeholder={m['RootPage.BookingSection.yourFullName']()}
								aria-invalid={Boolean(bookingSectionClass.fieldErrors.name)}
								oninput={() =>
									(bookingSectionClass.fieldErrors = clearValibotFieldError(
										bookingSectionClass.fieldErrors,
										'name'
									))}
							/>

							{#if bookingSectionClass.fieldErrors.name}
								<FieldError>{bookingSectionClass.fieldErrors.name}</FieldError>
							{/if}
						</FieldContent>
					</Field>

					<Field data-invalid={Boolean(bookingSectionClass.fieldErrors.email)}>
						<FieldLabel for="booking-email">{m['RootPage.BookingSection.email']()}</FieldLabel>

						<FieldContent>
							<Input
								id="booking-email"
								bind:value={bookingSectionClass.bookingInputs.email}
								type="email"
								name="email"
								autocomplete="email"
								placeholder={m['RootPage.BookingSection.yourEmail']()}
								aria-invalid={Boolean(bookingSectionClass.fieldErrors.email)}
								oninput={() =>
									(bookingSectionClass.fieldErrors = clearValibotFieldError(
										bookingSectionClass.fieldErrors,
										'email'
									))}
							/>

							{#if bookingSectionClass.fieldErrors.email}
								<FieldError>{bookingSectionClass.fieldErrors.email}</FieldError>
							{/if}
						</FieldContent>
					</Field>

					<div class="md:col-span-2">
						<Field data-invalid={Boolean(bookingSectionClass.fieldErrors.phone)}>
							<FieldLabel
								for="booking-phone"
								class="inline-flex w-full min-w-0 flex-wrap items-baseline gap-x-1.5 gap-y-0"
							>
								<span>{m['RootPage.BookingSection.phone']()}</span>

								<span class="font-normal text-muted-foreground">({m['RootPage.BookingSection.optional']()})</span>
							</FieldLabel>

							<FieldContent>
								<Input
									id="booking-phone"
									bind:value={bookingSectionClass.bookingInputs.phone}
									type="tel"
									name="phone"
									autocomplete="tel"
									placeholder="+34 …"
									aria-describedby="booking-phone-hint"
									aria-invalid={Boolean(bookingSectionClass.fieldErrors.phone)}
									oninput={() =>
										(bookingSectionClass.fieldErrors = clearValibotFieldError(
											bookingSectionClass.fieldErrors,
											'phone'
										))}
								/>

								<p
									id="booking-phone-hint"
									class="mt-1.5 max-w-2xl text-xs leading-snug text-muted-foreground"
								>
									{m['RootPage.BookingSection.phoneDescription']()}
								</p>

								{#if bookingSectionClass.fieldErrors.phone}
									<FieldError>{bookingSectionClass.fieldErrors.phone}</FieldError>
								{/if}
							</FieldContent>
						</Field>
					</div>
				</div>
			</FieldGroup>
		</FieldSet>

		<BookingConfirmButton />
	</Card.Content>
</Card.Root>
