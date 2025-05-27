<script>
	// import { supabase } from '$lib/index.js';
	import '../app.css';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';

	let { children, data } = $props();
	let { supabase, session } = $derived(data);
	// retrieving url for favicon
	onMount(async () => {
		const favi = document.getElementById('favicon');
		let { data: store_info, error } = await supabase.from('store_info').select('favicon_url');
		favi.setAttribute('href', store_info[0].favicon_url);
	});
	// supa base auth realted shit
	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		return () => data.subscription.unsubscribe();
	});
</script>

{@render children()}
