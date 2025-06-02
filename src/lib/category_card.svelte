<script>
	import { goto } from '$app/navigation';

	let { id, img_url, name } = $props();
	let image = $state();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	id="img"
	class="relative flex h-50 w-38.5 justify-center rounded-xl shadow-md"
	onclick={() => {
		goto(`/categories/${name}`);
	}}
>
	<span
		class="absolute top-2.5 text-xl font-bold text-white mix-blend-plus-darker text-shadow-2xs text-shadow-black"
		>{name}</span
	>
	<img
		bind:this={image}
		onerror={(e) => {
			e.currentTarget.src = '/placeholder.svg';
		}}
		src={img_url ?? '/placeholder.svg'}
		alt=""
		class="h-50 w-38.5 rounded-xl object-cover"
	/>
</div>
