<script>
	import Customer from '$lib/rows/customer.svelte';
	import { supabase } from '$lib/index.js';
	let form = $state(true);
	let clients = $state([]);
	$effect(() => {
		form ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
	});
	$effect(async () => {
		let { data: clients_list, error } = await supabase.from('clients').select('*');
		clients = clients_list;
	});
</script>

<div
	class="mb-10 flex h-24 w-full items-center justify-between gap-2 border-b-2 border-b-gray-300 bg-white py-4"
>
	<div>
		<h1 class="text-2xl font-bold tracking-wider text-black">Customers</h1>
		<p class="text-gray-400">View and manage your customer base and their purchase history.</p>
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
		<p class="hidden lg:block">add a customer</p></button
	>
</div>
<table
	cellspacing="0"
	class="w-full border-separate rounded-t-2xl border-2 border-b-0 border-gray-300 bg-white text-left"
>
	<thead class="border-separate rounded-t-2xl">
		<tr class="rounded-t-2xl border-b-1 border-b-gray-300">
			<th class=" w-80 rounded-tl-2xl border-b-2 border-b-gray-300 px-4 py-2">Customer</th>
			<th class=" w-30 border-b-2 border-b-gray-300 px-4 py-2 text-left">Orders </th>
			<th class=" w-35 border-b-2 border-b-gray-300 px-4 py-2">total spent</th>
			<th class=" w-35 border-b-2 border-b-gray-300 px-4 py-2">last Order</th>
			<th class=" w-30 border-b-2 border-b-gray-300 px-4 py-2 text-center">status</th>
			<th class=" w-30 rounded-tr-2xl border-b-2 border-b-gray-300 px-4 py-2">actions</th>
		</tr>
	</thead>
	<tbody class="">
		{#each clients as client}
			<Customer customer={client} />{:else}
			<tr class="h-40">
				<th class="text-cetner border-b-2 border-b-gray-300" colspan="100%">
					<div class="flex items-center justify-center gap-2.5 flex-col">
						<p class="text-center text-xl font-medium text-gray-400">
							you don't have any customr yet, they will appear here the moment they sign up
						</p>
						<p class="text-gray-400 font-medium">or you can add them manually</p>
					</div>
				</th>
			</tr>
		{/each}
	</tbody>
</table>
