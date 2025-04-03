<script>
	import Row from "$lib/tablerow.svelte";
</script>
<div
	class="sticky top-0 z-10 mb-10 flex h-24 w-full flex-col items-start justify-start gap-2 border-b-2 border-b-gray-300 bg-white py-4"
>
	<h1 class="text-2xl font-bold tracking-wider text-black">Products</h1>
	<p class="text-gray-400">Manage your product inventory, categories, and pricing.</p>
</div>
	<table cellspacing="0" class="w-full border-separate  rounded-t-2xl border-2 border-gray-300 bg-white text-left border-b-0">
		<thead class="rounded-t-2xl border-separate">
			<tr class="rounded-t-2xl border-b-1 border-b-gray-300">
				<th class="border-b-2 border-b-gray-300 rounded-t-2xl px-4 py-2 w-10">image</th>
				<th class="border-b-2 border-b-gray-300 px-4 py-2">Product </th>
				<th class="border-b-2 border-b-gray-300 px-4 py-2">Price</th>
				<th class="border-b-2 border-b-gray-300 px-4 py-2 w-20">inventory</th>
				<th class="border-b-2 border-b-gray-300 px-4 py-2 w-40">Category</th>
				<th class="border-b-2 border-b-gray-300 px-4 py-2 w-30 text-center">status</th>
				<th class="border-b-2 border-b-gray-300 rounded-t-2xl px-4 py-2 w-20"></th>
			</tr>
		</thead>
		<tbody class="">
			<Row status='in stock' name='fridge lg ' category='electronics and home appliances' price=5000 />
			<Row status='low stock' inventory=50000 />
			<Row status='out of stock'/>
		</tbody>
	</table>