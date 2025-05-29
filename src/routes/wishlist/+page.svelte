<script>
	import Product from '$lib/product.svelte';
	let { data } = $props();
	let products = $state(data.liked);
	console.log(products);
</script>

<div class="bg-smoke flex h-15 w-full items-center border-b-2 border-b-[#c3c0c0] pl-20">
	<p class="flex items-center gap-3 font-medium text-[#505050]">
		<span class="cursor-pointer hover:text-[#1f66f0]">Home</span> &#10095;
		<span class="text-wrap overflow-ellipsis text-[#1e1e1e]">Wishlist</span>
	</p>
</div>
<div class="bg-smoke flex w-full flex-col items-start gap-2 py-10 pl-20">
	<p class="text-3xl font-bold text-black">your wishlist</p>
	<p class="text-lg font-medium text-gray-400">save your favorite items for later</p>
</div>
<!-- wishlist items -->

<div class="w-full px-13 py-5">
	<div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
		{#each products as item}
			<Product
				name={item.products.name}
				isfav={true}
				price={item.products.selling_price}
				img_url={item.products.img_url[0]}
			/>
		{:else}
			<div class="col-span-full flex h-100 w-full items-center justify-center">
				<p class="text-center text-2xl font-medium text-gray-400">
					no items saved yet, any saved items will appear here.
				</p>
			</div>
		{/each}
	</div>
</div>
