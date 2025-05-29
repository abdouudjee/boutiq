<script>
	import Product from '$lib/product.svelte';
	let { data } = $props();
</script>

<div class="bg-smoke flex h-15 w-full items-center border-b-2 border-b-[#c3c0c0] pl-20">
	<p class="flex items-center gap-3 font-medium text-[#505050]">
		<span class="cursor-pointer hover:text-[#1f66f0]">Home</span> &#10095;
		<span class="text-wrap overflow-ellipsis text-[#1e1e1e]">products</span>
	</p>
</div>
<div class="bg-smoke flex flex-col gap-2 py-10 pl-20">
	<p class="text-3xl font-bold text-black">Browse All products</p>
	<p class="text-lg font-medium text-gray-400">
		Browse our full range of products to find exactly what you need
	</p>
</div>
<div class="w-full px-13 py-5">
	<div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
		{#each data.products as item}
			<Product
				id={item.id}
				img_url={item.img_url[0]}
				name={item.name}
				price={item.selling_price}
				discount={item.discount}
			/>
		{:else}
			<div class="col-span-full gap-4 flex h-100 w-full flex-col items-center justify-center">
				<p class="text-center text-2xl font-medium text-gray-400">
					no products found try to refrech the page
				</p>
				<button class="py-2 px-4 text-base underline border-2 rounded-xl "
					onclick={() => {
						location.reload();
					}}>refrech</button
				>
			</div>
		{/each}
	</div>
</div>
