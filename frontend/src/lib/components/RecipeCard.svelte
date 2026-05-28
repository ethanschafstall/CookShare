<script lang="ts">
	interface Props {
		recipe: {
			urlId: string;
			slug: string;
			title: string;
			coverImage?: string | null;
			cookTimeMin?: number | null;
			servings?: number | null;
			hits?: number | null;
		};
		showActions?: boolean;
		onDelete?: (urlId: string, title: string) => void;
	}

	let { recipe, showActions = false, onDelete }: Props = $props();
</script>

<!-- RecipeCard.svelte -->
<li
	class="flex flex-col overflow-hidden rounded-lg border border-border-light bg-surface transition-shadow hover:shadow-md"
>
	<!-- Image area: 4:3 ratio, image centered with padding -->
	<a href="/recipes/{recipe.slug}" rel="external" class="block aspect-[4/3] bg-bg p-4">
		{#if recipe.coverImage}
			<img src={recipe.coverImage} alt={recipe.title} class="h-full w-full object-contain" />
		{:else}
			<div class="flex h-full w-full items-center justify-center text-text-muted">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="56"
					height="56"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect x="3" y="3" width="18" height="18" rx="2" />
					<circle cx="8.5" cy="8.5" r="1.5" />
					<polyline points="21 15 16 10 5 21" />
				</svg>
			</div>
		{/if}
	</a>

	<!-- Title + meta -->
	<div class="border-t border-border-subtle px-4 py-3">
		<h2 class="truncate text-sm font-medium text-text">{recipe.title}</h2>
		<div class="mt-1.5 flex items-center justify-between text-xs text-text-tertiary">
			<span>{recipe.cookTimeMin ?? 0} min · {recipe.servings ?? 0} servings</span>
			<span>{recipe.hits ?? 0} views</span>
		</div>
	</div>

	{#if showActions}
		<!-- Actions -->
		<div class="flex justify-end gap-2 border-t border-border-subtle px-3 py-2">
			<button
				type="button"
				onclick={() => onDelete?.(recipe.urlId, recipe.title)}
				class="cursor-pointer rounded border border-border p-1.5 text-text-tertiary transition-colors hover:bg-red-50 hover:text-primary"
				aria-label="Delete {recipe.title}"
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
					<polyline points="3 6 5 6 21 6" />
					<path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
					<path d="M10 11v6M14 11v6" />
					<path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
				</svg>
			</button>
		</div>
	{/if}
</li>
