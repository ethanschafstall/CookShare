<script lang="ts">
	import SideBar from '$lib/components/SideBar.svelte';
	const recipes = Array.from({ length: 6 }, () => ({ name: 'Placeholder Recipe' }));
</script>

<div class="flex min-h-screen bg-[#EDEAE6]">
	<SideBar />
	<!-- Divider -->
	<div class="w-px bg-gray-300"></div>

	<!-- Main content -->
	<main class="flex-1 px-10 py-8">
		<!-- Search -->
		<div class="align-self-center relative mb-8">
			<div class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
				<svg
					class="h-5 w-5"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"
					/>
				</svg>
			</div>
			<input
				type="text"
				class="w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-12 text-gray-700 focus:border-[#F4571D] focus:ring-1 focus:ring-[#F4571D] focus:outline-none"
			/>
		</div>

		<!-- Recipe grid -->
		<div class="grid grid-cols-3 gap-6">
			{#each recipes as recipe (recipe)}
				<div
					class="cursor-pointer rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
				>
					<!-- Image placeholder -->
					<div class="flex h-44 items-center justify-center rounded-t-2xl bg-gray-50">
						<svg viewBox="0 0 80 70" class="h-24 w-24" xmlns="http://www.w3.org/2000/svg">
							<ellipse
								cx="40"
								cy="58"
								rx="32"
								ry="7"
								fill="#e0e0ea"
								stroke="#9b9bb0"
								stroke-width="1.2"
							/>
							<ellipse
								cx="39"
								cy="43"
								rx="20"
								ry="16"
								fill="#b87040"
								stroke="#7a4a28"
								stroke-width="1.2"
							/>
							<ellipse cx="36" cy="38" rx="11" ry="9" fill="#c8844a" opacity="0.6" />
							<ellipse
								cx="26"
								cy="53"
								rx="4"
								ry="7"
								fill="#b87040"
								stroke="#7a4a28"
								stroke-width="1"
								transform="rotate(-15 26 53)"
							/>
							<ellipse
								cx="52"
								cy="53"
								rx="4"
								ry="7"
								fill="#b87040"
								stroke="#7a4a28"
								stroke-width="1"
								transform="rotate(15 52 53)"
							/>
							<line
								x1="24"
								y1="43"
								x2="18"
								y2="30"
								stroke="#f0f0f0"
								stroke-width="2.5"
								stroke-linecap="round"
							/>
							<circle cx="17" cy="28" r="3" fill="#f0f0f0" stroke="#ccc" stroke-width="0.8" />
							<line
								x1="33"
								y1="38"
								x2="36"
								y2="27"
								stroke="#f0f0f0"
								stroke-width="2.5"
								stroke-linecap="round"
							/>
							<circle cx="36" cy="25" r="3" fill="#f0f0f0" stroke="#ccc" stroke-width="0.8" />
							<circle cx="28" cy="58" r="4.5" fill="#f0c040" stroke="#c8a020" stroke-width="0.8" />
							<circle cx="38" cy="60" r="4" fill="#f0c040" stroke="#c8a020" stroke-width="0.8" />
						</svg>
					</div>
					<!-- Name -->
					<div class="border-t border-gray-100 px-4 py-3">
						<p class="text-center text-sm text-gray-400">{recipe.name}</p>
					</div>
				</div>
			{/each}
		</div>
	</main>
</div>
