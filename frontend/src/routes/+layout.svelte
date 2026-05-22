<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Body from '$lib/components/Body.svelte';
	import Header from '$lib/components/Header.svelte';
	import SideBar from '$lib/components/SideBar.svelte';
	import './layout.css';
	let { children, data } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Header user={data.user} />
<div class="flex min-h-screen bg-[#EDEAE6]">
	<SideBar />
	<Body {children} />
</div>
