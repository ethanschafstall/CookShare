<script lang="ts">
	type IconName = 'chevron-left' | 'pencil' | 'trash' | 'eye' | 'x' | 'image' | 'drag-handle';

	interface Props {
		name: IconName;
		size?: number;
		strokeWidth?: number;
		class?: string;
	}

	let { name, size = 16, strokeWidth = 2, class: extraClass = '' }: Props = $props();

	const sizeStyle = $derived(`width: ${size}px; height: ${size}px; flex-shrink: 0;`);
	const dragHandleStyle = $derived(`width: ${size}px; height: ${size * 1.25}px; flex-shrink: 0;`);
</script>

{#if name === 'chevron-left'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width={strokeWidth}
		stroke-linecap="round"
		stroke-linejoin="round"
		style={sizeStyle}
		class={extraClass}
		aria-hidden="true"
	>
		<polyline points="15 18 9 12 15 6" />
	</svg>
{:else if name === 'pencil'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width={strokeWidth}
		stroke-linecap="round"
		stroke-linejoin="round"
		style={sizeStyle}
		class={extraClass}
		aria-hidden="true"
	>
		<path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5" />
		<path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
	</svg>
{:else if name === 'trash'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width={strokeWidth}
		stroke-linecap="round"
		stroke-linejoin="round"
		style={sizeStyle}
		class={extraClass}
		aria-hidden="true"
	>
		<polyline points="3 6 5 6 21 6" />
		<path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
		<path d="M10 11v6M14 11v6" />
		<path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
	</svg>
{:else if name === 'eye'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width={strokeWidth}
		stroke-linecap="round"
		stroke-linejoin="round"
		style={sizeStyle}
		class={extraClass}
		aria-hidden="true"
	>
		<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
		<circle cx="12" cy="12" r="3" />
	</svg>
{:else if name === 'x'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width={strokeWidth}
		stroke-linecap="round"
		stroke-linejoin="round"
		style={sizeStyle}
		class={extraClass}
		aria-hidden="true"
	>
		<line x1="18" y1="6" x2="6" y2="18" />
		<line x1="6" y1="6" x2="18" y2="18" />
	</svg>
{:else if name === 'image'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width={strokeWidth}
		stroke-linecap="round"
		stroke-linejoin="round"
		style={sizeStyle}
		class={extraClass}
		aria-hidden="true"
	>
		<rect x="3" y="3" width="18" height="18" rx="2" />
		<circle cx="8.5" cy="8.5" r="1.5" />
		<polyline points="21 15 16 10 5 21" />
	</svg>
{:else if name === 'drag-handle'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		style={dragHandleStyle}
		class={extraClass}
		aria-hidden="true"
	>
		<circle cx="9" cy="5" r="1.5" /><circle cx="15" cy="5" r="1.5" />
		<circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
		<circle cx="9" cy="19" r="1.5" /><circle cx="15" cy="19" r="1.5" />
	</svg>
{/if}
