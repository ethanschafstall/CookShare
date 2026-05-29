<script>
	import { enhance } from '$app/forms';

	let { user } = $props();
	const firstname = $derived(
		user?.firstname ? user.firstname[0].toUpperCase() + user.firstname.slice(1) : ''
	);
	const lastname = $derived(
		user?.lastname ? user.lastname[0].toUpperCase() + user.lastname.slice(1) : ''
	);
	const initials = $derived(`${firstname[0] || ''}${lastname[0] || ''}`);
	let menuOpen = $state(false);

	const switchMenuState = () => (menuOpen = !menuOpen);

	// Handles user clicking outside of the menu zone to auto close the menu
	const clickOutside = (node) => {
		function handle(event) {
			if (!node.contains(event.target)) menuOpen = false;
		}
		window.addEventListener('click', handle, true);
		return {
			destroy() {
				window.removeEventListener('click', handle, true);
			}
		};
	};
</script>

<div class="relative z-10" use:clickOutside>
	<!-- #region User Account info -->
	<button
		onclick={switchMenuState}
		class="flex cursor-pointer items-center gap-2 rounded-full bg-white/20 py-1 pr-3 pl-1 hover:bg-white/25"
	>
		<!-- Avatar -->
		<div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white">
			<span class="text-lg font-bold text-[#F4571D]">{initials}</span>
		</div>
		<!-- Name -->
		<span class="text-md font-medium text-white">{firstname} {lastname}</span>
		<!-- Chevron -->
		<svg
			class="h-4 w-4 text-white transition-transform"
			class:rotate-180={menuOpen}
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
		</svg>
	</button>

	{#if menuOpen}
		<ul
			class="absolute right-0 mt-2 w-52 list-none overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-lg"
		>
			<!-- #region Logout -->
			<li>
				<form method="POST" action="/logout" use:enhance>
					<button
						type="submit"
						class="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-[#FF7C7C] transition-colors hover:bg-red-50"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.75"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline
								points="16 17 21 12 16 7"
							/><line x1="21" y1="12" x2="9" y2="12" />
						</svg>
						Log out
					</button>
				</form>
			</li>
		</ul>
	{/if}
</div>
