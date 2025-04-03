<script>
	import {product_row} from '$lib/tablerow.svelte';
</script>

<div
	class="sticky top-0 z-10 mb-10 flex h-24 w-full flex-col items-start justify-start gap-2 border-b-2 border-b-gray-300 bg-white py-4"
>
	<h1 class="text-2xl font-bold tracking-wider text-black">Products</h1>
	<p class="text-gray-400">Manage your product inventory, categories, and pricing.</p>
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
		{@render product_row({name:'air frier', price: 20000, inventory: 10, category: 'elctronics', status: 'in stock'})}
		{@render product_row({name:'fridge', price: 5475, inventory: 47, category: 'electronics', status: 'low stock'})}
		{@render product_row({name:'bike', price: 33333, inventory: 0, category: 'sports', status: 'out of stock'})}
		{@render product_row({name:'coffee machine', price: 333, inventory: 25, category: 'kitchen', status: 'in stock'})}
		{@render product_row({name:'ice cream machine', price: 8399, inventory: 47, category: 'kitchen', status: 'low stock'})}
		{@render product_row({name:'meow', price: 400, inventory: 0, category: 'kitchen', status: 'out of stock'})}
	</tbody>
</table>
