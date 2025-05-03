<script>
	import Product from '$lib/product.svelte';
</script>

<div class="bg-smoke flex h-15 w-full items-center pl-20">
	<p class="flex items-center gap-3 font-medium text-[#505050]">
		<span class="cursor-pointer hover:text-[#1f66f0]">Home</span> &#10095;
		<span class="text-wrap overflow-ellipsis text-[#1e1e1e]">Wishlist</span>
	</p>
</div>
<div class="flex w-full flex-col items-start gap-2 py-10 pl-20">
	<p class="text-3xl font-bold text-black">your wishlist</p>
	<p class="text-lg font-medium text-gray-400">save your favorite items for later</p>
</div>
<!-- wishlist items -->
<div class="flex w-full flex-wrap items-start gap-3 px-20 py-5">
	{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
		<Product />
	{:else}
		<div class="flex items-center justify-center w-screen h-100">
			<p class="font-medium text-gray-400 text-2xl text-wrap text-center">
				no items saved yet, any saved items will appear here.
			</p>
		</div>
	{/each}
</div>
