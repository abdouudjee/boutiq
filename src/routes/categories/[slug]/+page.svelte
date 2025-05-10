<script>
	import Product from '$lib/product.svelte';
	let discounted_only = $state();
	let new_arrival_only = $state();
	let plus_4_stars = $state();
	let min_price = $state();
	let max_price = $state();
</script>

<div class="bg-smoke flex h-15 w-full items-center border-b-2 border-b-[#c3c0c0] pl-20">
	<p class="flex items-center gap-3 font-medium text-[#505050]">
		<span class="cursor-pointer hover:text-[#1f66f0]">Home</span> &#10095;
		<span class="cursor-pointer hover:text-[#1f66f0]">Categories</span>
		&#10095;
		<span class="text-wrap overflow-ellipsis text-[#1e1e1e]">some crappy name for the category</span
		>
	</p>
</div>
<div class="bg-smoke flex flex-col gap-2 py-10 pl-20">
	<p class="text-3xl font-bold text-black">crappy name</p>
	<p class="text-lg font-medium text-gray-400">Discover our collection of crappy name</p>
</div>
<!-- filters bar -->
<div class="flex h-fit w-full items-center justify-start gap-5 px-4 py-2">
	<div class="flex h-fit w-fit items-center justify-center p-1">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-settings2-icon lucide-settings-2"
			><path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle
				cx="7"
				cy="7"
				r="3"
			/></svg
		>
	</div>
	<label class="flex cursor-pointer items-center space-x-2">
		<input type="checkbox" class="peer sr-only" bind:checked={discounted_only} />
		<div
			class="flex h-fit items-center justify-between rounded-full border-2 border-gray-300 bg-white font-medium peer-checked:border-blue-500 peer-checked:bg-blue-200"
		>
			<p class="px-2 py-1.5">discounted item</p>
			{#if discounted_only}
				<div
					class="flex items-center justify-evenly rounded-r-full border-l-2 border-l-blue-500 px-3 py-1.5 hover:bg-blue-300"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class=""><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
					>
				</div>{/if}
		</div>
	</label>
	<label class="flex cursor-pointer items-center space-x-2">
		<input type="checkbox" class="peer sr-only" bind:checked={new_arrival_only} />
		<div
			class="flex h-fit items-center justify-between rounded-full border-2 border-gray-300 bg-white font-medium peer-checked:border-blue-500 peer-checked:bg-blue-200"
		>
			<p class="px-3 py-1.5">new arrival</p>
			{#if new_arrival_only}
				<div
					class="flex items-center justify-evenly rounded-r-full border-l-2 border-l-blue-500 px-3 py-1.5 hover:bg-blue-300"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class=""><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
					>
				</div>{/if}
		</div>
	</label>

	<label class="flex cursor-pointer items-center space-x-2">
		<input type="checkbox" class="peer sr-only" bind:checked={plus_4_stars} />
		<div
			class="flex h-fit items-center justify-between rounded-full border-2 border-gray-300 bg-white font-medium peer-checked:border-blue-500 peer-checked:bg-blue-200"
		>
			<p class="flex items-center px-3 py-1.5">
				+4
				<img src="/stars/full.svg" alt="" class="size-5" />
				rating
			</p>
			{#if plus_4_stars}
				<div
					class="flex items-center justify-evenly rounded-r-full border-l-2 border-l-blue-500 px-3 py-1.5 hover:bg-blue-300"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class=""><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
					>
				</div>{/if}
		</div>
	</label>
	<div class="flex w-fit items-center gap-3">
		<label for="">min price:</label>
		<input
			type="number"
			placeholder="0"
			class="h-8 w-25 rounded-2xl px-2"
			bind:value={min_price}
			onchange={() => {
				if (min_price > max_price) min_price = max_price - 1;
			}}
		/>
	</div>
	<div class="flex w-fit items-center gap-3">
		<label for="">max price:</label>
		<input
			type="number"
			placeholder="1000000"
			class="h-8 w-25 rounded-2xl px-2"
			bind:value={max_price}
			onchange={() => {
				if (max_price < min_price) max_price = min_price + 1;
			}}
		/>
	</div>
</div>
<!-- list of products-->
<div class="w-full px-13 py-5">
	<div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
		{#each [1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 0, 0, 0, 0] as item}
			<Product />
		{:else}
			<div class="col-span-full flex h-100 w-full items-center justify-center">
				<p class="text-center text-2xl font-medium text-gray-400">
					no items saved yet, any saved items will appear here.
				</p>
			</div>
		{/each}
	</div>
</div>

<style>
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		margin: 0;
	}
</style>
