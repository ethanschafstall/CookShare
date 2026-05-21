<script lang="ts">
	import RecipeForm from '$lib/components/RecipeForm.svelte';

	let { data } = $props();
</script>

<div class="min-h-screen bg-bg px-8 py-10">
	<div class="mx-auto max-w-4xl">
		<!-- Page title -->
		<div class="mb-8 flex items-center gap-3">
			<a
				href="/recipes"
				rel="external"
				class="flex h-8 w-8 items-center justify-center rounded border border-border-muted bg-surface text-text-secondary hover:bg-bg"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg
				>
			</a>
			<h1 class="text-3xl font-semibold text-text">New recipe</h1>
		</div>

		<RecipeForm form={data.form} />
	</div>
</div>
