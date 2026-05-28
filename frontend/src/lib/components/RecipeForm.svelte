<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import TextArea from '$lib/components/ui/TextArea.svelte';
	import TextField from '$lib/components/ui/TextField.svelte';
	import { recipeSchema } from '$lib/validators/schemas';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
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

	// UI-only state
	let dragOver = $state(false);
	let imageError = $state('');
	let previews = $state<string[]>([]);
	let draggingIndex = $state<number | null>(null);
	let dragOverIndex = $state<number | null>(null);

	const MAX_IMAGES = 10;
	const MAX_BYTES = 5 * 1024 * 1024;

	// Steps
	function addStep() {
		$form.steps = [...$form.steps, { stepNumber: $form.steps.length + 1, instruction: '' }];
	}

	function removeStep(i: number) {
		$form.steps = $form.steps
			.filter((_, idx) => idx !== i)
			.map((s, idx) => ({ ...s, stepNumber: idx + 1 }));
	}

	// Ingredients
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

	// Images: add / remove / cover
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
	<Card>
		<h2 class="mb-4 text-xl font-semibold text-text">Basic information</h2>
		<hr class="mb-6 border-border-subtle" />

		<div class="mb-5">
			<TextField
				label="Recipe title"
				name="title"
				bind:value={$form.title}
				placeholder="e.g. Herb roasted chicken"
				error={$errors.title}
			/>
		</div>

		<div class="mb-6">
			<TextArea
				label="Description"
				name="description"
				rows={5}
				bind:value={$form.description}
				placeholder="e.g. Herb roasted chicken with potatoes perfect for a sunday roast."
				error={$errors.description}
			/>
		</div>

		<div class="mb-6 grid grid-cols-3 gap-4">
			<TextField
				label="Servings"
				name="servings"
				type="number"
				min="1"
				bind:value={$form.servings}
				placeholder="e.g. 4"
				error={$errors.servings}
			/>
			<TextField
				label="Prep time (min)"
				name="prepTimeMin"
				type="number"
				min="0"
				bind:value={$form.prepTimeMin}
				placeholder="e.g. 30"
				error={$errors.prepTimeMin}
			/>
			<TextField
				label="Cook time (min)"
				name="cookTimeMin"
				type="number"
				min="0"
				bind:value={$form.cookTimeMin}
				placeholder="e.g. 120"
				error={$errors.cookTimeMin}
			/>
		</div>

		<div>
			<label class="mb-2 block text-sm text-text-secondary">Difficulty</label>
			<div class="flex gap-3">
				{#each ['easy', 'medium', 'hard'] as level (level)}
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
	</Card>

	<!-- Photos -->
	<Card>
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
			<Icon
				name="image"
				size={36}
				strokeWidth={1.5}
				class={dragOver ? 'text-primary' : 'text-text-muted'}
			/>
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
							<Icon name="drag-handle" size={16} />
						</button>

						<img src={previews[i]} alt="preview" class="h-20 w-20 shrink-0 rounded object-cover" />
						<div class="flex flex-1 flex-col gap-2">
							<TextField
								bind:value={$form.images[i].altText}
								placeholder="Alt text (describe the image)"
								aria-label="Image alt text"
								class="py-2"
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
							<Icon name="x" size={18} />
						</button>
					</li>
				{/each}
			</ul>
		{/if}
		{#if imageError}<p class="mt-3 text-sm text-error">{imageError}</p>{/if}
	</Card>

	<!-- Ingredients -->
	<Card>
		<h2 class="mb-4 text-xl font-semibold text-text">Ingredients</h2>
		<hr class="mb-6 border-border-subtle" />

		<div class="flex flex-col gap-4">
			{#each $form.ingredients as ingredient, i (i)}
				<div
					class="grid items-start gap-3"
					style="grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr 1.5rem"
				>
					<TextField
						label={i === 0 ? 'Ingredient' : undefined}
						labelSize="xs"
						id="ingredient-name-{i}"
						bind:value={ingredient.name}
						placeholder="e.g. chicken"
						error={$errors.ingredients?.[i]?.name}
						class="py-2"
					/>
					<TextField
						label={i === 0 ? 'Qty' : undefined}
						labelSize="xs"
						id="ingredient-qty-{i}"
						type="number"
						bind:value={$form.ingredients[i].quantityNumeric}
						placeholder="e.g. 1"
						class="py-2"
					/>
					<TextField
						label={i === 0 ? 'Unit' : undefined}
						labelSize="xs"
						id="ingredient-unit-{i}"
						bind:value={$form.ingredients[i].displayUnit}
						placeholder="e.g. grams"
						class="py-2"
					/>
					<TextField
						label={i === 0 ? 'Weight (g)' : undefined}
						labelSize="xs"
						id="ingredient-weight-{i}"
						type="number"
						bind:value={$form.ingredients[i].quantityG}
						placeholder="e.g. 100"
						class="py-2"
					/>
					<TextField
						label={i === 0 ? 'Note' : undefined}
						labelSize="xs"
						id="ingredient-note-{i}"
						bind:value={$form.ingredients[i].note}
						placeholder="e.g. sub: rosemary"
						class="py-2"
					/>
					<div class="flex h-full items-center {i === 0 ? 'pt-6' : ''}">
						<button
							type="button"
							onclick={() => removeIngredient(i)}
							class="text-primary hover:text-primary-hover {$form.ingredients.length > 1
								? ''
								: 'invisible'}"
							aria-label="Remove ingredient"
						>
							<Icon name="x" size={16} strokeWidth={2.5} />
						</button>
					</div>
				</div>
			{/each}
		</div>
		{#if $errors.ingredients?._errors}<p class="mt-2 text-xs text-error">
				{$errors.ingredients._errors}
			</p>{/if}
		<div class="mt-5">
			<Button variant="secondary" size="sm" onclick={addIngredient}>+ Add ingredient</Button>
		</div>
	</Card>

	<!-- Steps -->
	<Card>
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
						<TextArea
							label="Instruction"
							labelSize="xs"
							id="step-{i}"
							rows={2}
							bind:value={step.instruction}
							placeholder={i === 0 ? 'e.g. Preheat oven at 200c' : 'e.g. Mix herbs and spices'}
							error={$errors.steps?.[i]?.instruction}
						/>
					</div>
					{#if $form.steps.length > 1}
						<button
							type="button"
							onclick={() => removeStep(i)}
							class="mt-8 text-primary hover:text-primary-hover"
							aria-label="Remove step"
						>
							<Icon name="x" size={16} strokeWidth={2.5} />
						</button>
					{:else}
						<div class="w-4"></div>
					{/if}
				</div>
			{/each}
		</div>
		{#if $errors.steps?._errors}<p class="mt-2 text-xs text-error">
				{$errors.steps._errors}
			</p>{/if}
		<div class="mt-5">
			<Button variant="secondary" size="sm" onclick={addStep}>+ Add step</Button>
		</div>
	</Card>

	<!-- Server error -->
	{#if $message && typeof $message === 'string'}
		<p class="text-center text-sm text-error">{$message}</p>
	{/if}

	<!-- Actions -->
	<div class="flex justify-end gap-3 pb-10">
		<Button variant="secondary" size="lg" href="/recipes" rel="external">Cancel</Button>
		<Button variant="primary" size="lg" type="submit" disabled={$submitting}>
			{$submitting ? submittingLabel : submitLabel}
		</Button>
	</div>
</form>
