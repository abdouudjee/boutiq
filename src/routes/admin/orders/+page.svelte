<script>
	import { order_row } from '$lib/tablerow.svelte';
</script>

<div
	class="sticky top-0 z-10 mb-10 flex h-24 w-full flex-col items-start justify-start gap-2 border-b-2 border-b-gray-300 bg-white py-4"
>
	<h1 class="text-2xl font-bold tracking-wider text-black">Orders</h1>
	<p class="text-gray-400">View and manage customer orders and fulfillment.</p>
</div>

<table
	cellspacing="0"
	class="w-full border-separate rounded-t-2xl border-2 border-b-0 border-gray-300 bg-white text-left"
>
	<thead class="border-separate rounded-t-2xl">
		<tr class="rounded-t-2xl border-b-1 border-b-gray-300">
			<th class=" w-35  rounded-tl-2xl border-b-2 border-b-gray-300 px-4 py-2">Order</th>
			<th class=" border-b-2 border-b-gray-300 px-4 py-2">Customer </th>
			<th class=" w-50 border-b-2 border-b-gray-300 px-4 py-2">date</th>
			<th class=" w-50 border-b-2 border-b-gray-300 px-4 py-2">total</th>
			<th class=" w-40 border-b-2 border-b-gray-300 px-4 py-2 text-center">status</th>
			<th class=" w-30 rounded-tr-2xl border-b-2 border-b-gray-300 px-4 py-2"></th>
		</tr>
	</thead>
	<tbody class="">
		{@render order_row({ id:1, customer:'tralalilo tralala',date: '2022-12-02', total_amount:500,status:'shipped'})}
		{@render order_row({ id:2, customer:'tralalilo tralala',date: '2022-12-02', total_amount:500,status:'dilivered'})}
		{@render order_row({ id:3, customer:'tralalilo tralala',date: '2022-12-02', total_amount:500,status:'cancelled'})}
		{@render order_row({ id:4, customer:'tralalilo tralala',date: '2022-12-02', total_amount:500,status:'pending'})}
		{@render order_row({ id:5, customer:'tralalilo tralala',date: '2022-12-02', total_amount:500,status:'new'})}
		{@render order_row({ id:6, customer:'tralalilo tralala',date: '2022-12-02', total_amount:500,status:'processing'})}
		{@render order_row({ id:7, customer:'tralalilo tralala',date: '2022-12-02', total_amount:500,status:'shipped'})}
		{@render order_row({ id:8, customer:'tralalilo tralala',date: '2022-12-02', total_amount:500,status:'dilivered'})}
		{@render order_row({ id:9, customer:'tralalilo tralala',date: '2022-12-02', total_amount:500,status:'cancelled'})}
	</tbody>
</table>
