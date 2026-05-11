<script>
	import LoginButton from './LoginButton.svelte';
	import UserDropdownMenu from './UserDropdownMenu.svelte';
	let { user } = $props();
</script>

<header class="box-border flex h-[120px] w-full items-center justify-between bg-[#F4571D] px-6">
	<!-- Logo + Brand -->
	<a href="/" rel="external">
		<div class="flex items-center gap-3">
			<div
				class="flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-white"
			>
				<span class="text-xs font-semibold text-white">Logo</span>
			</div>
			<span class="text-3xl font-bold tracking-tight text-white">CookShare</span>
		</div>
	</a>
	<!-- Login button -->
	{#if !user}
		<LoginButton />
	{:else}
		<UserDropdownMenu {user} />
	{/if}
</header>
