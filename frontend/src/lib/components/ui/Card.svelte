<script lang="ts">
	import type { Snippet } from 'svelte';

	type Padding = 'sm' | 'md' | 'lg';

	interface Props {
		padding?: Padding;
		class?: string;
		children: Snippet;
	}

	let { padding = 'lg', class: extraClass = '', children }: Props = $props();

	const paddingClass: Record<Padding, string> = {
		sm: 'px-3 py-2',
		md: 'px-4 py-3',
		lg: 'px-8 py-6'
	};
</script>

<div class="rounded-lg border border-border-light bg-surface {paddingClass[padding]} {extraClass}">
	{@render children()}
</div>
