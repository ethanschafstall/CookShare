<script lang="ts">
	let { data } = $props();

	const recipe = data.recipe;
	const images = recipe.images;
	const ingredients = recipe.ingredients;
	const steps = recipe.steps;

	let activeImage = $state(0);

	// Split ingredients into two columns
	const half = Math.ceil(ingredients.length / 2);
	const leftIngredients = ingredients.slice(0, half);
	const rightIngredients = ingredients.slice(half);
</script>

<article class="min-h-screen bg-bg px-8 py-10">
	<div class="mx-auto max-w-5xl">
		<!-- Top section -->
		<div class="grid gap-8 md:grid-cols-2">
			<div class="flex flex-col gap-3">
				<div
					class="relative aspect-square overflow-hidden rounded-lg border border-border-light bg-surface"
				>
					{#if images.length > 0}
						<img
							src={images[activeImage].storagePath}
							alt={images[activeImage].altText || recipe.title}
							class="h-full w-full object-cover"
						/>
					{:else}
						<div class="flex h-full w-full items-center justify-center text-text-muted">
							No image
						</div>
					{/if}

					<div
						class="absolute bottom-3 left-3 flex items-center gap-1.5 rounded bg-surface/90 px-2 py-1 text-xs text-text-tertiary"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
							<circle cx="12" cy="12" r="3" />
						</svg>
						{recipe.hits} Views
					</div>

					{#if images.length > 1}
						<div class="absolute right-3 bottom-3 flex gap-1.5">
							{#each images as img, i (img)}
								<button
									type="button"
									onclick={() => (activeImage = i)}
									aria-label="Show image {i + 1}"
									class="h-2 w-2 rounded-full {i === activeImage ? 'bg-primary' : 'bg-border'}"
								></button>
							{/each}
						</div>
					{/if}
				</div>

				<div class="grid grid-cols-4 gap-2">
					<div class="rounded border border-border-light bg-surface px-3 py-2">
						<p class="text-xs text-text-tertiary">Prep time</p>
						<p class="text-sm font-medium text-text">{recipe.prepTimeMin} min</p>
					</div>
					<div class="rounded border border-border-light bg-surface px-3 py-2">
						<p class="text-xs text-text-tertiary">Cook time</p>
						<p class="text-sm font-medium text-text">{recipe.cookTimeMin} min</p>
					</div>
					<div class="rounded border border-border-light bg-surface px-3 py-2">
						<p class="text-xs text-text-tertiary">Difficulty</p>
						<p class="text-sm font-medium text-text">
							{recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
						</p>
					</div>
					<div class="rounded border border-border-light bg-surface px-3 py-2">
						<p class="text-xs text-text-tertiary">Servings</p>
						<p class="text-sm font-medium text-text">{recipe.servings}</p>
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-4">
				<h1 class="text-4xl font-semibold text-text">{recipe.title}</h1>
				<p class="text-base leading-relaxed text-text">{recipe.description}</p>
			</div>
		</div>

		<!-- Ingredients -->
		<section class="mt-16">
			<h2 class="mb-8 text-4xl font-semibold text-text">Ingredients</h2>
			<div class="grid gap-x-12 gap-y-3 md:grid-cols-2">
				<ul class="flex flex-col gap-3 pl-5">
					{#each leftIngredients as ing (ing.displayOrder)}
						<li class="list-disc text-lg text-text">
							{ing.quantityNumeric ?? ''}
							{ing.displayUnit ?? ''}
							{ing.name}
							{#if ing.quantityG}({ing.quantityG}g){/if}
						</li>
					{/each}
				</ul>
				<ul class="flex flex-col gap-3 pl-5">
					{#each rightIngredients as ing (ing.displayOrder)}
						<li class="list-disc text-lg text-text">
							{ing.quantityNumeric ?? ''}
							{ing.displayUnit ?? ''}
							{ing.name}
							{#if ing.quantityG}({ing.quantityG}g){/if}
						</li>
					{/each}
				</ul>
			</div>
		</section>

		<!-- Steps -->
		<section class="mt-16">
			<h2 class="mb-8 text-4xl font-semibold text-text">Steps</h2>
			<ol class="flex flex-col gap-10">
				{#each steps as step (step.stepNumber)}
					<li class="flex items-start gap-5">
						<span
							class="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-surface"
						>
							{step.stepNumber}
						</span>
						<p class="text-base leading-relaxed text-text">{step.instruction}</p>
					</li>
				{/each}
			</ol>
		</section>
	</div>
</article>
