<script module>
	export { product_row, category_row, order_row, customer_row };
</script>

{#snippet product_row(product)}
	<tr>
		<td class="border-b-2 border-b-gray-300 px-4 py-2">
			<img
				src={product.img || 'placeholder.svg'}
				onerror={() => {
					this.src = 'placeholder.svg';
				}}
				alt=""
				class="style-none h-10 w-10 rounded-lg border-2 border-gray-300 bg-gray-300 object-cover"
			/></td
		>
		<td class="border-b-2 border-b-gray-300 px-4 py-2 text-left text-sm">{product.name}</td>
		<td class="w-30 border-b-2 border-b-gray-300 px-4 py-2">{product.price} Dzd</td>
		<td class="w-20 border-b-2 border-b-gray-300 px-4 py-2">{product.inventory}</td>
		<td class="w-40 border-b-2 border-b-gray-300 px-4 py-2 text-sm text-wrap break-words"
			>{product.category}</td
		>
		<td class="w-30 min-w-25 border-b-2 border-b-gray-300 py-2">
			<p
				class={[
					' mx-auto  w-fit rounded-full  px-2  py-1 text-sm font-medium',
					product.status == 'low stock'
						? 'border-1 border-yellow-200 bg-yellow-200 font-medium  text-yellow-700'
						: '',
					product.status == 'in stock' ? 'bg-green-200 font-medium  text-green-700' : '',
					product.status == 'out of stock' ? 'bg-red-200 font-medium  text-red-700' : ''
				]}
			>
				{product.status}
			</p></td
		>
		<td class="w-20 border-b-2 border-b-gray-300 px-4 py-2 text-center">
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button class="rounded-lg p-1 hover:bg-gray-200"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-ellipsis-icon lucide-ellipsis"
				>
					<circle cx="12" cy="12" r="1" />
					<circle cx="19" cy="12" r="1" />
					<circle cx="5" cy="12" r="1" />
				</svg></button
			></td
		>
	</tr>
{/snippet}
{#snippet category_row(category)}
	<tr>
		<td class="border-b-2 border-b-gray-300 px-4 py-2">
			<img
				src={category.img || 'placeholder.svg'}
				onerror={() => {
					this.src = 'placeholder.svg';
				}}
				alt=""
				class="style-none h-10 w-10 rounded-lg border-2 border-gray-300 bg-gray-300 object-cover"
			/></td
		>
		<td class="border-b-2 border-b-gray-300 px-4 py-2 text-left text-sm">{category.name}</td>
		<td class=" border-b-2 border-b-gray-300 px-4 py-2 text-sm">{category.description}</td>
		<td class="w-20 border-b-2 border-b-gray-300 px-4 py-2">{category.products_count}</td>

		<td class="w-20 border-b-2 border-b-gray-300 px-4 py-2 text-center">
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button class="rounded-lg p-1 hover:bg-gray-200"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-ellipsis-icon lucide-ellipsis"
				>
					<circle cx="12" cy="12" r="1" />
					<circle cx="19" cy="12" r="1" />
					<circle cx="5" cy="12" r="1" />
				</svg></button
			></td
		>
	</tr>
{/snippet}
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
					order.status == 'dilivered' ? 'bg-black font-medium  text-white' : '',
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

{#snippet customer_row(customer)}
	<tr>
		<td class="w-80 border-b-2 border-b-gray-300 px-4 py-2 text-left font-medium">
			<div class="flex flex-col">
				<p class="font-medium text-sm">
					{customer.name}
				</p>
				<p class="text-gray-500 text-sm">
					{customer.email}
				</p>
			</div>
		</td>
		<td class="w-20 border-b-2 border-b-gray-300 px-4 py-2 text-left font-medium"
			>{customer.orders_count}</td
		>
		<td class="w-20 border-b-2 border-b-gray-300 px-4 py-2 text-left font-medium"
			>{customer.total_spent}
		</td>
		<td class="w-20 border-b-2 border-b-gray-300 px-4 py-2 text-left font-medium"
			>{customer.last_order}</td
		>
		<td class="w-20 border-b-2 border-b-gray-300 px-4 py-2 text-left text-sm"
			><p
				class={[
					' mx-auto  w-fit rounded-full  px-2  py-1 text-sm font-medium ',
					customer.status == 'active' ? 'bg-green-200 font-medium  text-green-700' : '',
					customer.status == 'inactive' ? 'bg-red-200 font-medium  text-red-700' : '',
					customer.status == 'new' ? 'bg-blue-200 font-medium  text-blue-700' : ''
				]}
			>
				{customer.status}
			</p>
		</td>
		<td class="border-b-2 border-b-gray-300 px-4 py-2 text-left text-sm"></td>
	</tr>
{/snippet}
