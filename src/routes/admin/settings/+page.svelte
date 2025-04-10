<script>
	import Cell from '$lib/cell.svelte';
	import { supabase } from '$lib/index.js';
	import { onMount } from 'svelte';
	let selected = $state('shipping');
	let store_desc = $state('');
	let logo = $state('');
	let favicon = $state('');
	$effect(() => {
		store_desc = store_desc.trimStart();
		if (store_desc.match(/\s{4,}$/)) {
			store_desc = store_desc.replace(/\s{4,}$/, '   ');
		}
	});
	let wilayas=$state([]);
	onMount(async () => {
		const { data } = await supabase.from('wilayas').select('*').range(0, 9);
		console.log(data);
		wilayas=data;
	});
</script>

<div
	class="py- sticky top-0 z-10 mb-4 flex h-24 w-full flex-col items-start justify-start gap-2 border-b-2 border-b-gray-300 bg-white"
>
	<h1 class="text-2xl font-bold tracking-wider text-black">Settings</h1>
	<p class="text-gray-400">Manage your store settings and preferences.</p>
</div>
<div class="flex h-fit w-full items-center justify-center gap-2 rounded-lg bg-gray-100 p-4">
	<button
		onclick={(selected = 'store')}
		class={[
			'flex w-full cursor-pointer flex-wrap items-center justify-center rounded-lg py-2  font-medium ',
			selected == 'store' ? 'bg-white text-black ' : 'text-gray-500 '
		]}>store</button
	>
	<button
		onclick={(selected = 'shipping')}
		class={[
			'flex w-full cursor-pointer flex-wrap items-center justify-center rounded-lg py-2 font-medium',
			selected == 'shipping' ? 'bg-white text-black' : 'text-gray-500'
		]}>shipping</button
	>
	<button
		onclick={(selected = 'admins')}
		class={[
			'flex w-full cursor-pointer flex-wrap items-center justify-center rounded-lg py-2 font-medium',
			selected == 'admins' ? 'bg-white text-black' : 'text-gray-500'
		]}>admins</button
	>
</div>
<div class="my-5 flex h-full w-full flex-col items-start justify-start gap-4">
	{#if selected == 'store'}
		<div class="h-fit w-full rounded-lg border-2 border-gray-300 px-4 py-2">
			<p class="text-3xl leading-10 font-medium tracking-wide text-black">store information</p>
			<div class="flex flex-col items-start justify-start gap-4 py-4">
				<div class="flex w-full flex-col items-start justify-start">
					<label for="store-name" class="font-medium">store name</label>
					<input
						type="text"
						id="store-name"
						class="mt-2 h-10 w-1/2 rounded-lg border-2 border-gray-300 px-4"
						placeholder="store name"
					/>
				</div>
				<div class="flex w-full flex-col items-start justify-start">
					<label for="store-description" class="font-medium">store description </label>

					<textarea
						bind:value={store_desc}
						name="store-description"
						id=""
						class="mt-2 h-30 w-full rounded-lg border-2 border-gray-300 text-left ring-0"
						style=" 
                    scroll-behavior: smooth;
                    scrollbar-width: none;"
					>
					</textarea>
				</div>
				<div class="flex w-full items-center justify-start gap-4">
					<div class="flex w-1/2 flex-col items-start justify-start">
						<label class="font-medium" for="store-name">contact email</label>
						<input
							type="text"
							id="store-name"
							class="mt-2 h-10 w-full rounded-lg border-2 border-gray-300 px-4"
							placeholder="store name"
						/>
					</div>
					<div class="flex w-1/2 flex-col items-start justify-start">
						<label for="store-name" class="font-medium">contact phone</label>
						<input
							type="text"
							id="store-name"
							class="mt-2 h-10 w-full rounded-lg border-2 border-gray-300 px-4"
							placeholder="store name"
						/>
					</div>
				</div>

				<div class="flex w-full flex-col items-start justify-start">
					<label for="store-description" class="font-medium">Store Address </label>

					<textarea
						name="store-description"
						id=""
						class="mt-2 h-15 w-full rounded-lg border-2 border-gray-300 px-4"
						style="
                    scroll-behavior: smooth;
                    scrollbar-width: none;"
					>
					</textarea>
				</div>
			</div>
			<div class="flex w-full items-center justify-end gap-4 px-4 py-2">
				<button
					class="flex cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-base font-medium hover:bg-gray-200 active:scale-95"
					>reset</button
				>
				<button
					class="flex cursor-pointer items-center justify-center rounded-lg border-2 bg-black px-4 py-2 text-base font-medium text-white hover:bg-gray-800 active:scale-95"
					>save changes</button
				>
			</div>
		</div>
		<div class="h-fit w-full rounded-lg border-2 border-gray-300 px-4 py-2">
			<p class="text-3xl leading-10 font-medium tracking-wide text-black">Store Appearance</p>
			<div class="flex flex-col items-start justify-start gap-4 py-4">
				<div class="flex w-full flex-col items-start justify-start">
					<label for="" class="font-medium">Store logo</label>
					<div class="flex items-center justify-between gap-4 py-4">
						<img
							src={logo || 'logo_placeholder.svg'}
							alt=""
							class="h-30 w-30 rounded-xl border-2 border-gray-300 object-fill p-4"
						/>
						<div
							class="relative flex h-10 w-fit items-center justify-center rounded-lg border-2 border-gray-300 px-4"
						>
							<label for="" id="filename">choose an image</label>
							<input
								class="absolute top-0 left-0 h-full w-full cursor-pointer rounded-lg opacity-0"
								type="file"
								accept=".ico,.png,"
								src=""
								alt="upload image"
								onchange={(e) => {
									const file = e.target.files?.[0];
									logo = file ? URL.createObjectURL(file) : null;
									if (file) {
										const filename = file.name;
										document.getElementById('filename').innerText = filename;
									} else {
										document.getElementById('filename').innerText = 'choose an image';
									}
								}}
							/>
						</div>
					</div>
					<label for="" class="font-medium">favicon</label>
					<div class="flex items-center justify-between gap-4 py-4">
						<img
							src={favicon || 'logo_placeholder.svg'}
							alt=""
							class="h-20 w-20 rounded-xl border-2 border-gray-300 object-fill p-4"
						/>
						<div
							class="relative flex h-10 w-fit items-center justify-center rounded-lg border-2 border-gray-300 px-4"
						>
							<label for="" id="favicon">choose an image</label>
							<input
								class="absolute top-0 left-0 h-full w-full cursor-pointer rounded-lg opacity-0"
								type="file"
								accept=".ico,.png,"
								src=""
								alt="upload image"
								onchange={(e) => {
									const file = e.target.files?.[0];
									favicon = file ? URL.createObjectURL(file) : null;
									if (file) {
										const filename = file.name;
										document.getElementById('favicon').innerText = filename;
									} else {
										document.getElementById('favicon').innerText = 'choose an image';
									}
								}}
							/>
						</div>
					</div>
					<label for="" class="font-medium">color palette</label>
					<!-- add it later  -->
					do to later
				</div>
			</div>

			<div class="flex w-full items-center justify-end gap-4 px-4 py-2">
				<button
					class="flex cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-base font-medium hover:bg-gray-200 active:scale-95"
					>reset</button
				>
				<button
					class="flex cursor-pointer items-center justify-center rounded-lg border-2 bg-black px-4 py-2 text-base font-medium text-white hover:bg-gray-800 active:scale-95"
					>save changes</button
				>
			</div>
		</div>
	{:else if selected == 'shipping'}
		<div
			class="flex h-fit w-full flex-col items-start justify-start gap-4 rounded-lg border-2 border-gray-300 px-4 py-4"
		>
			<div class="flex w-full items-center justify-between gap-4 py-4">
				<p class="text-3xl leading-10 font-medium tracking-wide text-black">shipping companies</p>
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
					<p class="hidden lg:block">add a company</p></button
				>
			</div>
			<div class="flex w-full items-center justify-center">
				<table
					cellspacing="0"
					class="w-fit border-separate rounded-t-2xl border-2 border-b-0 border-gray-300 bg-white text-left"
				>
					<thead class="border-separate rounded-t-2xl">
						<tr class="rounded-t-2xl border-b-1 border-b-gray-300">
							<th class="w-10 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2">image</th>
							<th class="border-b-2 border-b-gray-300 px-4 py-2">company </th>
							<th class="border-b-2 border-b-gray-300 px-4 py-2">default rate</th>
							<th class="w-50 border-b-2 border-b-gray-300 px-4 py-2">estimated delivery</th>
							<th class="w-30 border-b-2 border-b-gray-300 px-4 py-2 text-center">status</th>
							<th class="w-20 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2"></th>
						</tr>
					</thead>
					<tbody class="">
						{@render shippingcompanyrow({
							name: 'zr express',
							default_rate: 2000,
							estimated_delivery: 2,
							status: 'active'
						})}
						{@render shippingcompanyrow({
							name: 'dhd express',
							default_rate: 5000,
							estimated_delivery: 3,
							status: 'inactive'
						})}
						{@render shippingcompanyrow({
							name: 'yalidin express',
							default_rate: 10000,
							estimated_delivery: 5,
							status: 'active'
						})}
						{@render shippingcompanyrow({
							name: 'lihlih express',
							default_rate: 15000,
							estimated_delivery: 7,
							status: 'inactive'
						})}
					</tbody>
				</table>
			</div>
		</div>
		<div
			class="flex h-fit w-full flex-col items-start justify-start gap-4 rounded-lg border-2 border-gray-300 px-4 py-4"
		>
			<div class="flex w-full items-center justify-between gap-4 py-4">
				<p class="text-3xl leading-10 font-medium tracking-wide text-black">shipping prices</p>
			</div>
			<div class="flex w-full items-center justify-center">
				<table
					cellspacing="0"
					class="w-fit border-separate rounded-t-2xl border-2 border-b-0 border-gray-300 bg-white text-left"
				>
					<thead class="border-separate rounded-t-2xl">
						<tr class="rounded-t-2xl border-b-1 border-b-gray-300">
							<th class="w-10 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2">code</th>
							<th class="w-35 border-b-2 border-b-gray-300 px-4 py-2">states </th>
							<th class="w-35 border-b-2 border-b-gray-300 px-4 py-2">zr express </th>
							<th class="w-35 border-b-2 border-b-gray-300 px-4 py-2">zr express </th>
							<th class="w-35 border-b-2 border-b-gray-300 px-4 py-2">zr express </th>
							<th class="w-35 border-b-2 border-b-gray-300 px-4 py-2">zr express </th>
						</tr>
					</thead>
					<tbody>
						{#each wilayas as wilaya, id}
							<tr class="h-12">
								<td class="w-10 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2"
									>{('' + (id + 1)).padStart(2, '0')}</td
								>
								<td class="w-40 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2">{wilaya.name}</td>
								<Cell value="500" />
								<td class="w-35 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2"></td>
								<td class="w-35 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2">600 dzd</td>
								<td class="w-35 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2">400 dzd</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{:else if selected == 'admins'}
		admins settings
	{/if}
</div>

{#snippet shippingcompanyrow(company)}
	<tr>
		<td class="w-10 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2"
			><img
				src={company.image || '/placeholder.svg'}
				onerror={() => {
					this.src = '/placeholder.svg';
				}}
				alt=""
				class="style-none h-10 w-10 rounded-lg border-2 border-gray-300 bg-gray-300 object-cover"
			/></td
		>
		<td class="border-b-2 border-b-gray-300 px-4 py-2">{company.name}</td>
		<td class="border-b-2 border-b-gray-300 px-4 py-2 font-medium"
			>{company.default_rate} <span class="text-sm font-normal">DZD</span></td
		>
		<td class="w-20 border-b-2 border-b-gray-300 px-4 py-2">{company.estimated_delivery} days</td>
		<td class="w-30 border-b-2 border-b-gray-300 px-4 py-2 text-center"
			><p
				class={[
					' mx-auto  w-fit rounded-full  px-2  py-1 text-sm font-medium',
					company.status == 'inactive'
						? 'border-1 border-red-300 bg-red-200 font-medium  text-red-700'
						: '',
					company.status == 'active'
						? 'border-1 border-green-400  bg-green-200 font-medium text-green-700'
						: ''
				]}
			>
				{company.status}
			</p></td
		>
		<td class="w-20 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2"></td>
	</tr>
{/snippet}