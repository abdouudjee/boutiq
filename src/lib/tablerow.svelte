<script module>
	export { order_row };
</script>

{#snippet order_row(order)}
	<tr>
		<td class="border-b-2 border-b-gray-300 px-4 py-2 text-left font-medium">{order.id}</td>
		<td class="border-b-2 border-b-gray-300 px-4 py-2 text-left text-sm">{order.customer}</td>
		<td class="border-b-2 border-b-gray-300 px-4 py-2 text-left font-medium">{order.date} </td>
		<td class="border-b-2 border-b-gray-300 px-4 py-2 text-left font-medium"
			>{order.total_amount} Dzd</td
		>
		<td class="border-b-2 border-b-gray-300 px-4 py-2 text-left text-sm"
			><p
				class={[
					' mx-auto  w-fit rounded-full  px-2  py-1 text-sm font-medium ',
					order.status == 'shipped' ? ' bg-green-200 font-medium  text-green-700' : '',
					order.status == 'delivered' ? 'bg-black font-medium  text-white' : '',
					order.status == 'cancelled' ? 'bg-red-100 font-medium  text-red-800' : '',
					order.status == 'pending' ? 'bg-yellow-200 font-medium  text-yellow-800' : '',
					order.status == 'new' ? 'bg-blue-200 font-medium  text-blue-700' : '',
					order.status == 'processing' ? 'bg-gray-400 font-medium  text-black' : ''
				]}
			>
				{order.status}
			</p>
		</td>
		<td class="border-b-2 border-b-gray-300 px-4 py-2 text-left text-sm"></td>
	</tr>
{/snippet}
