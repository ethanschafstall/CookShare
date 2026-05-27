<script lang="ts">
	import { enhance } from '$app/forms';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { onMount } from 'svelte';

	let cameFromMyRecipes = $state(false);
	let { data } = $props();
	const recipe = $derived(data.recipe);
	const user = $derived(data.user);
	const images = $derived(recipe.images);
	const ingredients = $derived(recipe.ingredients);
	const steps = $derived(recipe.steps);

	let activeImage = $state(0);
	let confirming = $state(false);
	let deleteForm = $state<HTMLFormElement | null>(null);

	// Show edit/delete to the owner
	const canManage = $derived(!!user && (user.id === recipe.userId || user.role === 'admin'));

	const half = $derived(Math.ceil(ingredients.length / 2));
	const leftIngredients = $derived(ingredients.slice(0, half));
	const rightIngredients = $derived(ingredients.slice(half));

	function confirmDelete() {
		deleteForm?.requestSubmit();
	}
	onMount(() => {
		cameFromMyRecipes = document.referrer.includes('/myrecipes');
	});
</script>

{#if canManage}
	<div class="flex shrink-0 gap-2 justify-self-end">
		{#if cameFromMyRecipes}
			<Button
				variant="ghost"
				size="icon"
				href="/myrecipes"
				rel="external"
				aria-label="Back to my recipes"
			>
				<Icon name="chevron-left" size={16} />
			</Button>
		{/if}
		<Button
			variant="ghost"
			size="icon"
			onclick={() => (confirming = true)}
			aria-label="Delete recipe"
			class="hover:border-primary hover:text-primary"
		>
			<Icon name="trash" size={16} />
		</Button>
	</div>
{/if}
<article class="min-h-screen px-8 py-10">
	<div class="mx-auto max-w-5/6">
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
						<Icon name="eye" size={14} />
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
					<Card padding="md">
						<p class="text-xs text-text-tertiary">Prep time</p>
						<p class="text-sm font-medium text-text">{recipe.prepTimeMin} min</p>
					</Card>
					<Card padding="md">
						<p class="text-xs text-text-tertiary">Cook time</p>
						<p class="text-sm font-medium text-text">{recipe.cookTimeMin} min</p>
					</Card>
					<Card padding="md">
						<p class="text-xs text-text-tertiary">Difficulty</p>
						<p class="text-sm font-medium text-text">
							{recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
						</p>
					</Card>
					<Card padding="md">
						<p class="text-xs text-text-tertiary">Servings</p>
						<p class="text-sm font-medium text-text">{recipe.servings}</p>
					</Card>
				</div>
			</div>

			<div class="flex flex-col gap-4">
				<div class="flex items-start justify-between gap-4">
					<h1 class="text-4xl font-semibold text-text">{recipe.title}</h1>
				</div>

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

<!-- Hidden delete form, submitted on confirm -->
{#if canManage}
	<form bind:this={deleteForm} method="POST" action="?/delete" use:enhance class="hidden"></form>
{/if}

<ConfirmDialog
	open={confirming}
	title="Delete recipe?"
	message="{recipe.title} will be permanently deleted. This cannot be undone."
	confirmLabel="Delete"
	variant="danger"
	onConfirm={confirmDelete}
	onCancel={() => (confirming = false)}
/>
