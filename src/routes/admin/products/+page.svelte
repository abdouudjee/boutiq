<script>
	import { product_row } from '$lib/tablerow.svelte';
	let form = $state(true);
	$effect(() => {
		form ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
	});
	let variants = [1, 2, 3, 4];
</script>

<div
	class="mb-10 flex h-24 w-full items-center justify-between gap-2 border-b-2 border-b-gray-300 bg-white py-4"
>
	<div>
		<h1 class="text-2xl font-bold tracking-wider text-black">Products</h1>
		<p class="text-gray-400">Manage your product inventory, categories, and pricing.</p>
	</div>
	<button
		onclick={() => (form = true)}
		class="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 font-medium text-white transition duration-200 ease-in-out hover:cursor-pointer hover:bg-gray-800 active:scale-95"
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
			class="h-5 w-4"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg
		>
		<p class="hidden lg:block">add a product</p></button
	>
</div>
<table
	cellspacing="0"
	class="w-full border-separate rounded-t-2xl border-2 border-b-0 border-gray-300 bg-white text-left"
>
	<thead class="border-separate rounded-t-2xl">
		<tr class="rounded-t-2xl border-b-1 border-b-gray-300">
			<th class="w-10 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2">image</th>
			<th class="border-b-2 border-b-gray-300 px-4 py-2">Product </th>
			<th class="border-b-2 border-b-gray-300 px-4 py-2">Price</th>
			<th class="w-20 border-b-2 border-b-gray-300 px-4 py-2">inventory</th>
			<th class="w-40 border-b-2 border-b-gray-300 px-4 py-2">Category</th>
			<th class="w-30 border-b-2 border-b-gray-300 px-4 py-2 text-center">status</th>
			<th class="w-20 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2"></th>
		</tr>
	</thead>
	<tbody class="">
		{@render product_row({
			name: 'air frier',
			price: 20000,
			inventory: 10,
			category: 'elctronics',
			status: 'in stock'
		})}
		{@render product_row({
			name: 'fridge',
			price: 5475,
			inventory: 47,
			category: 'electronics',
			status: 'low stock'
		})}
		{@render product_row({
			name: 'bike',
			price: 33333,
			inventory: 0,
			category: 'sports',
			status: 'out of stock'
		})}
		{@render product_row({
			name: 'coffee machine',
			price: 333,
			inventory: 25,
			category: 'kitchen',
			status: 'in stock'
		})}
		{@render product_row({
			name: 'ice cream machine',
			price: 8399,
			inventory: 47,
			category: 'kitchen',
			status: 'low stock'
		})}
		{@render product_row({
			name: 'meow',
			price: 400,
			inventory: 0,
			category: 'kitchen',
			status: 'out of stock'
		})}{@render product_row({
			name: 'air frier',
			price: 20000,
			inventory: 10,
			category: 'elctronics',
			status: 'in stock'
		})}
		{@render product_row({
			name: 'fridge',
			price: 5475,
			inventory: 47,
			category: 'electronics',
			status: 'low stock'
		})}
		{@render product_row({
			name: 'bike',
			price: 33333,
			inventory: 0,
			category: 'sports',
			status: 'out of stock'
		})}
		{@render product_row({
			name: 'coffee machine',
			price: 333,
			inventory: 25,
			category: 'kitchen',
			status: 'in stock'
		})}
		{@render product_row({
			name: 'ice cream machine',
			price: 8399,
			inventory: 47,
			category: 'kitchen',
			status: 'low stock'
		})}
		{@render product_row({
			name: 'meow',
			price: 400,
			inventory: 0,
			category: 'kitchen',
			status: 'out of stock'
		})}
	</tbody>
</table>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	onclick={() => (form = false)}
	class={[
		'fixed inset-0 z-50 flex items-center justify-center bg-black/50',
		form ? 'flex' : 'hidden'
	]}
>
	<div
		onclick={(e) => e.stopPropagation()}
		class="relative z-60 max-h-[90vh] w-[90vw] overflow-y-auto rounded-xl bg-white p-6 shadow-lg"
	>
		<!-- Header -->
		<div class="mb-6 flex items-center justify-between">
			<h2 class="text-xl font-semibold">Add Product</h2>
			<button onclick={() => (form = false)} class="text-gray-500 hover:text-gray-700"> ✕ </button>
		</div>

		<!-- Form Body -->
		<div class="flex flex-col gap-6 md:flex-row">
			<!-- Left: Product Info -->
			<div class="flex-1 space-y-4">
				<input type="text" placeholder="Product Name" class="input" />
				<input type="text" placeholder="Product Price" class="input" />
				<input type="text" placeholder="Inventory" class="input" />
				<input type="text" placeholder="Category" class="input" />
				<textarea placeholder="Description" rows="4" class="input"></textarea>
			</div>

			<!-- Right: Variants -->
			<div class="flex-1 space-y-4">
				{#each variants as variant, i}
					<div class="space-y-3 rounded-lg bg-gray-100 p-4">
						<h3 class="text-sm font-semibold text-gray-600">Variant {i + 1}</h3>
						<input type="text" placeholder="Image URL" class="input" />
						<input type="text" placeholder="Size" class="input" />
						<input type="text" placeholder="Color" class="input" />
					</div>
				{/each}

				<button
					class="mt-2 w-full rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
					onclick={addVariant}
				>
					Add Variant
				</button>
			</div>
		</div>
	</div>
</div>

<!-- <div

	onclick={() => (form = false)}
	class={[
		'fixed top-0 left-0 z-100  h-full w-full items-center justify-center bg-black/75',
		form ? 'flex' : 'hidden'
	]}
>
	<div
		class="z-200 h-3/4 w-3/4 bg-white flex items-center justify-center"
		onclick={() => {
			event.stopPropagation();
		}}
	><div class="h-full w-1/2">
<input type="text" placeholder="product name" class="w-full rounded-lg border-2 border-gray-300 px-4 py-2" />
<input type="text" placeholder="product price" class="w-full rounded-lg border-2 border-gray-300 px-4 py-2" />
<input type="text" placeholder="product inventory" class="w-full rounded-lg border-2 border-gray-300 px-4 py-2" />
<input type="text" placeholder="product category" class="w-full rounded-lg border-2 border-gray-300 px-4 py-2" />
<input type="text" placeholder="product description" class="w-full rounded-lg border-2 border-gray-300 px-4 py-2" />
	</div>
<div 
 class="h-full w-1/2 bg-gray-200 overflow-auto">
 {#each [1, 2, 3,4] as i}
 <div>
	<p>variant {i}</p>
	<input type="text" placeholder="product image" class="w-full rounded-lg border-2 border-gray-300 px-4 py-2" />
	<input type="text" placeholder="size" class="w-full rounded-lg border-2 border-gray-300 px-4 py-2" />
	<input type="text" placeholder="color" class="w-full rounded-lg border-2 border-gray-300 px-4 py-2" />
 </div>
 {/each}
 
<button
	onclick={() => {}}
	class="mt-4 rounded-lg bg-gray-500 px-4 py-2 font-medium text-white transition duration-200 ease-in-out hover:bg-gray-600 active:scale-95"
>
	add variant
</button>
</div></div>
</div> -->
