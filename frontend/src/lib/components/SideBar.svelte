<script lang="ts">
	import { page } from '$app/stores';

	const navItems = [
		{ label: 'Home', href: '/' },
		{ label: 'My recipes', href: '/myrecipes' }
	];
</script>

<aside class="w-48 shrink-0 border-r-1 border-gray-300 bg-[#FFFFFF] px-6 pt-8">
	<p class="mb-3 text-sm text-[#BFBDBD]">Menu</p>
	<nav class="flex flex-col">
		{#each navItems as item (item.href)}
			<a
				href={item.href}
				rel="external"
				class="text-left text-lg font-semibold text-[#4A4440] transition-colors hover:text-[#FF6B2C] {$page
					.url.pathname === item.href
					? 'text-[#F4571D]'
					: ''}"
			>
				{item.label}
			</a>
		{/each}
	</nav>
</aside>
