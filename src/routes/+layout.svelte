<script>
	import { supabase } from '$lib';
	import '../app.css';
	import { onMount } from 'svelte';

	let { children } = $props();
	// retrieving url for favicon
	onMount(async () => {
		const favi = document.getElementById('favicon');
		let { data: store_info, error } = await supabase.from('store_info').select('favicon_url');
		favi.setAttribute('href', store_info[0].favicon_url);
	});
</script>

{@render children()}
