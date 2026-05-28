<script lang="ts">
	import { enhance } from '$app/forms';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	let { data } = $props();
	const recipes = $derived(data.recipes);

	let pending = $state<{ urlId: string; title: string } | null>(null);
	let deleteForm = $state<HTMLFormElement | null>(null);

	function requestDelete(urlId: string, title: string) {
		pending = { urlId, title };
	}

	function confirmDelete() {
		deleteForm?.requestSubmit();
	}

	function cancelDelete() {
		pending = null;
	}
</script>

<div class="mb-8 flex items-center justify-between">
	<h1 class="text-3xl font-semibold text-text">My recipes</h1>
	<Button variant="secondary" href="/myrecipes/create">+ New recipe</Button>
</div>

{#if recipes.length === 0}
	<div class="rounded-lg border border-border-light bg-surface px-8 py-16 text-center">
		<p class="text-lg text-text">No recipes yet</p>
		<p class="mt-2 text-sm text-text-tertiary">Click "+ New recipe" to create your first one.</p>
	</div>
{:else}
	<ul class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
		{#each recipes as recipe (recipe.id)}
			<RecipeCard {recipe} showActions onDelete={requestDelete} />
		{/each}
	</ul>
{/if}

<form
	bind:this={deleteForm}
	method="POST"
	action="?/delete"
	use:enhance={() => {
		return async ({ update }) => {
			await update();
			pending = null;
		};
	}}
	class="hidden"
>
	<input type="hidden" name="urlId" value={pending?.urlId ?? ''} />
</form>

<ConfirmDialog
	open={pending !== null}
	title="Delete recipe?"
	message={pending ? `"${pending.title}" will be permanently deleted. This cannot be undone.` : ''}
	confirmLabel="Delete"
	variant="danger"
	onConfirm={confirmDelete}
	onCancel={cancelDelete}
/>
