<script lang="ts">
	import { loginSchema } from '$lib/validators/schemas';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data } = $props();

	const { form, errors, message, enhance } = $derived.by(() =>
		superForm(data.form, {
			validators: zodClient(loginSchema),
			validationMethod: 'onsubmit'
		})
	);
</script>

<div class="flex min-h-screen flex-col items-center bg-[#F7F3EE] px-4 pt-24">
	<!-- Title — outside the card -->
	<h1 class="mb-8 text-5xl font-bold text-[#BFBDBD]">Welcome Back</h1>

	<!-- Card -->
	<div class="w-full max-w-xl rounded-2xl bg-white px-14 py-10 shadow-sm">
		<form method="POST" use:enhance class="flex flex-col">
			<!-- Email -->
			<div class="mb-6">
				<label class="mb-2 block text-base text-[#BFBDBD]" for="email">Email</label>
				<input
					id="email"
					name="email"
					type="text"
					bind:value={$form.email}
					class="w-full rounded-xl border px-4 py-3.5 text-[#BFBDBD] focus:ring-1 focus:ring-[#F4571D] focus:outline-none {$errors.email
						? 'border-[#FF7C7C] focus:border-[#FF7C7C]'
						: 'border-[#BFBDBD] focus:border-[#F4571D]'}"
				/>
				{#if $errors.email}
					<span class="mt-1.5 block text-xs text-[#FF7C7C]">{$errors.email}</span>
				{/if}
			</div>

			<!-- Password -->
			<div class="mb-5">
				<label class="mb-2 block text-base text-[#BFBDBD]" for="password">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					bind:value={$form.password}
					class="w-full rounded-xl border px-4 py-3.5 text-[#BFBDBD] focus:ring-1 focus:ring-[#F4571D] focus:outline-none {$errors.password
						? 'border-[#FF7C7C] focus:border-[#FF7C7C]'
						: 'border-[#BFBDBD] focus:border-[#F4571D]'}"
				/>
				{#if $errors.password}
					<span class="mt-1.5 block text-xs text-[#FF7C7C]">{$errors.password}</span>
				{/if}
			</div>

			<!-- Remember me + Forraot password -->
			<div class="mb-10 flex items-center justify-between">
				<label class="flex cursor-pointer items-center gap-2 text-sm text-[#BFBDBD]">
					<input
						type="checkbox"
						name="rememberMe"
						bind:checked={$form.rememberMe}
						class="h-4 w-4 rounded accent-[#F4571D]"
					/>
					Remember me
				</label>
				<p class="text-sm text-[#F4571D] hover:underline">Forgot your password?</p>
			</div>

			<!-- Server error message -->
			{#if $message}
				<p class="mb-4 text-center text-sm text-[#FF7C7C]">{$message}</p>
			{/if}

			<!-- Submit -->
			<div class="flex justify-center">
				<button
					type="submit"
					class="cursor-pointer rounded-lg bg-[#F4571D] px-24 py-3.5 text-base font-medium text-white transition-colors hover:bg-[#e04a14] active:bg-[#c93e0e]"
				>
					Log in
				</button>
			</div>
		</form>
	</div>
</div>
