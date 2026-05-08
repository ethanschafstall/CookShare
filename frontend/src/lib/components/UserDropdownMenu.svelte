<script>
	let { user } = $props();
	const firstname = user?.firstname
		? user.firstname[0].toUpperCase() + user.firstname.slice(1)
		: '';
	const lastname = user?.lastname ? user.lastname[0].toUpperCase() + user.lastname.slice(1) : '';
	const initials = `${firstname[0] || ''}${lastname[0] || ''}`;
</script>

<button class="flex cursor-pointer items-center gap-2 rounded-full bg-white/20 py-1 pr-3 pl-1">
	<!-- Avatar -->
	<div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white">
		<span class="text-lg font-bold text-[#F4571D]">{initials}</span>
	</div>

	<!-- Name -->
	<span class="text-md font-medium text-white">{firstname} {lastname}</span>

	<!-- Chevron -->
	<svg
		class="h-4 w-4 text-white"
		fill="none"
		stroke="currentColor"
		stroke-width="2.5"
		viewBox="0 0 24 24"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
	</svg>
</button>
