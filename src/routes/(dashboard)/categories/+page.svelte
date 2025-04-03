<script>
	import { category_row } from '$lib/tablerow.svelte';
</script>

<div
	class="sticky top-0 z-10 mb-10 flex h-24 w-full flex-col items-start justify-start gap-2 border-b-2 border-b-gray-300 bg-white py-4"
>
	<h1 class="text-2xl font-bold tracking-wider text-black">Categories</h1>
	<p class="text-gray-400">Manage product categories and subcategories.</p>
</div>
<div>
	
</div>
<table
	cellspacing="0"
	class="w-full border-separate rounded-t-2xl border-2 border-b-0 border-gray-300 bg-white text-left"
>
	<thead class="border-separate rounded-t-2xl">
		<tr class="rounded-t-2xl border-b-1 border-b-gray-300">
			<th class="w-10 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2">image</th>
			<th class="border-b-2 border-b-gray-300 px-4 py-2">category </th>
			<th class=" border-b-2 border-b-gray-300 px-4 py-2">description</th>
			<th class="w-40 border-b-2 border-b-gray-300  px-4 py-2">products</th>
			<th class="w-15 rounded-t-2xl border-b-2 border-b-gray-300  px-4 py-2"></th
			>
		</tr>
	</thead>
	<tbody class="">
		{@render category_row({name:'electronics',description:'electronic devices and gadgets',products_count: 10})}
		{@render category_row({name:'clothing',description:'clothing and apparel',products_count: 20})}
		{@render category_row({name:'home appliances',description:'home appliances and gadgets',products_count: 15})}
	</tbody>
</table>