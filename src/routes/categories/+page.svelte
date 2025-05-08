<script>
	import Category from '$lib/ui/category.svelte';
</script>

<div class="bg-smoke flex h-15 w-full items-center border-b-2 border-b-[#c3c0c0] pl-20">
	<p class="flex items-center gap-3 font-medium text-[#505050]">
		<span class="cursor-pointer hover:text-[#1f66f0]">Home</span> &#10095;
		<span class="text-wrap overflow-ellipsis text-[#1e1e1e]">Categories</span>
	</p>
</div>
<div class="bg-smoke flex flex-col gap-2 py-10 pl-20">
	<p class="text-3xl font-bold text-black">Browse All Categories</p>
	<p class="text-lg font-medium text-gray-400">
		Browse our full range of categories to find exactly what you need
	</p>
</div>

<div class="flex flex-wrap items-center justify-center gap-5 px-2 py-10">
	{#each [1, 2, 3, 4, 5, 6, 7, 8]}
		<Category />
	{/each}
</div>
