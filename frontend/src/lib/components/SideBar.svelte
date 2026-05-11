<script lang="ts">
	const navItems = ['Home', 'Discover', 'My recipes', 'Saved'];
	let active = $state('Home');
</script>

<aside class="w-48 shrink-0 bg-[#FFFFFF] px-6 pt-8">
	<p class="mb-3 text-sm text-[#BFBDBD]">Menu</p>
	<nav class="flex flex-col">
		{#each navItems as item (item)}
			<button
				onclick={() => (active = item)}
				class="cursor-pointer text-left text-lg font-semibold text-[#4A4440] transition-colors hover:text-[#FF6B2C] {active ===
				item
					? 'text-[#F4571D]'
					: ''}"
			>
				{item}
			</button>
		{/each}
	</nav>
</aside>
