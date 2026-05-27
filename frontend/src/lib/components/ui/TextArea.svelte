<script lang="ts">
	interface Props {
		label?: string;
		labelSize?: 'sm' | 'xs';
		name?: string;
		id?: string;
		value: string | null | undefined;
		placeholder?: string;
		rows?: number;
		error?: string | string[];
		hint?: string;
		'aria-label'?: string;
		class?: string;
	}

	let {
		label,
		labelSize = 'sm',
		name,
		id = name,
		value = $bindable(),
		placeholder,
		rows = 3,
		error,
		hint,
		'aria-label': ariaLabel,
		class: extraClass = ''
	}: Props = $props();

	const errorMessage = $derived(Array.isArray(error) ? error[0] : error);
	const hasError = $derived(!!errorMessage);
</script>

<div>
	{#if label}
		<label
			class="mb-1.5 block {labelSize === 'xs'
				? 'text-xs text-text-tertiary'
				: 'text-sm text-text-secondary'}"
			for={id}
		>
			{label}
		</label>
	{/if}
	<textarea
		{id}
		{name}
		{placeholder}
		{rows}
		aria-label={ariaLabel}
		bind:value
		class="w-full resize-none rounded border px-3 py-2.5 text-sm text-text placeholder-text-muted focus:ring-1 focus:outline-none
			{hasError
			? 'border-error focus:ring-error'
			: 'border-border focus:border-primary focus:ring-primary'}
			{extraClass}"
	></textarea>
	{#if hasError}
		<span class="mt-1 block text-xs text-error">{errorMessage}</span>
	{:else if hint}
		<span class="mt-1 block text-xs text-text-tertiary">{hint}</span>
	{/if}
</div>
