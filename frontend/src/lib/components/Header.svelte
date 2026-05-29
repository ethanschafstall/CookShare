<script>
	import LoginButton from './LoginButton.svelte';
	import UserDropdownMenu from './UserDropdownMenu.svelte';
	let { user } = $props();
</script>

<header class="box-border flex h-[120px] w-full items-center justify-between bg-[#F4571D] px-6">
	<!-- Logo + Brand -->
	<a href="/">
		<div class="flex items-center gap-3">
			<img src="/logo.png" alt="CookShare logo" class="h-20 w-20 object-contain" />
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
