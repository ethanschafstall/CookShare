<script lang="ts">
	import { recipeSchema } from '$lib/validators/schemas';
	import { superForm, type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	type Props = {
		form: SuperValidated<Infer<typeof recipeSchema>>;
		submitLabel?: string;
		submittingLabel?: string;
	};

	let {
		form: initialForm,
		submitLabel = 'Publish recipe',
		submittingLabel = 'Publishing...'
	}: Props = $props();

	const { form, errors, message, enhance, submitting } = superForm(initialForm, {
		validators: zodClient(recipeSchema),
		validationMethod: 'onblur',
		dataType: 'json',
		onSubmit: ({ cancel }) => {
			if ($form.images.length === 0) {
				imageError = 'Please add at least one photo of the dish.';
				cancel();
			}
		}
	});

	// ── UI-only state ─────────────────────────────────────────────────────────
	let dragOver = $state(false);
	let imageError = $state('');
	let previews = $state<string[]>([]);
	let draggingIndex = $state<number | null>(null);
	let dragOverIndex = $state<number | null>(null);

	const MAX_IMAGES = 10;
	const MAX_BYTES = 5 * 1024 * 1024;

	// ── Steps ─────────────────────────────────────────────────────────────────
	function addStep() {
		$form.steps = [...$form.steps, { stepNumber: $form.steps.length + 1, instruction: '' }];
	}

	function removeStep(i: number) {
		$form.steps = $form.steps
			.filter((_, idx) => idx !== i)
			.map((s, idx) => ({ ...s, stepNumber: idx + 1 }));
	}

	// ── Ingredients ───────────────────────────────────────────────────────────
	function addIngredient() {
		$form.ingredients = [
			...$form.ingredients,
			{
				name: '',
				displayOrder: $form.ingredients.length + 1,
				quantityG: null,
				quantityNumeric: null,
				displayUnit: null,
				note: null
			}
		];
	}

	function removeIngredient(i: number) {
		$form.ingredients = $form.ingredients
			.filter((_, idx) => idx !== i)
			.map((ing, idx) => ({ ...ing, displayOrder: idx + 1 }));
	}

	if ($form.steps.length === 0) addStep();
	if ($form.ingredients.length === 0) addIngredient();

	// ── Images: add / remove / cover ──────────────────────────────────────────
	function handleFiles(files: FileList | null) {
		if (!files || files.length === 0) return;
		imageError = '';

		const accepted: File[] = [];
		for (const file of files) {
			if (!file.type.startsWith('image/')) {
				imageError = `${file.name} is not an image.`;
				continue;
			}
			if (file.size > MAX_BYTES) {
				imageError = `${file.name} exceeds the 5 MB limit.`;
				continue;
			}
			accepted.push(file);
		}

		const slotsLeft = MAX_IMAGES - $form.images.length;
		if (accepted.length > slotsLeft) {
			imageError = `You can upload at most ${MAX_IMAGES} images.`;
		}
		const toAdd = accepted.slice(0, slotsLeft);
		if (toAdd.length === 0) return;

		const startOrder = $form.images.length + 1;
		const hadNoCover = $form.images.length === 0;

		$form.images = [
			...$form.images,
			...toAdd.map((file, i) => ({
				file,
				altText: '',
				isCover: hadNoCover && i === 0,
				displayOrder: startOrder + i
			}))
		];
		previews = [...previews, ...toAdd.map((f) => URL.createObjectURL(f))];
	}

	function removeImage(i: number) {
		URL.revokeObjectURL(previews[i]);
		previews = previews.filter((_, idx) => idx !== i);
		$form.images = $form.images
			.filter((_, idx) => idx !== i)
			.map((img, idx) => ({ ...img, displayOrder: idx + 1 }));

		if ($form.images.length > 0 && !$form.images.some((img) => img.isCover)) {
			$form.images[0].isCover = true;
		}
	}

	function setCover(i: number) {
		$form.images = $form.images.map((img, idx) => ({ ...img, isCover: idx === i }));
	}

	// ── Images: drag-to-reorder ───────────────────────────────────────────────
	function moveImage(from: number, to: number) {
		if (from === to || from < 0 || to < 0) return;
		const next = [...$form.images];
		const [picked] = next.splice(from, 1);
		next.splice(to, 0, picked);
		$form.images = next.map((img, idx) => ({ ...img, displayOrder: idx + 1 }));

		const nextPreviews = [...previews];
		const [pickedPreview] = nextPreviews.splice(from, 1);
		nextPreviews.splice(to, 0, pickedPreview);
		previews = nextPreviews;
	}

	function onDragStart(e: DragEvent, i: number) {
		draggingIndex = i;
		e.dataTransfer?.setData('text/plain', String(i));
		if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
	}

	function onDragOverRow(e: DragEvent, i: number) {
		if (draggingIndex === null) return;
		e.preventDefault();
		dragOverIndex = i;
		if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
	}

	function onDropRow(e: DragEvent, i: number) {
		e.preventDefault();
		if (draggingIndex === null) return;
		moveImage(draggingIndex, i);
		draggingIndex = null;
		dragOverIndex = null;
	}

	function onDragEnd() {
		draggingIndex = null;
		dragOverIndex = null;
	}
</script>

<form method="POST" use:enhance enctype="multipart/form-data" class="flex flex-col gap-5">
	<!-- Basic Information -->
	<div class="rounded-lg border border-border-light bg-surface px-8 py-6">
		<h2 class="mb-4 text-xl font-semibold text-text">Basic information</h2>
		<hr class="mb-6 border-border-subtle" />

		<div class="mb-5">
			<label class="mb-1.5 block text-sm text-text-secondary" for="title">Recipe title</label>
			<input
				id="title"
				name="title"
				type="text"
				bind:value={$form.title}
				placeholder="e.g. Herb roasted chicken"
				class="w-full rounded border px-3 py-2.5 text-sm text-text placeholder-text-muted focus:ring-1 focus:outline-none {$errors.title
					? 'border-error focus:ring-error'
					: 'border-border focus:border-primary focus:ring-primary'}"
			/>
			{#if $errors.title}<span class="mt-1 block text-xs text-error">{$errors.title}</span>{/if}
		</div>

		<div class="mb-6">
			<label class="mb-1.5 block text-sm text-text-secondary" for="description">Description</label>
			<textarea
				id="description"
				name="description"
				bind:value={$form.description}
				rows="5"
				placeholder="e.g. Herb roasted chicken with potatoes perfect for a sunday roast."
				class="w-full resize-none rounded border px-3 py-2.5 text-sm text-text placeholder-text-muted focus:ring-1 focus:outline-none {$errors.description
					? 'border-error focus:ring-error'
					: 'border-border focus:border-primary focus:ring-primary'}"
			></textarea>
			{#if $errors.description}<span class="mt-1 block text-xs text-error"
					>{$errors.description}</span
				>{/if}
		</div>

		<div class="mb-6 grid grid-cols-3 gap-4">
			<div>
				<label class="mb-1.5 block text-sm text-text-secondary" for="servings">Servings</label>
				<input
					id="servings"
					name="servings"
					type="number"
					min="1"
					bind:value={$form.servings}
					placeholder="e.g. 4"
					class="w-full rounded border border-border px-3 py-2.5 text-sm text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
				/>
				{#if $errors.servings}<span class="mt-1 block text-xs text-error">{$errors.servings}</span
					>{/if}
			</div>
			<div>
				<label class="mb-1.5 block text-sm text-text-secondary" for="prepTimeMin"
					>Prep time (min)</label
				>
				<input
					id="prepTimeMin"
					name="prepTimeMin"
					type="number"
					min="0"
					bind:value={$form.prepTimeMin}
					placeholder="e.g. 30"
					class="w-full rounded border border-border px-3 py-2.5 text-sm text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
				/>
				{#if $errors.prepTimeMin}<span class="mt-1 block text-xs text-error"
						>{$errors.prepTimeMin}</span
					>{/if}
			</div>
			<div>
				<label class="mb-1.5 block text-sm text-text-secondary" for="cookTimeMin"
					>Cook time (min)</label
				>
				<input
					id="cookTimeMin"
					name="cookTimeMin"
					type="number"
					min="0"
					bind:value={$form.cookTimeMin}
					placeholder="e.g. 120"
					class="w-full rounded border border-border px-3 py-2.5 text-sm text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
				/>
				{#if $errors.cookTimeMin}<span class="mt-1 block text-xs text-error"
						>{$errors.cookTimeMin}</span
					>{/if}
			</div>
		</div>

		<div>
			<label class="mb-2 block text-sm text-text-secondary">Difficulty</label>
			<div class="flex gap-3">
				{#each ['easy', 'medium', 'hard'] as level}
					<label
						class="flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-2.5 text-sm transition-colors {$form.difficulty ===
						level
							? 'border-primary bg-primary-light text-primary'
							: 'border-border text-text-tertiary hover:border-primary hover:text-primary'}"
					>
						<input
							type="radio"
							name="difficulty"
							value={level}
							bind:group={$form.difficulty}
							class="hidden"
						/>
						{level.charAt(0).toUpperCase() + level.slice(1)}
					</label>
				{/each}
			</div>
			{#if $errors.difficulty}<span class="mt-1.5 block text-xs text-error"
					>{$errors.difficulty}</span
				>{/if}
		</div>
	</div>

	<!-- Photos -->
	<div class="rounded-lg border border-border-light bg-surface px-8 py-6">
		<h2 class="mb-4 text-xl font-semibold text-text">Photos</h2>
		<hr class="mb-6 border-border-subtle" />
		<p class="mb-4 text-sm text-text-tertiary">At least one photo. Drag thumbnails to reorder.</p>

		<!-- Drop zone -->
		<div
			role="button"
			tabindex="0"
			aria-label="Upload recipe images"
			class="flex cursor-pointer flex-col items-center justify-center gap-3 rounded border-2 border-dashed px-8 py-10 transition-colors {dragOver
				? 'border-primary bg-primary-light'
				: 'border-border hover:border-primary'}"
			ondragover={(e) => {
				if (draggingIndex !== null) return;
				e.preventDefault();
				dragOver = true;
			}}
			ondragleave={() => (dragOver = false)}
			ondrop={(e) => {
				if (draggingIndex !== null) return;
				e.preventDefault();
				dragOver = false;
				handleFiles(e.dataTransfer?.files ?? null);
			}}
			onclick={() => document.getElementById('image-input')?.click()}
			onkeydown={(e) => e.key === 'Enter' && document.getElementById('image-input')?.click()}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="36"
				height="36"
				viewBox="0 0 24 24"
				fill="none"
				stroke={dragOver ? 'var(--color-primary)' : 'var(--color-text-muted)'}
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
				<polyline points="21 15 16 10 5 21" />
			</svg>
			<p class="text-sm text-text-tertiary">
				Drag & drop or <span class="text-primary">browse</span>
			</p>
			<p class="text-xs text-text-muted">PNG, JPG, WEBP · max 5MB · up to 10 images</p>
			<input
				id="image-input"
				type="file"
				accept="image/*"
				multiple
				class="hidden"
				aria-label="Upload recipe images"
				onchange={(e) => handleFiles(e.currentTarget.files)}
			/>
		</div>

		<!-- Previews (reorderable) -->
		{#if $form.images.length > 0}
			<ul class="mt-5 flex flex-col gap-4">
				{#each $form.images as img, i (i)}
					<li
						draggable="true"
						ondragstart={(e) => onDragStart(e, i)}
						ondragover={(e) => onDragOverRow(e, i)}
						ondragleave={() => (dragOverIndex = null)}
						ondrop={(e) => onDropRow(e, i)}
						ondragend={onDragEnd}
						class="flex items-start gap-4 rounded transition-colors {dragOverIndex === i &&
						draggingIndex !== i
							? 'bg-primary-light'
							: ''} {draggingIndex === i ? 'opacity-40' : ''}"
					>
						<!-- Drag handle -->
						<button
							type="button"
							aria-label="Drag to reorder"
							class="mt-6 shrink-0 cursor-grab text-text-muted hover:text-text-tertiary active:cursor-grabbing"
							tabindex="-1"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
							>
								<circle cx="9" cy="5" r="1.5" /><circle cx="15" cy="5" r="1.5" />
								<circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
								<circle cx="9" cy="19" r="1.5" /><circle cx="15" cy="19" r="1.5" />
							</svg>
						</button>

						<img src={previews[i]} alt="preview" class="h-20 w-20 shrink-0 rounded object-cover" />
						<div class="flex flex-1 flex-col gap-2">
							<input
								type="text"
								bind:value={$form.images[i].altText}
								placeholder="Alt text (describe the image)"
								class="w-full rounded border border-border px-3 py-2 text-sm text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
								aria-label="Image alt text"
							/>
							<button
								type="button"
								onclick={() => setCover(i)}
								class="flex w-fit items-center gap-2 text-sm text-text-tertiary"
							>
								<span
									class="flex h-4 w-4 items-center justify-center rounded-full border transition-colors {img.isCover
										? 'border-primary bg-primary'
										: 'border-border'}"
								>
									{#if img.isCover}<span class="h-1.5 w-1.5 rounded-full bg-surface"></span>{/if}
								</span>
								Cover photo
							</button>
						</div>
						<button
							type="button"
							onclick={() => removeImage(i)}
							class="mt-1 text-text-muted transition-colors hover:text-primary"
							aria-label="Remove image"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</button>
					</li>
				{/each}
			</ul>
		{/if}
		{#if imageError}<p class="mt-3 text-sm text-error">{imageError}</p>{/if}
	</div>

	<!-- Ingredients -->
	<div class="rounded-lg border border-border-light bg-surface px-8 py-6">
		<h2 class="mb-4 text-xl font-semibold text-text">Ingredients</h2>
		<hr class="mb-6 border-border-subtle" />

		<div class="flex flex-col gap-4">
			{#each $form.ingredients as ingredient, i (i)}
				<div
					class="grid items-start gap-3"
					style="grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr auto"
				>
					<div>
						{#if i === 0}<label
								class="mb-1.5 block text-xs text-text-tertiary"
								for="ingredient-name-{i}">Ingredient</label
							>{/if}
						<input
							id="ingredient-name-{i}"
							type="text"
							bind:value={ingredient.name}
							placeholder="e.g. chicken"
							class="w-full rounded border px-3 py-2 text-sm text-text placeholder-text-muted focus:ring-1 focus:outline-none {$errors
								.ingredients?.[i]?.name
								? 'border-error focus:ring-error'
								: 'border-border focus:border-primary focus:ring-primary'}"
						/>
						{#if $errors.ingredients?.[i]?.name}<span class="mt-1 block text-xs text-error"
								>{$errors.ingredients[i].name}</span
							>{/if}
					</div>
					<div>
						{#if i === 0}<label
								class="mb-1.5 block text-xs text-text-tertiary"
								for="ingredient-qty-{i}">Qty</label
							>{/if}
						<input
							id="ingredient-qty-{i}"
							type="number"
							bind:value={$form.ingredients[i].quantityNumeric}
							placeholder="e.g. 1"
							class="w-full rounded border border-border px-3 py-2 text-sm text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
						/>
					</div>
					<div>
						{#if i === 0}<label
								class="mb-1.5 block text-xs text-text-tertiary"
								for="ingredient-unit-{i}">Unit</label
							>{/if}
						<input
							id="ingredient-unit-{i}"
							type="text"
							bind:value={$form.ingredients[i].displayUnit}
							placeholder="e.g. grams"
							class="w-full rounded border border-border px-3 py-2 text-sm text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
						/>
					</div>
					<div>
						{#if i === 0}<label
								class="mb-1.5 block text-xs text-text-tertiary"
								for="ingredient-weight-{i}">Weight (g)</label
							>{/if}
						<input
							id="ingredient-weight-{i}"
							type="number"
							bind:value={$form.ingredients[i].quantityG}
							placeholder="e.g. 100"
							class="w-full rounded border border-border px-3 py-2 text-sm text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
						/>
					</div>
					<div>
						{#if i === 0}<label
								class="mb-1.5 block text-xs text-text-tertiary"
								for="ingredient-note-{i}">Note</label
							>{/if}
						<input
							id="ingredient-note-{i}"
							type="text"
							bind:value={$form.ingredients[i].note}
							placeholder="e.g. sub: rosemary"
							class="w-full rounded border border-border px-3 py-2 text-sm text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
						/>
					</div>
					<div class="flex h-full items-center {i === 0 ? 'pt-6' : ''}">
						{#if $form.ingredients.length > 1}
							<button
								type="button"
								onclick={() => removeIngredient(i)}
								class="text-primary hover:text-primary-hover"
								aria-label="Remove ingredient"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
								</svg>
							</button>
						{/if}
					</div>
				</div>
			{/each}
		</div>
		{#if $errors.ingredients?._errors}<p class="mt-2 text-xs text-error">
				{$errors.ingredients._errors}
			</p>{/if}
		<button
			type="button"
			onclick={addIngredient}
			class="mt-5 rounded border border-border px-4 py-2 text-sm text-text-secondary hover:border-text-tertiary hover:bg-bg"
		>
			+ Add ingredient
		</button>
	</div>

	<!-- Steps -->
	<div class="rounded-lg border border-border-light bg-surface px-8 py-6">
		<h2 class="mb-4 text-xl font-semibold text-text">Steps</h2>
		<hr class="mb-6 border-border-subtle" />

		<div class="flex flex-col gap-5">
			{#each $form.steps as step, i (i)}
				<div class="flex items-start gap-3">
					<span
						class="mt-6 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-surface"
					>
						{i + 1}
					</span>
					<div class="flex-1">
						<label class="mb-1.5 block text-xs text-text-tertiary" for="step-{i}">Instruction</label
						>
						<textarea
							id="step-{i}"
							bind:value={$form.steps[i].instruction}
							rows="2"
							placeholder={i === 0 ? 'e.g. Preheat oven at 200c' : 'e.g. Mix herbs and spices'}
							class="w-full resize-none rounded border px-3 py-2.5 text-sm text-text placeholder-text-muted focus:ring-1 focus:outline-none {$errors
								.steps?.[i]?.instruction
								? 'border-error focus:ring-error'
								: 'border-border focus:border-primary focus:ring-primary'}"
						></textarea>
						{#if $errors.steps?.[i]?.instruction}<span class="mt-1 block text-xs text-error"
								>{$errors.steps[i].instruction}</span
							>{/if}
					</div>
					{#if $form.steps.length > 1}
						<button
							type="button"
							onclick={() => removeStep(i)}
							class="mt-8 text-primary hover:text-primary-hover"
							aria-label="Remove step"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</button>
					{/if}
				</div>
			{/each}
		</div>
		{#if $errors.steps?._errors}<p class="mt-2 text-xs text-error">
				{$errors.steps._errors}
			</p>{/if}
		<button
			type="button"
			onclick={addStep}
			class="mt-5 rounded border border-border px-4 py-2 text-sm text-text-secondary hover:border-text-tertiary hover:bg-bg"
		>
			+ Add step
		</button>
	</div>

	<!-- Server error -->
	{#if $message && typeof $message === 'string'}
		<p class="text-center text-sm text-error">{$message}</p>
	{/if}

	<!-- Actions -->
	<div class="flex justify-end gap-3 pb-10">
		<a
			href="/recipes"
			class="rounded-lg border border-border px-8 py-3 text-sm text-text-secondary transition-colors hover:border-text-tertiary hover:bg-bg"
		>
			Cancel
		</a>
		<button
			type="submit"
			disabled={$submitting}
			class="cursor-pointer rounded-lg bg-primary px-10 py-3 text-sm font-medium text-surface transition-colors hover:bg-primary-hover active:bg-primary-active disabled:opacity-60"
		>
			{$submitting ? submittingLabel : submitLabel}
		</button>
	</div>
</form>
