<script>
	import { product_row } from '$lib/tablerow.svelte';
	let add_product_form = $state(true);
	$effect(() => {
		add_product_form
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'auto');
	});
	let product_name = $state('');
	let product_description = $state('');
	let product_imgs = $state([]);
	let selected = $state('variants');
	let price = $state();
	$effect(() => {
		price = price + '';
		price.replace(/[eE]/g, '');
	});
	let menuopen = $state(false);
	let dropdownvalue = $state('');
	let has_variants = $state(true);
	let variant_img = $state(null);
	let adding_new_variant = $state(false);
	let varaint_stock = $state(null);
	let variants = $state([]);
</script>

<div
	class="mb-10 flex h-24 w-full items-center justify-between gap-2 border-b-2 border-b-gray-300 bg-white py-4"
>
	<div>
		<h1 class="text-2xl font-bold tracking-wider text-black">Products</h1>
		<p class="text-gray-400">Manage your product inventory, categories, and pricing.</p>
	</div>
	<button
		onclick={() => (add_product_form = true)}
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
		<p class="hidden lg:block">add a product</p></button
	>
</div>
<table
	cellspacing="0"
	class="w-full border-separate rounded-t-2xl border-2 border-b-0 border-gray-300 bg-white text-left"
>
	<thead class="border-separate rounded-t-2xl">
		<tr class="rounded-t-2xl border-b-1 border-b-gray-300">
			<th class="w-10 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2">image</th>
			<th class="border-b-2 border-b-gray-300 px-4 py-2">Product </th>
			<th class="border-b-2 border-b-gray-300 px-4 py-2">Price</th>
			<th class="w-20 border-b-2 border-b-gray-300 px-4 py-2">inventory</th>
			<th class="w-40 border-b-2 border-b-gray-300 px-4 py-2">Category</th>
			<th class="w-30 border-b-2 border-b-gray-300 px-4 py-2 text-center">status</th>
			<th class="w-20 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2"></th>
		</tr>
	</thead>
	<tbody class="">
		{@render product_row({
			name: 'air frier',
			price: 20000,
			inventory: 10,
			category: 'elctronics',
			status: 'in stock'
		})}
		{@render product_row({
			name: 'fridge',
			price: 5475,
			inventory: 47,
			category: 'electronics',
			status: 'low stock'
		})}
		{@render product_row({
			name: 'bike',
			price: 33333,
			inventory: 0,
			category: 'sports',
			status: 'out of stock'
		})}
		{@render product_row({
			name: 'coffee machine',
			price: 333,
			inventory: 25,
			category: 'kitchen',
			status: 'in stock'
		})}
		{@render product_row({
			name: 'ice cream machine',
			price: 8399,
			inventory: 47,
			category: 'kitchen',
			status: 'low stock'
		})}
		{@render product_row({
			name: 'meow',
			price: 400,
			inventory: 0,
			category: 'kitchen',
			status: 'out of stock'
		})}{@render product_row({
			name: 'air frier',
			price: 20000,
			inventory: 10,
			category: 'elctronics',
			status: 'in stock'
		})}
		{@render product_row({
			name: 'fridge',
			price: 5475,
			inventory: 47,
			category: 'electronics',
			status: 'low stock'
		})}
		{@render product_row({
			name: 'bike',
			price: 33333,
			inventory: 0,
			category: 'sports',
			status: 'out of stock'
		})}
		{@render product_row({
			name: 'coffee machine',
			price: 333,
			inventory: 25,
			category: 'kitchen',
			status: 'in stock'
		})}
		{@render product_row({
			name: 'ice cream machine',
			price: 8399,
			inventory: 47,
			category: 'kitchen',
			status: 'low stock'
		})}
		{@render product_row({
			name: 'meow',
			price: 400,
			inventory: 0,
			category: 'kitchen',
			status: 'out of stock'
		})}
	</tbody>
</table>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- new category form -->
<div
	onclick={() => {
		add_product_form = false;
	}}
	class={[
		'fixed inset-0 z-50 flex items-center justify-center bg-black/50',
		add_product_form ? 'flex' : 'hidden'
	]}
>
	<div
		onclick={(e) => e.stopPropagation()}
		class="relative z-60 h-150 w-200 min-w-130 overflow-y-auto rounded-xl bg-white p-6 shadow-lg"
	>
		<!-- Header -->
		<div class=" flex items-start justify-between">
			<div>
				<h2 class="text-lg font-semibold tracking-wide">Add New product</h2>
				<p class="text-sm text-gray-500">
					Fill in the details to add a new product to your inventory.
				</p>
			</div>
			<button
				onclick={() => {
					add_product_form = false;
				}}
				class="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 active:scale-95"
			>
				✕
			</button>
		</div>
		<form class="flex flex-col justify-between py-10" method="POST">
			<div
				class="mx-auto flex h-fit w-fit items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-1.5"
			>
				<button
					type="button"
					onclick={() => {
						selected = 'product';
					}}
					class={[
						'flex w-full cursor-pointer flex-wrap items-center justify-center rounded-sm px-20 py-2  font-medium ',
						selected == 'product' ? 'bg-white text-black ' : 'text-gray-500 '
					]}>product</button
				>
				<button
					type="button"
					onclick={() => {
						selected = 'variants';
					}}
					class={[
						'flex w-full cursor-pointer flex-wrap items-center justify-center rounded-sm px-20 py-2  font-medium ',
						selected == 'variants' ? 'bg-white text-black ' : 'text-gray-500 '
					]}>variants</button
				>
			</div>
			{#if selected == 'product'}
				<div class="flex flex-col gap-3 py-3">
					<div class="flex items-center justify-between gap-2">
						<div class="flex w-full flex-col gap-1">
							<label for="" class="font-medium tracking-wide">product name </label>
							<input
								type="text"
								name=""
								id=""
								placeholder="eg. bmx bike"
								class="w-full rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none"
							/>
						</div>
						<div class="flex w-full flex-col gap-1">
							<label for="" class="font-medium tracking-wide">price </label>
							<input
								bind:value={price}
								onkeypress={(e) => {
									if (e.key == 'e' || e.key == '-' || e.key == '+') e.preventDefault();
								}}
								oninput={() => {
									if (price < 0 || price.includes('e')) {
										price = 0;
									}
								}}
								onpaste={(e) => {
									if (
										e.clipboardData.includes('e') ||
										window.clipboardData.get('text').includes('e')
									) {
										price = 0;
										e.preventDefault();
									}
								}}
								type="number"
								name=""
								id=""
								placeholder="eg. 999 dzd"
								min="0"
								class="w-full [appearance:textfield] rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
							/>
						</div>
					</div>
					<div class="flex w-full flex-col items-start justify-start">
						<label for="store-description" class="font-medium">product description </label>

						<textarea
							name="store-description"
							id=""
							placeholder="enter category description"
							class="mt-2 h-20 w-full rounded-lg border-2 border-gray-300 text-left ring-0"
							style=" 
						scroll-behavior: smooth;
						scrollbar-width: none;"
						>
						</textarea>
					</div>
					<div class="flex w-full items-center justify-between gap-2">
						<div class="flex w-full flex-col gap-1 pb-3">
							<label for="" class="font-medium tracking-wide">Category</label>
							<div class="relative mb-2 w-full">
								<button
									type="button"
									class="flex w-full items-center justify-between rounded-lg border-2 border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-200"
									onclick={() => {
										menuopen = !menuopen;
									}}
									><span>{dropdownvalue || 'Select a category'}</span>
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
										class="absolute z-10 mt-1 mb-2 w-full rounded-lg border-1 border-gray-300 bg-white p-1 shadow-lg"
									>
										<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
										<li
											onclick={() => {
												menuopen = false;
												dropdownvalue = 'electronics';
											}}
											class="rounded-lg px-5 py-1.5 text-sm hover:bg-gray-100"
										>
											electronics
										</li>
										<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
										<li
											onclick={() => {
												menuopen = false;
												dropdownvalue = 'electronics';
											}}
											class="rounded-lg px-5 py-1.5 text-sm hover:bg-gray-100"
										>
											electronics
										</li>
										<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
										<li
											onclick={() => {
												menuopen = false;
												dropdownvalue = 'electronics';
											}}
											class="rounded-lg px-5 py-1.5 text-sm hover:bg-gray-100"
										>
											electronics
										</li>
										<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
										<li
											onclick={() => {
												menuopen = false;
												dropdownvalue = 'electronics';
											}}
											class="rounded-lg px-5 py-1.5 text-sm hover:bg-gray-100"
										>
											electronics
										</li>
										<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
										<li
											onclick={() => {
												menuopen = false;
												dropdownvalue = 'electronics';
											}}
											class="rounded-lg px-5 py-1.5 text-sm hover:bg-gray-100"
										>
											electronics
										</li>
										<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
										<li
											onclick={() => {
												menuopen = false;
												dropdownvalue = 'bikes';
											}}
											class="rounded-lg px-5 py-1.5 text-sm hover:bg-gray-100"
										>
											bikes
										</li>
										<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
										<li
											onclick={() => {
												menuopen = false;
												dropdownvalue = 'cars';
											}}
											class="rounded-lg px-5 py-1.5 text-sm hover:bg-gray-100"
										>
											cars
										</li>
									</ul>
								{/if}
							</div>
						</div>
					</div>
					<label for="" class="font-medium tracking-wide">product images</label>
					<div class="flex w-full flex-wrap items-center justify-start gap-3">
						{#each product_imgs as img, index}
							<div class="relative h-fit w-fit">
								<!-- svelte-ignore a11y_consider_explicit_label -->
								<button
									type="button"
									onclick={() => {
										product_imgs = product_imgs.filter((_, i) => i !== index);
									}}
									class="absolute -top-2 -right-2 h-6 w-6 cursor-pointer rounded-full bg-white p-1 hover:bg-gray-200"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width=""
										height=""
										viewBox="0 0 24 24"
										fill="none"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="stroke-gray-500"
										><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path
											d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
										/></svg
									>
								</button>
								<img
									src={URL.createObjectURL(img)}
									alt=""
									class=" h-23 w-23 rounded-md border-1 border-gray-300 object-cover"
								/>
							</div>
						{/each}
						{#if product_imgs.length < 6}
							<div
								class="flex h-23 w-23 items-center justify-center rounded-md border border-dashed border-gray-300"
							>
								<label
									class="flex h-full w-full cursor-pointer flex-col items-center justify-center text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									for="category-image-upload"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="lucide lucide-image-plus text-muted-foreground h-6 w-6 stroke-gray-500"
									>
										<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
										<line x1="16" x2="22" y1="5" y2="5"></line>
										<line x1="19" x2="19" y1="2" y2="8"></line>
										<circle cx="9" cy="9" r="2"></circle>
										<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
									</svg>
									<span class="text-muted-foreground mt-1 text-xs text-gray-500">Add Image</span>
									<input
										onchange={(e) => {
											if (e.target.files[0]) {
												product_imgs.push(e.target.files[0]);
												e.target.value = '';
											}
										}}
										class="border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring hidden h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
										id="category-image-upload"
										accept="image/*"
										type="file"
									/>
								</label>
							</div>
						{/if}
					</div>

					<label class="inline-flex cursor-pointer items-center">
						<input type="checkbox" value="" class="peer sr-only" bind:checked={has_variants} />
						<div
							class="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-black peer-focus:ring-4 peer-focus:ring-gray-600 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"
						></div>
						<span class="ms-3 text-sm font-medium text-gray-900"
							>This product has multiple variants</span
						>
					</label>
					{#if !has_variants}
						<div class="flex items-center justify-between gap-2">
							<div class="flex w-full flex-col gap-1">
								<label for="" class="font-medium tracking-wide">color </label>
								<input
									type="text"
									name=""
									id=""
									placeholder="eg. red"
									class="w-full rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none"
								/>
							</div>
							<div class="flex w-full flex-col gap-1">
								<label for="" class="font-medium tracking-wide">stock </label>
								<input
									bind:value={price}
									onkeypress={(e) => {
										if (e.key == 'e' || e.key == '-' || e.key == '+') e.preventDefault();
									}}
									oninput={() => {
										if (price < 0 || price.includes('e')) {
											price = 0;
										}
									}}
									onpaste={(e) => {
										if (
											e.clipboardData.includes('e') ||
											window.clipboardData.get('text').includes('e')
										) {
											price = 0;
											e.preventDefault();
										}
									}}
									type="number"
									name=""
									id=""
									placeholder="eg. 58 piece"
									min="0"
									class="w-full [appearance:textfield] rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
								/>
							</div>
						</div>

						<div class="flex items-center justify-between gap-2">
							<div class="flex w-full flex-col gap-1">
								<label for="" class="font-medium tracking-wide">material </label>
								<input
									type="text"
									name=""
									id=""
									placeholder="eg. leather"
									class="w-full rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none"
								/>
							</div>
							<div class="flex w-full flex-col gap-1">
								<label for="" class="font-medium tracking-wide">size </label>
								<input
									bind:value={price}
									onkeypress={(e) => {
										if (e.key == 'e' || e.key == '-' || e.key == '+') e.preventDefault();
									}}
									oninput={() => {
										if (price < 0 || price.includes('e')) {
											price = 0;
										}
									}}
									onpaste={(e) => {
										if (
											e.clipboardData.includes('e') ||
											window.clipboardData.get('text').includes('e')
										) {
											price = 0;
											e.preventDefault();
										}
									}}
									type="number"
									name=""
									id=""
									placeholder="eg. 37"
									min="0"
									class="w-full [appearance:textfield] rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
								/>
							</div>
						</div>
					{/if}
				</div>
				<!-- variants tab  -->
			{:else if selected == 'variants'}
				<div
					class="mt-3 flex h-fit w-full flex-col gap-3 rounded-lg border-2 border-gray-300 bg-white px-2 py-3"
				>
					{#if !has_variants}
						<div class="flex h-40 w-full flex-col items-center justify-center">
							<p class=" h-fit text-sm font-medium text-gray-400">
								toggle the switch on to be able to add variants
							</p>
						</div>
					{:else}
						<table class="mx-auto w-fit">
							{#if variants.length}
								<thead>
									<tr class="w-full hover:bg-gray-50">
										<th class="w-25 p-2 text-left">variant</th>
										<th class="w-25 p-2 text-left">image</th>
										<th class="w-25 p-2 text-left">stock</th>
									</tr>
								</thead>
							{/if}
							<tbody>
								{#each variants as variant, i}
									<tr class="w-fit text-left hover:bg-gray-50">
										<td class="w-15 p-2 text-center">{i + 1}</td>
										<td class="w-15 p-2 text-left"
											><img
												src={variant_img && variant.img[0]
													? URL.createObjectURL(variant_img[0])
													: (null ?? '/placeholder.svg')}
												onerror={() => {
													this.src = '/placeholder.svg';
												}}
												alt=""
												class="style-none h-10 w-10 rounded-lg border-2 border-gray-300 bg-white object-cover"
											/></td
										>
										<td class="w-15 p-2 text-left">{variant.stock ?? '0'}</td>
									</tr>
								{:else}
									<tr>
										<td class="text-center" colspan="100%">
											<p class="text-sm font-medium text-gray-400">No variants added yet</p>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
						{#if !adding_new_variant}
							<button
								onclick={() => {
									adding_new_variant = !adding_new_variant;
								}}
								type="button"
								class="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-300 bg-white py-2 font-semibold hover:bg-gray-100"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 20"
									fill="none"
									stroke=""
									stroke-width="3"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="lucide lucide-plus h-5 w-5 stroke-black"
									><path d="M5 12h14"></path><path d="M12 5v14"></path></svg
								>
								add a variant</button
							>
						{:else}
							<div
								class="flex w-full flex-col items-start gap-3 rounded-2xl border-1 border-gray-200 p-2"
							>
								<div class="flex w-full items-center justify-between gap-2">
									<div class="flex w-full flex-col gap-1">
										<label for="" class="font-medium tracking-wide">color </label>
										<input
											type="text"
											name=""
											id=""
											placeholder="eg. red"
											class="w-full rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none"
										/>
									</div>
									<div class="flex w-full flex-col gap-1">
										<label for="" class="font-medium tracking-wide">stock </label>
										<input
											bind:value={varaint_stock}
											onkeypress={(e) => {
												if (e.key == 'e' || e.key == '-' || e.key == '+') e.preventDefault();
											}}
											oninput={() => {
												if (varaint_stock < 0 || varaint_stock.includes('e')) {
													varaint_stock = 0;
												}
											}}
											onpaste={(e) => {
												if (
													e.clipboardData.includes('e') ||
													window.clipboardData.get('text').includes('e')
												) {
													varaint_stock = 0;
													e.preventDefault();
												}
											}}
											type="number"
											name=""
											id=""
											placeholder="eg. 58 piece"
											min="0"
											class="w-full [appearance:textfield] rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
										/>
									</div>
								</div>
								<div class="h-fit w-fit">
									{#if variant_img && variant_img[0]}
										<div class="relative h-fit w-fit">
											<img
												src={URL.createObjectURL(variant_img[0])}
												alt=""
												class=" h-23 w-23 rounded-2xl border-1 border-gray-300 object-cover"
											/>
											<!-- svelte-ignore a11y_consider_explicit_label -->
											<button
												type="button"
												onclick={() => {
													variant_img = null;
												}}
												class="absolute -top-2 -right-2 h-6 w-6 cursor-pointer rounded-full bg-white p-1 hover:bg-gray-200"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width=""
													height=""
													viewBox="0 0 24 24"
													fill="none"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="stroke-gray-500"
													><path d="M3 6h18" /><path
														d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
													/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg
												>
											</button>
										</div>
									{:else}
										<label
											class="flex h-23 w-23 cursor-pointer flex-col items-center justify-center rounded-2xl border-1 border-dashed border-gray-300 text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											for="category-image-upload"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="lucide lucide-image-plus text-muted-foreground h-6 w-6 stroke-gray-500"
											>
												<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
												<line x1="16" x2="22" y1="5" y2="5"></line>
												<line x1="19" x2="19" y1="2" y2="8"></line>
												<circle cx="9" cy="9" r="2"></circle>
												<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
											</svg>
											<span class="text-muted-foreground mt-1 text-xs text-gray-500">Add Image</span
											>
											<input
												bind:files={variant_img}
												class="border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring hidden h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
												id="category-image-upload"
												accept="image/*"
												type="file"
											/>
										</label>
									{/if}
								</div>
							</div>

							<div class="flex w-full items-center justify-end gap-4 px-2 py-2">
								<button
									onclick={() => {
										adding_new_variant = false;
										varaint_stock = null;
										variant_img = null;
									}}
									type="button"
									class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-base font-medium hover:bg-gray-200 active:scale-95"
									>cancel</button
								>
								<!-- change into submit later !!! -->
								<button
									onclick={() => {
										variants.push({
											img: variant_img || null,
											stock: varaint_stock || null
										});
										adding_new_variant = false;
										varaint_stock = null;
										variant_img = null;
									}}
									type="button"
									class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 bg-black px-4 py-2 text-base font-medium text-white hover:bg-gray-800 active:scale-95"
									>add variant
								</button>
							</div>
						{/if}
					{/if}
				</div>
			{/if}
		</form>
	</div>
</div>
