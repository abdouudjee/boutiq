<script>
	import { bars, pie } from '$lib/actions/charts.svelte';
</script>

<div
	class="sticky top-0 z-10 flex h-24 w-full flex-col items-start justify-start gap-2 border-b-2 border-b-gray-300 bg-white py-4"
>
	<h1 class="text-2xl font-bold tracking-wider text-black">Dashboard</h1>
	<p class="text-gray-400">Overview of your store performance and recent activity.</p>
</div>
<div class="flex items-center justify-between gap-2 py-4">
	<div
		class="flex h-30 w-70 items-center justify-center rounded-lg border-2 border-gray-300 shadow-sm"
	>
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
					<span class="text-2xl font-bold">555.55</span>
					DZD
				</p>
				<p class="text-xs text-gray-400"><span></span> from last month</p>
			</div>
		</div>
	</div>
	<div
		class="flex h-30 w-70 items-center justify-center rounded-lg border-2 border-gray-300 shadow-sm"
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
				<span class="text-2xl font-bold">+30</span>
				<p class="text-xs text-gray-400"><span></span> from last month</p>
			</div>
		</div>
	</div>
	<div
		class="flex h-30 w-70 items-center justify-center rounded-lg border-2 border-gray-300 shadow-sm"
	>
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
					<span class="text-2xl font-bold">122</span>
				</p>
				<p class="text-xs text-gray-400">+<span>32</span> new this month</p>
			</div>
		</div>
	</div>
	<div
		class="flex h-30 w-70 items-center justify-center rounded-lg border-2 border-gray-300 shadow-sm"
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
					<span class="text-2xl font-bold">547</span>
				</p>
				<p class="text-xs text-gray-400"><span></span> from last month</p>
			</div>
		</div>
	</div>
</div>
<!-- overview with charts i'll make it later -->
<div class="flex h-fit w-full flex-wrap items-start gap-3">
	<div class="w-210 rounded-2xl border-2 border-gray-300 p-5">
		<canvas
			use:bars={{
				labels: [
					'Jan',
					'Feb',
					'Mar',
					'Apr',
					'May',
					'Jun',
					'Jul',
					'Aug',
					'Sep',
					'Oct',
					'Nov',
					'Dec'
				],
				data: [10000, 211111, 35555, 400000, 50000, 600000, 700000]
			}}
		></canvas>
	</div>
	<div class="size-110.5 rounded-2xl border-2 border-gray-300 p-5">
		<canvas
			use:pie={{
				labels: [
					'laptop',
					'laptops',
					'laptop',
					'laptops',
					'laptop',
					'laptops',
					'laptop',
					'laptops',
					'laptop',
					'laptops'
				],
				data: [1, 1, 3, 4, 5, 6, 7, 8, 9]
			}}
		></canvas>
	</div>
</div>
<div class="flex w-full items-start justify-start gap-2 py-4">
	<div
		class="flex h-fit w-1/2 flex-col items-start justify-start gap-2 rounded-xl border-2 border-gray-300 px-4 py-5 shadow-sm"
	>
		<h1 class="text-2xl leading-4 font-bold">recent sales</h1>
		<p class="text-gray-400">Latest orders processed</p>
		<ul class="w-full">
			<li class="flex h-15 w-full items-center justify-between px-4 py-2">
				<div class="flex h-full items-center justify-start gap-2">
					<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">UN</div>
					<div class="flex flex-col items-start justify-center">
						<p class="leading-4 text-black">user name here</p>
						<p class="leading-4 text-gray-400">email here</p>
					</div>
				</div>
				<p class="text-lg font-semibold">555dzd</p>
			</li>
			<li class="flex h-15 w-full items-center justify-between px-4 py-2">
				<div class="flex h-full items-center justify-start gap-2">
					<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">UN</div>
					<div class="flex flex-col items-start justify-center">
						<p class="leading-4 text-black">user name here</p>
						<p class="leading-4 text-gray-400">email here</p>
					</div>
				</div>
				<p class="text-lg font-semibold">555dzd</p>
			</li>
			<li class="flex h-15 w-full items-center justify-between px-4 py-2">
				<div class="flex h-full items-center justify-start gap-2">
					<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">UN</div>
					<div class="flex flex-col items-start justify-center">
						<p class="leading-4 text-black">user name here</p>
						<p class="leading-4 text-gray-400">email here</p>
					</div>
				</div>
				<p class="text-lg font-semibold">555dzd</p>
			</li>
			<li class="flex h-15 w-full items-center justify-between px-4 py-2">
				<div class="flex h-full items-center justify-start gap-2">
					<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">UN</div>
					<div class="flex flex-col items-start justify-center">
						<p class="leading-4 text-black">user name here</p>
						<p class="leading-4 text-gray-400">email here</p>
					</div>
				</div>
				<p class="text-lg font-semibold">555dzd</p>
			</li>
		</ul>
	</div>

	<div
		class="flex h-fit w-1/2 flex-col items-start justify-start gap-2 rounded-xl border-2 border-gray-300 px-4 py-5 shadow-sm"
	>
		<h1 class="text-2xl leading-4 font-bold">Top Products</h1>
		<p class="text-gray-400">Best selling products this month.</p>
		<ul class="w-full">
			<li class="flex h-15 w-full items-center justify-between px-4 py-2">
				<div class="flex h-full items-center justify-start gap-2">
					<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">UN</div>
					<div class="flex flex-col items-start justify-center">
						<p class="leading-4 text-black">product name here</p>
						<p class="leading-4 text-gray-400">category here</p>
					</div>
				</div>
				<p class="text-lg font-semibold">555dzd</p>
			</li>
			<li class="flex h-15 w-full items-center justify-between px-4 py-2">
				<div class="flex h-full items-center justify-start gap-2">
					<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">UN</div>
					<div class="flex flex-col items-start justify-center">
						<p class="leading-4 text-black">product name here</p>
						<p class="leading-4 text-gray-400">category here</p>
					</div>
				</div>
				<p class="text-lg font-semibold">555dzd</p>
			</li>
			<li class="flex h-15 w-full items-center justify-between px-4 py-2">
				<div class="flex h-full items-center justify-start gap-2">
					<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">UN</div>
					<div class="flex flex-col items-start justify-center">
						<p class="leading-4 text-black">product name here</p>
						<p class="leading-4 text-gray-400">category here</p>
					</div>
				</div>
				<p class="text-lg font-semibold">555dzd</p>
			</li>
			<li class="flex h-15 w-full items-center justify-between px-4 py-2">
				<div class="flex h-full items-center justify-start gap-2">
					<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">UN</div>
					<div class="flex flex-col items-start justify-center">
						<p class="leading-4 text-black">product name here</p>
						<p class="leading-4 text-gray-400">category here</p>
					</div>
				</div>
				<p class="text-lg font-semibold">555dzd</p>
			</li>
		</ul>
	</div>
</div>
