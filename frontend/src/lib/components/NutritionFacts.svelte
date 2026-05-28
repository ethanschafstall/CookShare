<script lang="ts">
	type Facts = {
		totalCalories: number;
		totalProteinG: number;
		totalFatG: number;
		totalFatSaturatedG: number;
		totalCarbsG: number;
		totalCarbsSugarsG: number;
		totalFiberG: number;
		totalSodiumMg: number;
	};

	let { facts = null, servings = 1 }: { facts?: Facts | null; servings?: number } = $props();

	// Stored values are totals for the whole recipe; the label is per serving.
	const perServing = (total: number) =>
		Math.round((Number(total) / Math.max(servings, 1)) * 10) / 10;

	// When facts haven't been built yet, show a dash instead of a number.
	const val = (total: number | undefined, unit = '') =>
		facts ? `${perServing(total ?? 0)}${unit}` : '—';

	// For gram values, trim a trailing .0 so "23.0g" renders as "23g".
	const gVal = (total: number | undefined) =>
		facts ? `${Number(perServing(total ?? 0).toFixed(1))}g` : '—';
</script>

<div class="mx-auto max-w-sm border border-border-light bg-surface px-5 py-4 text-text">
	<h2 class="text-center text-2xl font-normal text-text">Nutrition Facts</h2>
	<p class="mt-1 text-sm text-text-tertiary">Per serving</p>

	<div class="mt-2 border-t-4 border-text">
		<div class="flex justify-between border-b border-border-light py-1.5">
			<span>Calories</span>
			<span>{val(facts?.totalCalories)}</span>
		</div>

		<div class="flex justify-between py-1.5">
			<span>Fat</span>
			<span>{gVal(facts?.totalFatG)}</span>
		</div>
		<div class="flex justify-between border-b border-border-light py-1.5 pl-4">
			<span>Saturated</span>
			<span>{gVal(facts?.totalFatSaturatedG)}</span>
		</div>

		<div class="flex justify-between py-1.5">
			<span>Carbohydrates</span>
			<span>{gVal(facts?.totalCarbsG)}</span>
		</div>
		<div class="flex justify-between py-1.5 pl-4">
			<span>Sugars</span>
			<span>{gVal(facts?.totalCarbsSugarsG)}</span>
		</div>
		<div class="flex justify-between border-b border-border-light py-1.5 pl-4">
			<span>Fiber</span>
			<span>{gVal(facts?.totalFiberG)}</span>
		</div>

		<div class="flex justify-between border-b border-border-light py-1.5">
			<span>Protein</span>
			<span>{gVal(facts?.totalProteinG)}</span>
		</div>

		<div class="flex justify-between py-1.5">
			<span>Sodium</span>
			<span>{val(facts?.totalSodiumMg, 'mg')}</span>
		</div>
	</div>

	{#if !facts}
		<p class="mt-3 text-center text-xs text-text-muted">
			Nutritional data is being calculated. Reload the page in a moment.
		</p>
	{/if}
</div>
