<script>
	import Cell from '$lib/cell.svelte';
	import { supabase } from '$lib/index.js';
	import { onMount } from 'svelte';

	// selected settings
	let selected = $state('store');
	// store form vars
	let store_infos = $state({});
	let store_desc = $state('');
	let store_name = $state('');
	let store_email = $state();
	let store_phone = $state();
	let store_address = $state();
	let logo = $state('');
	let favicon = $state('');
	$effect(() => {
		store_desc = store_desc.trimStart();
		if (store_desc.match(/\s{4,}$/)) {
			store_desc = store_desc.replace(/\s{4,}$/, '   ');
		}
	});
	let wilayas = $state([]);
	onMount(async () => {
		const { data } = await supabase.from('wilayas').select('*').range(0, 50);
		wilayas = data;
		let { data: products, error: err } = await supabase.from('products').select('*');
	});
	// add admin form vars
	let adminform = $state(false);
	let menuopen = $state(false);
	let dropdownvalue = $state(null);
	let admin_fullname = $state('');
	let admin_email = $state('');
	// add shipping company vars
	let shipping_company_form = $state(false);
	let shipping_company_name = $state('');
	let shipping_company_default_rate = $state('');
	let shipping_company_estimated_time = $state('');
	// removing overflow when the forms are open
	$effect(() => {
		shipping_company_form || adminform
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'auto');
	});
	// fetching store info
	onMount(async () => {
		let { data: store_info, error } = await supabase.from('store_info').select('*');
		store_info = store_info[0];
		store_desc = store_info.store_description;
		store_name = store_info.store_name;
		store_email = store_info.email;
		store_phone = store_info.phone;
		store_address = store_info.address;
		logo = store_info.logo_url;
		favicon = store_info.favicon_url;
		store_infos = store_info;
	});
	let faviconfile = $state();
	let logofile = $state();
	// fetching shipping companies
	let shipping_companies = $state();
	$effect(async () => {
		let { data: shipping_comps, error } = await supabase.from('shipping_companies').select('*');
		shipping_companies = shipping_comps;
	});
	// fetching shipping prices
	let prices = $state();
	$effect(async () => {
		const { data, error } = await supabase.from('shipping_prices').select(`
    id,
    price,
    shipping_companies (
      id,
      name
    ),
    wilayas (
      id,
      name
    )
  `);
		data.sort((a, b) => a.wilayas.id - b.wilayas.id);
		prices = data;
		console.table(data);
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
		onclick={() => {
			selected = 'store';
		}}
		class={[
			'flex w-full cursor-pointer flex-wrap items-center justify-center rounded-lg py-2  font-medium ',
			selected == 'store' ? 'bg-white text-black ' : 'text-gray-500 '
		]}>store</button
	>
	<button
		onclick={() => {
			selected = 'shipping';
		}}
		class={[
			'flex w-full cursor-pointer flex-wrap items-center justify-center rounded-lg py-2 font-medium',
			selected == 'shipping' ? 'bg-white text-black' : 'text-gray-500'
		]}>shipping</button
	>
	<button
		onclick={() => {
			selected = 'admins';
		}}
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
						bind:value={store_name}
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
						placeholder="fill in your store decription"
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
							bind:value={store_email}
							type="email"
							id="email"
							class="mt-2 h-10 w-full rounded-lg border-2 border-gray-300 px-4"
							placeholder="store name"
						/>
					</div>
					<div class="flex w-1/2 flex-col items-start justify-start">
						<label for="store-name" class="font-medium">contact phone</label>
						<input
							bind:value={store_phone}
							type="number"
							id="phone"
							class="mt-2 h-10 w-full rounded-lg border-2 border-gray-300 px-4"
							placeholder="store name"
						/>
					</div>
				</div>

				<div class="flex w-full flex-col items-start justify-start">
					<label for="store-description" class="font-medium">Store Address </label>

					<textarea
						bind:value={store_address}
						name="store-address"
						id=""
						class="mt-2 h-15 w-full rounded-lg border-2 border-gray-300 px-4"
						style="
                    scroll-behavior: smooth;
                    scrollbar-width: none;"
					>
					</textarea>
				</div>
			</div>
			{#if !(store_desc == store_infos.store_description && store_name == store_infos.store_name && store_email == store_infos.email && store_phone == store_infos.phone && store_address == store_infos.address)}
				<div class="flex w-full items-center justify-end gap-4 px-4 py-2">
					<button
						class="flex cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-base font-medium hover:bg-gray-200 active:scale-95"
						>reset</button
					>
					<button
						onclick={async () => {
							let modified = {};
							if (store_desc !== store_infos.store_description) {
								modified.store_description = store_desc;
							}
							if (store_name !== store_infos.store_name) {
								modified.store_name = store_name;
							}
							if (store_email !== store_infos.email) {
								modified.email = store_email;
							}
							if (store_phone !== store_infos.phone) {
								modified.phone = store_phone;
							}
							if (store_address !== store_infos.address) {
								modified.store_address = store_address;
							}
							const { data, error } = await supabase
								.from('store_info')
								.update(modified)
								.eq('id', '1')
								.select();
						}}
						class="flex cursor-pointer items-center justify-center rounded-lg border-2 bg-black px-4 py-2 text-base font-medium text-white hover:bg-gray-800 active:scale-95"
						>save changes</button
					>
				</div>
			{/if}
		</div>
		<div class="h-fit w-full rounded-lg border-2 border-gray-300 px-4 py-2">
			<p class="text-3xl leading-10 font-medium tracking-wide text-black">Store Appearance</p>
			<div class="flex flex-col items-start justify-start gap-4 py-4">
				<div class="flex w-full flex-col items-start justify-start">
					<label for="" class="font-medium">Store logo</label>
					<div class="flex items-center justify-between gap-4 py-4">
						<img
							src={logo || '/logo_placeholder.svg'}
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
									logofile = file;
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
							src={favicon || '/logo_placeholder.svg'}
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
									faviconfile = file;
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
			{#if !(logo == store_infos.logo_url && favicon == store_infos.favicon_url)}
				<div class="flex w-full items-center justify-end gap-4 px-4 py-2">
					<button
						class="flex cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-base font-medium hover:bg-gray-200 active:scale-95"
						>reset</button
					>
					<button
						class="flex cursor-pointer items-center justify-center rounded-lg border-2 bg-black px-4 py-2 text-base font-medium text-white hover:bg-gray-800 active:scale-95"
						onclick={async () => {
							let modified = {};
							if (logo !== store_infos.logo_url) {
								const { data, error } = await supabase.storage
									.from('store.info')
									.upload('logo.png', logofile, {
										upsert: true
									});
								logo = store_infos.logo_url;
							}
							if (favicon !== store_infos.favicon_url) {
								const { data, error } = await supabase.storage
									.from('store.info')
									.upload('favicon.png', faviconfile, {
										upsert: true
									});
								favicon = store_infos.favicon_url;
							}
						}}>save changes</button
					>
				</div>
			{/if}
		</div>
	{:else if selected == 'shipping'}
		<div
			class="flex h-fit w-full flex-col items-start justify-start gap-4 rounded-lg border-2 border-gray-300 px-4 py-4"
		>
			<div class="flex w-full items-center justify-between gap-4 py-4">
				<p class="text-3xl leading-10 font-medium tracking-wide text-black">shipping companies</p>
				<button
					onclick={() => (shipping_company_form = true)}
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
						{#each shipping_companies as ship_comp}
							{@render shippingcompanyrow({
								name: ship_comp.name,
								default_rate: ship_comp.shipping_rate[0].price,
								estimated_delivery: ship_comp.estimated_time,
								status: ship_comp.status,
								image: ship_comp.image
							})}
						{/each}
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
							{#each shipping_companies as shipping_company}
								<th class="w-35 border-b-2 border-b-gray-300 px-4 py-2">{shipping_company.name}</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each wilayas as wilaya, id}
							<tr class="h-12">
								<td class="w-10 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2"
									>{('' + (id + 1)).padStart(2, '0')}</td
								>
								<td class="w-40 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2"
									>{wilaya.name}</td
								>
								<Cell value={prices.find((p) => p.wilayas.id === id)?.price ?? 'N/A'} />
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{:else if selected == 'admins'}
		<div class="h-fit w-full rounded-lg border-2 border-gray-300 px-4 py-2">
			<div class="flex w-full items-center justify-between gap-4 py-4">
				<p class="text-3xl leading-10 font-medium tracking-wide text-black">Administrators</p>
				<button
					onclick={() => (adminform = true)}
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
					<p class="hidden lg:block">add admin</p></button
				>
			</div>

			<table
				cellspacing="0"
				class="w-full border-separate rounded-t-2xl border-2 border-b-0 border-gray-300 bg-white text-left"
			>
				<thead class="border-separate rounded-t-2xl">
					<tr class="rounded-t-2xl border-b-1 border-b-gray-300 hover:bg-gray-50">
						<th class="w-10 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2">admin</th>
						<th class="w-40 border-b-2 border-b-gray-300 px-4 py-2"></th>
						<th class="w-40 border-b-2 border-b-gray-300 px-4 py-2 text-center">role</th>
						<th class="w-40 border-b-2 border-b-gray-300 px-4 py-2 text-center">status</th>
						<th class="w-20 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2"></th>
					</tr>
				</thead>
				<tbody class="">
					{@render adminrow({
						email: 'example@gmail.com',
						name: 'hello',
						role: 'administrator',
						img: null,
						status: 'active',
						image: ''
					})}
					{@render adminrow({
						email: 'example@gmail.com',
						name: 'hello',
						role: 'manager',
						img: null,
						status: 'inactive'
					})}
					{@render adminrow({
						email: 'example@gmail.com',
						name: 'hello',
						role: 'owner',
						img: null,
						status: 'active'
					})}
					{@render adminrow({
						email: 'example@gmail.com',
						name: 'hello',
						role: 'support',
						img: null,
						status: 'inactive'
					})}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- admin form -->
<div
	onclick={() => {
		adminform = false;
		menuopen = false;
	}}
	class={[
		'fixed inset-0 z-50 flex items-center justify-center bg-black/50',
		adminform ? 'flex' : 'hidden'
	]}
>
	<div
		onclick={(e) => e.stopPropagation()}
		class="relative z-60 max-h-[90vh] w-1/2 min-w-120 overflow-y-auto rounded-xl bg-white p-6 shadow-lg"
	>
		<!-- Header -->
		<div class="mb-6 flex items-center justify-between">
			<h2 class="text-lg font-semibold tracking-wide">Add New Administrator</h2>
			<button
				onclick={() => {
					adminform = false;
					menuopen = false;
				}}
				class="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 active:scale-95"
			>
				✕
			</button>
		</div>

		<form class="flex flex-col">
			<div class=" flex h-full w-full flex-col gap-5">
				<div class="flex w-full flex-col gap-1">
					<label for="" class="font-medium tracking-wide">Full Name</label>
					<input
						bind:value={admin_fullname}
						type="text"
						name=""
						id=""
						placeholder="eg. John Doe"
						class="w-full rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none"
					/>
				</div>
				<div class="flex w-full flex-col gap-1">
					<label for="" class="font-medium tracking-wide">Email Address</label>
					<input
						bind:value={admin_email}
						type="email"
						name=""
						id=""
						placeholder="eg. johndoe@gmail.com"
						class="w-full rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none"
					/>
				</div>
				<div class="flex w-full flex-col gap-1 pb-3">
					<label for="" class="font-medium tracking-wide">Role</label>
					<div class="relative w-full">
						<button
							class="flex w-full items-center justify-between rounded-lg border-2 border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-200"
							onclick={() => {
								menuopen = !menuopen;
							}}
							><span>{dropdownvalue || 'Select a role'}</span>
							<svg
								class="-mr-1 size-5 text-gray-400"
								viewBox="0 0 20 20"
								fill=""
								aria-hidden="true"
								data-slot="icon"
							>
								<path
									fill-rule="evenodd"
									d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
									clip-rule="evenodd"
								/>
							</svg></button
						>
						{#if menuopen}
							<ul
								class="absolute mt-1 w-full rounded-lg border-1 border-gray-300 bg-white p-1 shadow-lg"
							>
								<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
								<li
									onclick={() => {
										menuopen = false;
										dropdownvalue = 'administrator';
									}}
									class="rounded-lg px-5 py-1.5 text-sm hover:bg-gray-100"
								>
									administrator
								</li>
								<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
								<li
									onclick={() => {
										menuopen = false;
										dropdownvalue = 'manager';
									}}
									class="rounded-lg px-5 py-1.5 text-sm hover:bg-gray-100"
								>
									manager
								</li>
								<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
								<li
									onclick={() => {
										menuopen = false;
										dropdownvalue = 'support';
									}}
									class="rounded-lg px-5 py-1.5 text-sm hover:bg-gray-100"
								>
									support
								</li>
							</ul>
						{/if}
					</div>
				</div>

				<div class="flex w-full items-center justify-end gap-4 py-2">
					<button
						onclick={() => {
							dropdownvalue = null;
							admin_email = null;
							admin_fullname = null;
						}}
						class="flex cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-base font-medium hover:bg-gray-200 active:scale-95"
						>cancel</button
					>
					<button
						class="flex cursor-pointer items-center justify-center rounded-lg border-2 bg-black px-4 py-2 text-base font-medium text-white hover:bg-gray-800 active:scale-95"
						>submit</button
					>
				</div>
			</div>
		</form>
	</div>
</div>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- shipping company form -->
<div
	onclick={() => {
		shipping_company_form = false;
	}}
	class={[
		'fixed inset-0 z-50 flex items-center justify-center bg-black/50',
		shipping_company_form ? 'flex' : 'hidden'
	]}
>
	<div
		onclick={(e) => e.stopPropagation()}
		class="relative z-60 max-h-[90vh] w-1/2 min-w-120 overflow-y-auto rounded-xl bg-white p-6 shadow-lg"
	>
		<!-- Header -->
		<div class="mb-6 flex items-center justify-between">
			<h2 class="text-lg font-semibold tracking-wide">Add New shipping company</h2>
			<button
				onclick={() => {
					shipping_company_form = false;
				}}
				class="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 active:scale-95"
			>
				✕
			</button>
		</div>

		<form class="flex flex-col">
			<div class=" flex h-full w-full flex-col gap-5">
				<div class="flex w-full flex-col gap-1">
					<label for="" class="font-medium tracking-wide">company name </label>
					<input
						bind:value={shipping_company_name}
						type="text"
						name=""
						id=""
						placeholder="eg. fast express"
						class="w-full rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none"
					/>
				</div>
				<div class="flex w-full flex-col gap-1">
					<label for="" class="font-medium tracking-wide">default rate</label>
					<input
						bind:value={shipping_company_default_rate}
						type="text"
						name=""
						id=""
						placeholder="eg. 450 dzd"
						class="w-full rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none"
					/>
				</div>

				<div class="flex w-full flex-col gap-1">
					<label for="" class="font-medium tracking-wide">estimated delivery time</label>
					<input
						bind:value={shipping_company_estimated_time}
						type="number"
						name=""
						id=""
						placeholder="eg. 2-4 days"
						class="w-full rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none"
					/>
				</div>
				<div class="flex w-full items-center justify-end gap-4 py-2">
					<button
						onclick={() => {
							shipping_company_default_rate = null;
							shipping_company_estimated_time = null;
							shipping_company_name = null;
						}}
						class="flex cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-base font-medium hover:bg-gray-200 active:scale-95"
						>cancel</button
					>
					<button
						class="flex cursor-pointer items-center justify-center rounded-lg border-2 bg-black px-4 py-2 text-base font-medium text-white hover:bg-gray-800 active:scale-95"
						>add company</button
					>
				</div>
			</div>
		</form>
	</div>
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

{#snippet adminrow(admin)}
	<tr class="hover:bg-gray-50">
		<td class="w-10 border-b-2 border-b-gray-300 px-4 py-2">
			<img
				src={admin.img || '/placeholder.svg'}
				onerror={() => {
					this.src = '/placeholder.svg';
				}}
				alt=""
				class="style-none h-10 w-10 rounded-full border-2 border-gray-300 bg-gray-300 object-cover"
			/></td
		>
		<td class="w-40 border-b-2 border-b-gray-300 px-4 py-2 text-left text-sm">
			<div class="flex flex-col">
				<p class="text-sm font-medium">
					{admin.name}
				</p>
				<p class="text-sm text-gray-500">
					{admin.email}
				</p>
			</div>
		</td>

		<td class="w-40 min-w-25 border-b-2 border-b-gray-300 py-2">
			<p
				class={[
					' mx-auto  w-fit rounded-full  px-2  py-1 text-sm font-medium',
					admin.role == 'owner'
						? 'border-1 border-purple-400 bg-purple-200 font-medium  text-purple-700'
						: '',
					admin.role == 'manager'
						? 'border-1 border-green-400 bg-green-200  font-medium text-green-700'
						: '',
					admin.role == 'administrator'
						? 'border-1 border-blue-400 bg-blue-200 font-medium  text-blue-700'
						: '',
					admin.role == 'support'
						? 'border-1 border-gray-400 bg-gray-200 font-medium  text-gray-700'
						: ''
				]}
			>
				{admin.role}
			</p></td
		>
		<td class="w-40 min-w-25 border-b-2 border-b-gray-300 py-2">
			<p
				class={[
					' mx-auto  w-fit rounded-full  px-2  py-1 text-sm font-medium ',
					admin.status == 'active'
						? 'border-1 border-green-400 bg-green-200 font-medium text-green-700'
						: '',
					admin.status == 'inactive'
						? 'border-1 border-red-300 bg-red-200 font-medium text-red-700'
						: ''
				]}
			>
				{admin.status}
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
