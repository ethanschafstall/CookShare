<script lang="ts">
	import RecipeForm from '$lib/components/RecipeForm.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

	let { data } = $props();
</script>

<div class="min-h-screen px-8 py-10">
	<div class="mx-auto max-w-4xl">
		<!-- Page title -->
		<div class="mb-8 flex items-center gap-3">
			<Button
				variant="ghost"
				size="icon"
				href="/myrecipes"
				rel="external"
				aria-label="Back to my recipes"
			>
				<Icon name="chevron-left" size={16} />
			</Button>
			<h1 class="text-3xl font-semibold text-text">New recipe</h1>
		</div>

		<RecipeForm form={data.form} />
	</div>
</div>
