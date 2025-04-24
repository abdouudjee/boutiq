<script>
	import { supabase } from '$lib/index.js';
	import { category_row } from '$lib/tablerow.svelte';
	import Product from '$lib/rows/product.svelte';
	import { onMount } from 'svelte';
	let add_product_form = $state(false);
	$effect(() => {
		add_product_form
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'auto');
	});
	let new_product = $state({
		name: null,
		description: null,
		imgs: [],
		buying_price: null,
		selling_price: null,
		category: null,
		stock: null,
		specific_attributes: []
	});
	// selected tab
	let selected = $state('product');
	let menuopen = $state(false);
	let selected_category = $state('');
	let has_variants = $state(true);
	let new_variant = $state({
		img: null,
		stock: null
	});
	let adding_new_variant = $state(false);
	let variants = $state([]);
	// using the category definition to change the variants inputs
	let def = $state([]);
	// categories list to be fetched from db
	let categories = $state([{}]);
	// products list to be fetched from db
	let products = $state([]);
	onMount(async () => {
		let { data, error: categories_err } = await supabase.from('categories').select('*');
		categories = data;
		let { data: productslist, error: products_err } = await supabase.from('products').select('*');
		products = productslist;
	});
	function empty() {
		adding_new_variant = false;
		new_variant.stock = null;
		new_variant.img = null;
		variants = [];
		new_product.buying_price = null;
		new_product.selling_price = null;
		new_product.name = null;
		new_product.imgs = [];
		new_product.stock = null;
		new_product.category = null;
		new_product.description = null;
	}
	function check_basic_info() {
		return (
			new_product.name &&
			new_product.description &&
			new_product.imgs &&
			new_product.category &&
			new_product.buying_price &&
			new_product.selling_price
		);
	}
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
		{#each products as product}
			<Product
				id={product.id}
				name={product.name}
				inventory={product.initial_stock}
				selling_price={product.selling_price}
				buying_price={product.buying_price}
				category_id={product.category_id}
				description={product.description}
				images={product.img_url}
			/>
		{/each}
	</tbody>
</table>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- new product form -->
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
		<!-- form  -->
		<form class="flex flex-col justify-between py-10" method="POST">
			<!-- selected tab -->
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
			<!-- product tab -->
			{#if selected == 'product'}
				<div class="flex flex-col gap-3 py-3">
					<div class="flex items-center justify-between gap-2">
						<!-- name -->
						<div class="flex w-full flex-col gap-1">
							<label for="" class="font-medium tracking-wide">product name </label>
							<input
								bind:value={new_product.name}
								type="text"
								name=""
								id=""
								placeholder="eg. bmx bike"
								class="w-full rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none"
							/>
						</div>
						<!-- category -->
						<div class="flex w-full items-start justify-between gap-2">
							<div class="flex w-full flex-col gap-1">
								<label for="" class="font-medium tracking-wide">Category</label>
								<button
									type="button"
									class="relative w-full"
									onblur={() => {
										menuopen = false;
									}}
								>
									<div
										class="flex w-full items-center justify-between rounded-lg border-2 border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-200"
										onclick={() => {
											menuopen = !menuopen;
										}}
									>
										<span>{new_product.category || 'Select a category'}</span>
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
										</svg>
									</div>
									{#if menuopen}
										<ul
											class="absolute z-10 mt-1 flex w-full flex-col items-start rounded-lg border-1 border-gray-300 bg-white p-1 shadow-lg"
										>
											{#each categories as category}
												<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
												<li
													onclick={() => {
														menuopen = false;
														new_product.category = category.name;
														def = category.definition;
														// removing all variants in case the category of the product changed
														variants = [];
														// closing the adding new variant subform to reset the inputs
														adding_new_variant = false;
													}}
													class="w-full rounded-lg px-5 py-1.5 text-left text-sm hover:bg-gray-100"
												>
													{category.name}
												</li>
											{/each}
										</ul>
									{/if}
								</button>
							</div>
						</div>
					</div>
					<!-- description -->
					<div class="flex w-full flex-col items-start justify-start">
						<label for="store-description" class="font-medium">product description </label>

						<textarea
							bind:value={new_product.description}
							name="new-product-description"
							id=""
							placeholder="enter category description"
							class="mt-2 h-20 w-full rounded-lg border-2 border-gray-300 text-left ring-0"
							style=" 
						scroll-behavior: smooth;
						scrollbar-width: none;"
						>
						</textarea>
					</div>
					<div class="flex items-center justify-between gap-2">
						<!--price  -->
						<div class="flex w-full flex-col gap-1">
							<label for="" class="font-medium tracking-wide">buying price </label>
							<input
								bind:value={new_product.buying_price}
								onkeypress={(e) => {
									if (e.key == 'e' || e.key == '-' || e.key == '+') e.preventDefault();
								}}
								oninput={(e) => {
									if (e.currentTarget.value < 0 || e.currentTarget.value.includes('e')) {
										e.currentTarget.value = 0;
									}
								}}
								onpaste={(e) => {
									if (
										e.clipboardData.includes('e') ||
										window.clipboardData.get('text').includes('e')
									) {
										e.currentTarget.value = 0;
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
						<div class="flex w-full flex-col gap-1">
							<label for="" class="font-medium tracking-wide">selling price </label>
							<input
								bind:value={new_product.selling_price}
								onkeypress={(e) => {
									if (e.key == 'e' || e.key == '-' || e.key == '+') e.preventDefault();
								}}
								oninput={(e) => {
									if (e.currentTarget.value < 0 || e.currentTarget.value.includes('e')) {
										e.currentTarget.value = 0;
									}
								}}
								onpaste={(e) => {
									if (
										e.clipboardData.includes('e') ||
										window.clipboardData.get('text').includes('e')
									) {
										e.currentTarget.value = 0;
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
					<!-- imgs -->
					<label for="" class="font-medium tracking-wide">product images</label>
					<div class="flex w-full flex-wrap items-center justify-start gap-3">
						{#each new_product.imgs as img, index}
							<div class="relative h-fit w-fit">
								<!-- svelte-ignore a11y_consider_explicit_label -->
								<button
									type="button"
									onclick={() => {
										new_product.imgs = new_product.imgs.filter((_, i) => i !== index);
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
									src={URL.createObjectURL(img) ?? '/placeholder.svg'}
									alt=""
									class=" h-23 w-23 rounded-md border-1 border-gray-300 object-cover"
								/>
							</div>
						{/each}
						{#if new_product.imgs.length < 6}
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
												new_product.imgs.push(e.target.files[0]);
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
						{#if new_product.category}
							<div class="grid h-fit w-full grid-cols-2 gap-2">
								<!-- product stock -->
								<div class="flex w-full flex-col gap-1">
									<label for="" class="font-medium tracking-wide">stock </label>
									<input
										bind:value={new_product.stock}
										onkeypress={(e) => {
											if (e.key == 'e' || e.key == '-' || e.key == '+') e.preventDefault();
										}}
										oninput={(e) => {
											if (e.currentTarget.value < 0 || e.currentTarget.value.includes('e')) {
												e.currentTarget.value = 0;
											}
										}}
										onpaste={(e) => {
											if (
												e.clipboardData.includes('e') ||
												window.clipboardData.get('text').includes('e')
											) {
												e.currentTarget.value = 0;
												e.preventDefault();
											}
										}}
										type="number"
										name=""
										id=""
										placeholder="eg. 85 piece"
										min="0"
										class="w-full [appearance:textfield] rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
									/>
								</div>
								<!-- the rest of category fields here -->
								{#each def as inputfield}
									{#if inputfield.type == 'yes/no'}
										<label class="inline-flex cursor-pointer items-center">
											<input type="checkbox" class="peer sr-only" name={inputfield.name} />
											<div
												class="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-black peer-focus:ring-4 peer-focus:ring-gray-600 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"
											></div>
											<span class="ms-3 text-sm font-medium text-gray-900">{inputfield.name}</span>
										</label>
									{:else if inputfield.type == 'number'}
										<div class=" flex w-full flex-col gap-1">
											<label for="" class="font-medium tracking-wide">{inputfield.name} </label>
											<input
												onkeypress={(e) => {
													if (e.key == 'e' || e.key == '-' || e.key == '+') e.preventDefault();
												}}
												oninput={(e) => {
													if (e.currentTarget.value < 0 || e.currentTarget.value.includes('e')) {
														e.currentTarget.value = 0;
													}
												}}
												onpaste={(e) => {
													if (
														e.clipboardData.includes('e') ||
														window.clipboardData.get('text').includes('e')
													) {
														e.currentTarget.value = 0;
														e.preventDefault();
													}
												}}
												type="number"
												name={inputfield.name}
												id=""
												placeholder={inputfield.default}
												min="0"
												class="w-full [appearance:textfield] rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
											/>
										</div>
									{:else if inputfield.type == 'date'}
										<div class=" flex w-full flex-col gap-1">
											<label for="" class="font-medium tracking-wide">{inputfield.name} </label>
											<input
												type="date"
												name={inputfield.name}
												id=""
												placeholder={inputfield.default}
												min="0"
												class="w-full rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
											/>
										</div>
									{:else}
										<div class="flex w-full flex-col gap-1">
											<label for="" class="font-medium tracking-wide">{inputfield.name} </label>
											<input
												type="text"
												name={inputfield.name}
												id=""
												placeholder={inputfield.default}
												class="w-full rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none"
											/>
										</div>
									{/if}
								{/each}
							</div>
						{:else}
							<p class="font-medium text-gray-500">make sure to choose a category</p>
						{/if}
					{/if}
					<!-- add and cancel product buttons -->
					<!-- make sure to disable the button if there is no variants ... -->
					<div class="flex w-full items-center justify-end gap-4 px-2 py-2">
						<button
							onclick={() => {
								empty();
							}}
							type="button"
							class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-base font-medium hover:bg-gray-200 active:scale-95"
							>cancel</button
						>
						<!-- change into submit later !!! -->
						<button
							disabled={!new_product}
							onclick={async () => {
								if (!has_variants) {
									for (let i = 0; i < def.length; i++) {
										const field = def[i];
										const input = document.getElementsByName(field.name)[0];
										if (!input) continue;
										new_product.specific_attributes[field.name] =
											field.type === 'yes/no' ? input.checked : input.value;
									}
								}
								// Upload images and replace local blobs with URLs
								for (let i = 0; i < new_product.imgs.length; i++) {
									const file = new_product.imgs[i];
									const fileName = `${new_product.name.trim().replace(/"/g, '').replace(/\s+/g, '-')}-${i}.png`;

									const { data: upload, error: uploadError } = await supabase.storage
										.from('products-images')
										.upload(fileName, file);

									if (uploadError) {
										alert(uploadError.message);
										console.error(uploadError);
										return;
									}

									const { data: urlData, error: urlError } = supabase.storage
										.from('products-images') // ✅ must be same bucket name
										.getPublicUrl(upload.path);

									if (urlError) {
										console.error(urlError);
										return;
									}

									// Replace blob with public URL
									new_product.imgs[i] = urlData.publicUrl;
								}
								const found = categories.find((item) => item.name === new_product.category);

								// inserting the product
								const { data, error } = await supabase
									.from('products')
									.insert([
										{
											name: new_product.name,
											description: new_product.description,
											buying_price: new_product.buying_price,
											selling_price: new_product.selling_price,
											specific_attributes: new_product.specific_attributes,
											img_url: new_product.imgs,
											category_id: found.id
										}
									])
									.select();
								console.log(error);
								empty(); // Reset form or whatever this does
							}}
							type="button"
							class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 bg-black px-4 py-2 text-base font-medium text-white hover:bg-gray-800 active:scale-95"
							>add product
						</button>
					</div>
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
					{:else if !check_basic_info()}
						<div class="flex h-40 w-full flex-col items-center justify-center">
							<p class=" h-fit text-sm font-medium text-gray-400">
								make sure to fill all the basic info first
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
										{#each def as th}
											<th class="w-25 p-2 text-left">{th.name}</th>
										{/each}
									</tr>
								</thead>
							{/if}
							<tbody>
								{#each variants as variant, i}
									<tr class="w-fit text-left hover:bg-gray-50">
										<td class="w-15 p-2 text-center">{i + 1}</td>
										<td class="w-15 p-2 text-left"
											><img
												src={variant.img && variant.img[0]
													? URL.createObjectURL(variant.img[0])
													: (null ?? '/placeholder.svg')}
												onerror={() => {
													this.src = '/placeholder.svg';
												}}
												alt=""
												class="style-none h-10 w-10 rounded-lg border-2 border-gray-300 bg-white object-cover"
											/></td
										>
										<td class="w-15 p-2 text-left">{variant.stock ?? '0'}</td>
										{#each def as td}
											<td class="w-15 p-2 text-left">{variant[td.name] ?? '-'}</td>
										{/each}
									</tr>
								{:else}
									<tr class="h-30">
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
								<!-- the input fields -->
								<div class="grid w-full grid-cols-2 gap-2">
									<!-- new variant stock -->
									<div class=" w-full">
										<label for="" class="font-medium tracking-wide">variant stock </label>
										<input
											bind:value={new_variant.stock}
											onkeypress={(e) => {
												if (e.key == 'e' || e.key == '-' || e.key == '+') e.preventDefault();
											}}
											oninput={(e) => {
												if (e.currentTarget.value < 0 || e.currentTarget.value.includes('e')) {
													e.currentTarget.value = 0;
												}
											}}
											onpaste={(e) => {
												if (
													e.clipboardData.includes('e') ||
													window.clipboardData.get('text').includes('e')
												) {
													e.currentTarget.value = 0;
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
									<!-- the rest of category feilds -->
									{#each def as inputfield}
										{#if inputfield.type == 'yes/no'}
											<label class="inline-flex cursor-pointer items-center">
												<input type="checkbox" class="peer sr-only" name={inputfield.name} />
												<div
													class="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-black peer-focus:ring-4 peer-focus:ring-gray-600 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"
												></div>
												<span class="ms-3 text-sm font-medium text-gray-900">{inputfield.name}</span
												>
											</label>
										{:else if inputfield.type == 'number'}
											<div class=" w-full">
												<label for="" class="font-medium tracking-wide">{inputfield.name} </label>
												<input
													onkeypress={(e) => {
														if (e.key == 'e' || e.key == '-' || e.key == '+') e.preventDefault();
													}}
													oninput={(e) => {
														if (e.currentTarget.value < 0 || e.currentTarget.value.includes('e')) {
															e.currentTarget.value = 0;
														}
													}}
													onpaste={(e) => {
														if (
															e.clipboardData.includes('e') ||
															window.clipboardData.get('text').includes('e')
														) {
															e.currentTarget.value = 0;
															e.preventDefault();
														}
													}}
													type="number"
													name={inputfield.name}
													id=""
													placeholder="eg. 58 "
													min="0"
													class="w-full [appearance:textfield] rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
												/>
											</div>
										{:else if inputfield.type == 'date'}
											<div class=" w-full">
												<label for="" class="font-medium tracking-wide">{inputfield.name} </label>
												<input
													type="date"
													name={inputfield.name}
													id=""
													placeholder="eg. 58 piece"
													min="0"
													class="w-full rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
												/>
											</div>
										{:else}
											<div class="w-full">
												<label for="" class="font-medium tracking-wide">{inputfield.name} </label>
												<input
													type="text"
													name={inputfield.name}
													id=""
													placeholder="eg. red"
													class="w-full rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none"
												/>
											</div>
										{/if}
									{/each}
								</div>
								<!-- variant img -->
								<div class="h-fit w-fit">
									{#if new_variant.img && new_variant.img[0]}
										<div class="relative h-fit w-fit">
											<img
												src={URL.createObjectURL(new_variant.img[0])}
												alt=""
												class=" h-23 w-23 rounded-2xl border-1 border-gray-300 object-cover"
											/>
											<!-- svelte-ignore a11y_consider_explicit_label -->
											<button
												type="button"
												onclick={() => {
													new_variant.img = null;
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
												bind:files={new_variant.img}
												class="border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring hidden h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
												id="category-image-upload"
												accept="image/*"
												type="file"
											/>
										</label>
									{/if}
								</div>
							</div>
							<!-- cancel and add variant buttons -->
							<div class="flex w-full items-center justify-end gap-4 px-2 py-2">
								<button
									onclick={() => {
										adding_new_variant = false;
										new_variant.stock = null;
										new_variant.img = null;
									}}
									type="button"
									class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-base font-medium hover:bg-gray-200 active:scale-95"
									>cancel</button
								>
								<!-- change into submit later !!! -->
								<button
									onclick={() => {
										for (let i = 0; i < def.length; i++) {
											if (def[i].type === 'yes/no') {
												let x = document.getElementsByName(def[i].name)[0];
												new_variant[def[i].name] = x.checked;
											} else {
												let x = document.getElementsByName(def[i].name)[0];
												new_variant[def[i].name] = x.value;
											}
										}

										variants.push({ ...new_variant });
										adding_new_variant = false;
										new_variant.stock = null;
										new_variant.img = null;
										console.log(variants);
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
