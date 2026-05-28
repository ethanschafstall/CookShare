<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import type { Snippet } from 'svelte';

	type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
	type Size = 'sm' | 'md' | 'lg' | 'icon';

	interface Props {
		variant?: Variant;
		size?: Size;
		href?: Pathname;
		rel?: string;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		onclick?: (e: MouseEvent) => void;
		'aria-label'?: string;
		class?: string;
		children: Snippet;
	}

	let {
		variant = 'secondary',
		size = 'md',
		href,
		rel,
		type = 'button',
		disabled = false,
		onclick,
		'aria-label': ariaLabel,
		class: extraClass = '',
		children
	}: Props = $props();
</script>

{#if href}
	<a
		href={resolve(href)}
		{rel}
		aria-label={ariaLabel}
		class="inline-flex cursor-pointer items-center justify-center transition-colors
			{variant === 'primary'
			? 'rounded-lg bg-primary font-medium text-surface hover:bg-primary-hover active:bg-primary-active disabled:opacity-60'
			: ''}
			{variant === 'secondary'
			? 'rounded-lg border border-border text-text-secondary hover:border-text-tertiary hover:bg-bg disabled:opacity-60'
			: ''}
			{variant === 'ghost'
			? 'rounded border border-border text-text-tertiary hover:border-text-tertiary hover:bg-bg disabled:opacity-60'
			: ''}
			{variant === 'danger'
			? 'rounded-lg bg-error font-medium text-surface hover:opacity-90 disabled:opacity-60'
			: ''}
			{size === 'sm' ? 'px-4 py-2 text-sm' : ''}
			{size === 'md' ? 'px-5 py-2.5 text-sm' : ''}
			{size === 'lg' ? 'px-8 py-3 text-sm' : ''}
			{size === 'icon' ? 'p-2' : ''}
			{extraClass}"
	>
		{@render children()}
	</a>
{:else}
	<button
		{type}
		{disabled}
		{onclick}
		aria-label={ariaLabel}
		class="inline-flex cursor-pointer items-center justify-center transition-colors
			{variant === 'primary'
			? 'rounded-lg bg-primary font-medium text-surface hover:bg-primary-hover active:bg-primary-active disabled:opacity-60'
			: ''}
			{variant === 'secondary'
			? 'rounded-lg border border-border text-text-secondary hover:border-text-tertiary hover:bg-bg disabled:opacity-60'
			: ''}
			{variant === 'ghost'
			? 'rounded border border-border text-text-tertiary hover:border-text-tertiary hover:bg-bg disabled:opacity-60'
			: ''}
			{variant === 'danger'
			? 'rounded-lg bg-error font-medium text-surface hover:opacity-90 disabled:opacity-60'
			: ''}
			{size === 'sm' ? 'px-4 py-2 text-sm' : ''}
			{size === 'md' ? 'px-5 py-2.5 text-sm' : ''}
			{size === 'lg' ? 'px-8 py-3 text-sm' : ''}
			{size === 'icon' ? 'p-2' : ''}
			{extraClass}"
	>
		{@render children()}
	</button>
{/if}
