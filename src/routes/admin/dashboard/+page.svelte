<script>
	import { bars, pie, clientsPie, ordersPie } from '$lib/actions/charts.svelte';
	import { supabase } from '$lib/index.js';
	let clients_pie = $state(false);
	let orders_pie = $state(false);
	let revenue = $state();
	let orders_count = $state(null);
	let products_count = $state(null);
	let Customers_stats = $state();
	let orders_stats = $state();
	let active_customers_count = $state(null);
	let orders = $state();
	let thisMonthOrders = $state();
	let thisMonthRevenue = $state();
	let revenues = $state([]);
	let cats = $state([]);
	let counts = $state([]);
	let mostRecentFive = $state([]);
	// customers status counting
	$effect(async () => {
		const { data, error } = await supabase.from('clients').select('status');

		if (error) {
			console.error(error);
		} else {
			const counts = data.reduce((acc, row) => {
				acc[row.status] = (acc[row.status] || 0) + 1;
				return acc;
			}, {});
			Customers_stats = [counts.new ?? 0, counts.active ?? 0, counts.inactive ?? 0];
			active_customers_count = counts.active + counts.new;
		}
	});
	// products counting
	$effect(async () => {
		const {
			data: products,
			count,
			error
		} = await supabase.from('products').select('*', { count: 'exact', head: false });

		const categoryCounts = {};

		products.forEach((product) => {
			const catId = product.category_id;
			categoryCounts[catId] = (categoryCounts[catId] || 0) + 1;
		});
		const { data: categories, error: err } = await supabase.from('categories').select('id,name');
		// Step 1: Sort categories by id ascending
		const sortedCategories = categories.slice().sort((a, b) => a.id - b.id);

		// Step 2: Extract only names in that order
		const sortedCategoryNames = sortedCategories.map((cat) => cat.name);

		// Step 3: Extract counts for those sorted ids
		const sortedCounts = sortedCategories.map((cat) => categoryCounts[cat.id] || 0);

		cats = sortedCategoryNames;
		counts = sortedCounts;
		products_count = count;
	});
	// orders counting
	$effect(async () => {
		const { data, count, error } = await supabase
			.from('orders')
			.select('status_history', { count: 'exact', head: false });
		orders_count = count;
		const counts = data.reduce((acc, row) => {
			acc[row.status_history[row.status_history.length - 1]] =
				(acc[row.status_history[row.status_history.length - 1]] || 0) + 1;
			return acc;
		}, {});
		orders_stats = Object.keys(counts).map((elem) => {
			return { label: elem, count: counts[elem] };
		});
		const { data: ors, error: x } = await supabase.from('orders').select('*');
		orders = ors;
		// getting this month orders
		const now = new Date();
		const currentMonth = now.getMonth(); // 0-based
		const currentYear = now.getFullYear();

		const thisMonthOrders = orders.filter((order) => {
			const orderDate = new Date(order.order_date);
			return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
		});

		thisMonthRevenue = thisMonthOrders.reduce((sum, order) => sum + order.total_price, 0);
		// Target year
		const year = 2025;

		// Initialize 12 months of revenue with 0
		const revenueArray = Array(12).fill(0);

		// Sum revenue for each month
		orders.forEach((order) => {
			const date = new Date(order.order_date);
			if (date.getFullYear() === year) {
				const monthIndex = date.getMonth(); // 0 = Jan, 11 = Dec
				revenueArray[monthIndex] += order.total_price;
			}
		});

		revenues = revenueArray;

		//getting most recent orders
		// Sort orders by date descending (newest first)
		const sortedOrders = orders
			.slice()
			.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));

		// Get the top 5 most recent
		mostRecentFive = sortedOrders.slice(0, 5);
		await Promise.all(
			mostRecentFive.map(async (order) => {
				const { data: clients, error } = await supabase
					.from('clients')
					.select('full_name,email')
					.eq('id', order.client_id);

				if (!error && clients.length > 0) {
					order.email = clients[0].email;
					order.person = clients[0].full_name;
				} else {
					order.email = null;
					order.person = null;
				}
			})
		);
	});
	// best selling
	let bestselling = $state();
	$effect(async () => {
		const { data, error } = await supabase.from('top_selling_products').select('*');
		console.table(data);
		bestselling = data;
	});
</script>

<div
	class="sticky top-0 z-10 flex h-24 w-full flex-col items-start justify-start gap-2 border-b-2 border-b-gray-300 bg-white py-4"
>
	<h1 class="text-2xl font-bold tracking-wider text-black">Dashboard</h1>
	<p class="text-gray-400">Overview of your store performance and recent activity.</p>
</div>
<!-- stats overview -->
<div
	class="grid
grid-cols-1
gap-4 py-4
sm:grid-cols-1 sm:grid-rows-4
md:grid-cols-2 md:grid-rows-2
xl:grid-cols-4 xl:grid-rows-1"
>
	<!-- total revinue -->
	<div class="flex h-30 items-center justify-center rounded-lg border-2 border-gray-300 shadow-sm">
		<div class="flex h-20 w-58 flex-col items-start justify-between">
			<div class="flex h-fit w-full items-center justify-between gap-2">
				<p class="font-medium">Total revenue</p>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#99a1af"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-dollar-sign text-muted-foreground h-4 w-4"
					><line x1="12" x2="12" y1="2" y2="22"></line><path
						d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
					></path></svg
				>
			</div>
			<div class="flex flex-col items-start justify-between">
				<p class="text- text-black">
					<span class="text-2xl font-bold">{thisMonthRevenue}</span>
					DZD
				</p>
				<p class="text-xs text-gray-400"><span></span> from this month</p>
			</div>
		</div>
	</div>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- orders stats -->
	<div
		class="flex h-30 items-center justify-center rounded-lg border-2 border-gray-300 shadow-sm hover:cursor-pointer"
		onclick={() => {
			orders_pie = true;
		}}
	>
		<div class="flex h-20 w-58 flex-col items-start justify-between">
			<div class="flex h-fit w-full items-center justify-between gap-2">
				<p class="font-medium">orders</p>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#99a1af"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-shopping-cart text-muted-foreground h-4 w-4"
					><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path
						d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
					></path></svg
				>
			</div>
			<div class="flex flex-col items-start justify-between">
				<span class="text-2xl font-bold">{orders_count ?? 'counting...'}</span>
				<p class="text-xs text-gray-400"><span></span> from last month</p>
			</div>
		</div>
	</div>
	<!-- products stats -->
	<div class="flex h-30 items-center justify-center rounded-lg border-2 border-gray-300 shadow-sm">
		<div class="flex h-20 w-58 flex-col items-start justify-between">
			<div class="flex h-fit w-full items-center justify-between gap-2">
				<p class="font-medium">products</p>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#99a1af"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-package text-muted-foreground h-4 w-4"
					><path d="m7.5 4.27 9 5.15"></path><path
						d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
					></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg
				>
			</div>
			<div class="flex flex-col items-start justify-between">
				<p class="text- text-black">
					<span class="text-2xl font-bold">{products_count ?? 'counting...'}</span>
				</p>
				<p class="text-xs text-gray-400">+<span>32</span> new this month</p>
			</div>
		</div>
	</div>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- clients stats -->
	<div
		class="w- flex h-30 items-center justify-center rounded-lg border-2 border-gray-300 shadow-sm hover:cursor-pointer"
		onclick={() => {
			clients_pie = true;
		}}
	>
		<div class="flex h-20 w-58 flex-col items-start justify-between">
			<div class="flex h-fit w-full items-center justify-between gap-2">
				<p class="font-medium">Active Customers</p>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#99a1af"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-users text-muted-foreground h-4 w-4"
					><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"
					></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"
					></path></svg
				>
			</div>
			<div class="flex flex-col items-start justify-between">
				<p class="text- text-black">
					<span class="text-2xl font-bold">{active_customers_count ?? 'counting...'}</span>
				</p>
				<p class="text-xs text-gray-400"><span></span> from last month</p>
			</div>
		</div>
	</div>
</div>
<!-- charts -->
<div class="flex h-fit w-full flex-nowrap items-start justify-between gap-3">
	<div class="h-115 w-full rounded-2xl border-2 border-gray-300 p-5 lg:w-210">
		{#if revenues.length}
			<canvas use:bars={[...revenues]}></canvas>
		{/if}
	</div>
	<div
		class="flex size-116 flex-col items-center justify-between rounded-2xl border-2 border-gray-300 p-8"
	>
		{#if cats.length}
			<canvas
				use:pie={{
					labels: [...cats],
					data: [...counts]
				}}
			></canvas>
		{/if}
		<p class="text-xl font-medium ">categories Distribution chart</p>
	</div>
</div>
<div class="flex w-full flex-wrap items-start justify-start gap-2 py-4 xl:flex-nowrap">
	<div
		class="flex h-fit w-full flex-col items-start justify-start gap-2 rounded-xl border-2 border-gray-300 px-4 py-5 shadow-sm xl:w-1/2"
	>
		<h1 class="text-2xl leading-4 font-bold">recent sales</h1>
		<p class="text-gray-400">Latest orders processed</p>
		<ul class="w-full">
			{#each mostRecentFive as order}
				<li class="flex h-15 w-full items-center justify-between px-4 py-2">
					<div class="flex h-full items-center justify-start gap-2">
						<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
							UN
						</div>
						<div class="flex flex-col items-start justify-center gap-1">
							<p class="text-base leading-4 font-medium text-black">{order.person}</p>
							<p class="leading-4 text-gray-400" title={order.email}>
								{('' + order.email).slice(0, 29)}
							</p>
						</div>
					</div>
					<p class="text-lg font-semibold">{order.total_price} dzd</p>
				</li>
			{/each}
		</ul>
	</div>

	<div
		class="flex h-fit w-full flex-col items-start justify-start gap-2 rounded-xl border-2 border-gray-300 px-4 py-5 shadow-sm xl:w-1/2"
	>
		<h1 class="text-2xl leading-4 font-bold">Top Products</h1>
		<p class="text-gray-400">Best selling products in your store.</p>
		<ul class="w-full">
			{#each bestselling as product}
				<li class="flex h-15 w-full items-center justify-between px-4 py-2">
					<div class="flex h-full items-center justify-start gap-2">
						<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
							<img src="" alt="" />
						</div>
						<div class="flex flex-col items-start justify-center">
							<p class="leading-4 font-medium text-black">{product.product_name}</p>
						</div>
					</div>
					<p class="text-lg font-semibold">{product.total_quantity_sold}</p>
				</li>
			{/each}
		</ul>
	</div>
</div>
{#if clients_pie}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
		onclick={() => {
			clients_pie = false;
		}}
	>
		<div
			class="flex size-150 flex-col justify-start rounded-2xl border-2 border-gray-300 bg-white"
			onclick={(e) => {
				e.stopPropagation();
			}}
		>
			<div class=" flex h-10 items-center justify-end px-3">
				<button
					onclick={() => {
						clients_pie = false;
					}}
					class="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:cursor-pointer hover:bg-gray-200 active:scale-95"
				>
					✕
				</button>
			</div>
			<div class="flex size-130 w-full items-center justify-center p-5">
				<canvas
					use:clientsPie={[
						Customers_stats?.[0] ?? null,
						Customers_stats?.[1] ?? null,
						Customers_stats?.[2] ?? null
					]}
				></canvas>
			</div>
			<div class="flex h-10 w-full items-center justify-center">
				<p class="text-xl font-bold">Client Status Distribution</p>
			</div>
		</div>
	</div>
{/if}

{#if orders_pie}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
		onclick={() => {
			orders_pie = false;
		}}
	>
		<div
			class="flex size-150 flex-col justify-start rounded-2xl border-2 border-gray-300 bg-white"
			onclick={(e) => {
				e.stopPropagation();
			}}
		>
			<div class=" flex h-10 items-center justify-end px-3">
				<button
					onclick={() => {
						orders_pie = false;
					}}
					class="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:cursor-pointer hover:bg-gray-200 active:scale-95"
				>
					✕
				</button>
			</div>
			<div class="flex size-130 w-full items-center justify-center p-5">
				<canvas use:ordersPie={[...orders_stats]}></canvas>
			</div>
			<div class="flex h-10 w-full items-center justify-center">
				<p class="text-xl font-bold">Order Status Distribution</p>
			</div>
		</div>
	</div>
{/if}
