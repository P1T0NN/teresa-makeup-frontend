<script lang="ts">
	// COMPONENTS
	import * as Card from '@/shared/components/ui/card/index.js';
	import { Skeleton } from '@/shared/components/ui/skeleton/index.js';
</script>

<!--
  Mirrors calendar-with-time layout (calendar + legend + time rail) so the booking grid
  doesn’t jump when real data replaces this placeholder.
-->
<Card.Root class="h-full gap-0 p-0">
	<Card.Content class="relative h-full p-0 md:pe-48">
		<div class="p-6">
			<!-- Month header -->
			<div class="mb-4 flex items-center justify-between gap-4 px-1">
				<Skeleton class="h-5 w-36 rounded-md bg-primary/20 sm:h-6" />
				<div class="flex gap-1">
					<Skeleton class="size-8 rounded-md bg-primary/20" />
					<Skeleton class="size-8 rounded-md bg-primary/20" />
				</div>
			</div>

			<!-- Weekday row -->
			<div class="mb-2 flex justify-between gap-1.5 px-0.5">
				{#each [...Array(7).keys()] as i (i)}
					<Skeleton class="h-3 max-w-10 flex-1 rounded-sm bg-primary/20" />
				{/each}
			</div>

			<!-- Day grid (6 × 7) — spacing aligned with real calendar gap-x-1.5 -->
			<div class="grid grid-cols-7 gap-x-1.5 gap-y-2">
				{#each [...Array(42).keys()] as i (i)}
					<Skeleton class="h-9 w-full rounded-md bg-primary/20 sm:h-10 md:h-11" />
				{/each}
			</div>

			<!-- Legend -->
			<div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5">
				<span class="inline-flex items-center gap-1.5">
					<Skeleton class="h-4 w-4 rounded-sm bg-primary/20" />
					<Skeleton class="h-3 w-16 rounded-sm bg-primary/20" />
				</span>
				<span class="inline-flex items-center gap-1.5">
					<Skeleton class="h-4 w-4 rounded-sm bg-primary/20" />
					<Skeleton class="h-3 w-20 rounded-sm bg-primary/20" />
				</span>
				<span class="inline-flex items-center gap-1.5">
					<Skeleton class="h-4 w-4 rounded-sm bg-primary/20" />
					<Skeleton class="h-3 w-14 rounded-sm bg-primary/20" />
				</span>
			</div>
		</div>

		<!-- Time slots rail -->
		<div
			class="no-scrollbar inset-y-0 end-0 flex max-h-72 w-full flex-col gap-4 overflow-hidden border-t p-6 md:absolute md:max-h-none md:w-48 md:border-s md:border-t-0"
		>
			<div class="grid gap-2">
				{#each [...Array(10).keys()] as i (i)}
					<Skeleton class="h-9 w-full rounded-lg bg-primary/20" />
				{/each}
			</div>
		</div>
	</Card.Content>
</Card.Root>
