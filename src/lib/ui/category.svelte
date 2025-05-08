<script>
	import { goto } from '$app/navigation';

	let { category = { image: null, name: 'Jean' } } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="group relative h-70 w-90 cursor-pointer overflow-hidden rounded-xl"
	onclick={() => {
		goto(`/categories/${category.name}`);
	}}
>
	<!-- Image with filters -->
	<img
		src={category.image ?? '/categories/jean.png'}
		alt="Jean Category"
		class="h-70 w-90 transform rounded-xl object-cover object-center transition duration-300 ease-in group-hover:scale-110 group-hover:blur-[1px] group-hover:brightness-90"
	/>
	<!-- Bottom overlay -->
	<div
		class="absolute bottom-0 z-10 flex h-0 w-full items-center justify-between gap-3 rounded-b-xl bg-black px-4 opacity-0 transition-all duration-300 ease-in group-hover:h-14 group-hover:opacity-100"
	>
		<p class="text-xl font-semibold text-white">{category.name}</p>
		<div class="flex size-8 items-center justify-center rounded-full hover:bg-gray-500">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="28"
				height="28"
				viewBox="0 0 24 24"
				fill="none"
				stroke="white"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="duration-150"
			>
				<path d="M5 12h14" />
				<path d="m12 5 7 7-7 7" />
			</svg>
		</div>
	</div>
</div>
