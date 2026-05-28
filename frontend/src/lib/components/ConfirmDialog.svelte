<script lang="ts">
	interface Props {
		open: boolean;
		title?: string;
		message?: string;
		confirmLabel?: string;
		cancelLabel?: string;
		variant?: 'primary' | 'danger';
		onConfirm: () => void;
		onCancel: () => void;
	}

	let {
		open,
		title = 'Are you sure?',
		message = '',
		confirmLabel = 'Confirm',
		cancelLabel = 'Cancel',
		variant = 'primary',
		onConfirm,
		onCancel
	}: Props = $props();

	let dialog = $state<HTMLDialogElement | null>(null);

	$effect(() => {
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		else if (!open && dialog.open) dialog.close();
	});

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === dialog) onCancel();
	}
</script>

<dialog
	bind:this={dialog}
	onclose={onCancel}
	onclick={handleBackdropClick}
	class="h-content mx-auto mt-auto mb-8 rounded-lg border border-border-light bg-surface p-0 shadow-lg backdrop:bg-black/40"
>
	<div class="w-full max-w-md p-6">
		<h3 class="text-lg font-semibold text-text">{title}</h3>
		{#if message}
			<p class="mt-2 text-sm text-text-tertiary">{message}</p>
		{/if}
		<div class="mt-6 flex justify-center gap-3">
			<button
				type="button"
				onclick={onCancel}
				class="rounded border border-border px-4 py-2 text-sm text-text-secondary hover:border-text-tertiary hover:bg-bg"
			>
				{cancelLabel}
			</button>
			<button
				type="button"
				onclick={onConfirm}
				class="rounded px-4 py-2 text-sm font-medium text-surface transition-colors {variant ===
				'danger'
					? 'bg-primary hover:bg-primary-hover'
					: 'bg-primary hover:bg-primary-hover'}"
			>
				{confirmLabel}
			</button>
		</div>
	</div>
</dialog>

<style>
	dialog[open] {
		animation: fade-in 0.15s ease-out;
	}
	dialog::backdrop {
		animation: backdrop-fade 0.15s ease-out;
	}
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	@keyframes backdrop-fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
