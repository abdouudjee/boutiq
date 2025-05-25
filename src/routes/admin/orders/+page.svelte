<script>
	import { order_row } from '$lib/tablerow.svelte';
	import { supabase } from '$lib/index.js';
	let orders = $state();
	$effect(async () => {
		let { data: ordrs, error } = await supabase.from('orders').select('*');
		orders = ordrs;
		await Promise.all(
			orders.map(async (order) => {
				const { data: clients, error } = await supabase
					.from('clients')
					.select('full_name')
					.eq('id', order.client_id);

				if (!error && clients.length > 0) {
					order.person = clients[0].full_name;
				} else {
					order.person = null;
				}
			})
		);
	});
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
			<th class=" w-35 rounded-tl-2xl border-b-2 border-b-gray-300 px-4 py-2">Order</th>
			<th class=" border-b-2 border-b-gray-300 px-4 py-2">Customer </th>
			<th class=" w-50 border-b-2 border-b-gray-300 px-4 py-2">date</th>
			<th class=" w-50 border-b-2 border-b-gray-300 px-4 py-2">total</th>
			<th class=" w-40 border-b-2 border-b-gray-300 px-4 py-2 text-center">status</th>
			<th class=" w-30 rounded-tr-2xl border-b-2 border-b-gray-300 px-4 py-2"></th>
		</tr>
	</thead>
	<tbody class="">
		{#each orders as order}
			{@render order_row({
				id: order.id,
				customer: order.person,
				date: order.order_date.slice(0, 10),
				total_amount: order.total_price,
				status: order.status_history[order.status_history.length - 1]
			})}
		{/each}
	</tbody>
</table>
