<script>
	import { supabase } from '$lib/index';
	import { onMount, tick } from 'svelte';

	let { name, selling_price, buying_price, inventory, category_id, description, id, images } =
		$props();
	let category = $state();
	let mounted = $state();
	let urls = $state(images);
	// delete vars
	let open = $state(false);
	let dropdown = $state();
	let confirm_delete = $state(false);
	let delete_confirmation_input = $state('');
	$effect(() => {
		window.scrollTo({ top: 0, behavior: 'instant' });
		confirm_delete || edit_page
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'auto');
	});
	let categories = $state([]);
	let def = $state([]);
	$effect(async () => {
		let { data: cat, error } = await supabase.from('categories').select('*').eq('id', category_id);
		let { data, error: x } = await supabase.from('categories').select('*');
		categories = data;
		category = cat[0].name;
		def = cat[0].definition;
		edited_product.category = category;
		let { data: product_variants, error: y } = await supabase
			.from('product_variants')
			.select('*')
			.eq('product_id', id);
		variants = product_variants;
	});
	onMount(() => {
		mounted = true;
	});
	// edit vars
	let edit_page = $state(false);
	let tab = $state('basic info');
	let menuopen = $state(false);
	let edited_product = $state({
		name,
		buying_price,
		selling_price,
		inventory,
		description,
		// svelte-ignore state_referenced_locally
		category
	});
	// variant vars
	let variants = $state([]);
	let adding_new_variant = $state(false);
	let new_variant = $state({
		img: null,
		stock: null,
		specific_attributes: {}
	});
	// delete variant vars
	let confirm_delete_variant = $state(false);
	let delete_confirmation_input_variant = $state('');
	let variant_id_to_delete = $state();
</script>

{#if mounted}
	<tr>
		<td class="border-b-2 border-b-gray-300 px-4 py-2">
			<img
				id={name}
				src={urls.length ? urls[0] : '/placeholder.svg'}
				onerror={() => {
					document.getElementById(name).src = '/placeholder.svg';
				}}
				alt=""
				class="productimg style-none h-10 w-10 rounded-lg border-2 border-gray-300 bg-gray-300 object-cover"
			/></td
		>
		<td class="border-b-2 border-b-gray-300 px-4 py-2 text-left text-sm">{name}</td>
		<td class="w-30 border-b-2 border-b-gray-300 px-4 py-2">{selling_price} Dzd</td>
		<td class="w-20 border-b-2 border-b-gray-300 px-4 py-2">{inventory}</td>
		<td class="w-40 border-b-2 border-b-gray-300 px-4 py-2 text-sm text-wrap break-words"
			>{category}</td
		>
		<td class="w-30 min-w-25 border-b-2 border-b-gray-300 py-2">
			<p
				class={[
					' mx-auto  w-fit rounded-full  border-1 px-2  py-1 text-sm font-medium',
					inventory === 0
						? ' border-red-300 bg-red-200   text-red-700'
						: inventory < 15
							? ' border-yellow-300 bg-yellow-200   text-yellow-700'
							: ' border-green-300  bg-green-200  text-green-700'
				]}
			>
				{inventory === 0 ? 'out of stock' : inventory < 15 ? 'low stock' : 'in stock'}
			</p>
		</td>
		<td class="w-20 border-b-2 border-b-gray-300 px-4 py-2 text-center">
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<div class="hs-dropdown relative inline-flex">
				<button
					onclick={async () => {
						if (!open) {
							open = true;
							await tick();
							dropdown?.focus();
						}
					}}
					type="button"
					class="hs-dropdown-toggle flex size-9 cursor-pointer items-center justify-center rounded-lg bg-white p-1 text-sm font-semibold hover:bg-gray-200 active:scale-95"
					aria-haspopup="menu"
					aria-expanded="false"
					aria-label="Dropdown"
				>
					<svg
						class="size-4 flex-none text-gray-600 dark:text-neutral-500"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle
							cx="12"
							cy="19"
							r="1"
						/></svg
					>
				</button>
				{#if open}
					<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						tabindex="0"
						class="absolute -right-5 z-10 w-35 rounded-xl border-2 border-gray-200 bg-white px-1 py-2"
						bind:this={dropdown}
						onblur={() => {
							setTimeout(() => (open = false), 100);
						}}
						onmousedown={(e) => {
							e.stopPropagation();
							dropdown.focus();
						}}
					>
						<button
							class="w-full cursor-pointer py-2 text-sm font-medium hover:bg-gray-200"
							onmousedown={(e) => {
								e.stopImmediatePropagation();
								edit_page = true;
							}}
							>edit product
						</button>
						<button
							class="w-full cursor-pointer py-2 text-sm font-medium text-red-500 hover:bg-gray-200"
							onmousedown={(e) => {
								e.stopImmediatePropagation();
								confirm_delete = true;
							}}>delete product</button
						>
					</div>
				{/if}
			</div>
		</td>
	</tr>
{/if}
<!-- delete product ui -->
{#if confirm_delete}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="fixed inset-0 z-20 flex h-screen w-screen items-center justify-center bg-black/50"
		onclick={(confirm_delete = false)}
	>
		<div
			class="flex h-85 w-140 flex-col items-center justify-center gap-3 rounded-2xl bg-white px-10 py-5"
			onclick={(e) => {
				e.stopImmediatePropagation();
			}}
		>
			<div class="flex h-10 w-full items-center justify-start gap-3.5">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#fb2c36"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
					></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg
				>
				<p class="w-full text-xl font-bold text-red-500">Delete product</p>
			</div>
			<!-- warning -->
			<div class="flex flex-col items-center justify-center gap-1 rounded-2xl">
				<p class="text-justify text-base tracking-tight text-gray-500">
					By confirming, you agree to permanently delete <span
						class="text-lg font-medium text-black/70">{name}</span
					>, its variants, and all associated data, including revenue analytics and sales history.
					<span class=""> This action is irreversible and cannot be undone. </span>
				</p>
			</div>
			<div class="flex w-full flex-col gap-1">
				<label for="" class="font-medium tracking-wide text-red-500">Confirmation</label>
				<input
					bind:value={delete_confirmation_input}
					type="text"
					name=""
					id=""
					placeholder={'Type "delete this product" to confirm'}
					class="w-full rounded-md border-2 border-red-500 px-2 py-1.5 ring-red-600 placeholder:text-gray-500 focus:border-red-400 focus:ring-2 focus:outline-none"
				/>
			</div>

			<!-- cancel and delete buttons -->
			<div class="flex w-full items-center justify-end gap-4 py-2">
				<button
					onclick={() => {
						delete_confirmation_input = '';
						confirm_delete = false;
					}}
					type="button"
					class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-base font-medium hover:bg-gray-200 active:scale-95"
					>cancel</button
				>
				<button
					disabled={delete_confirmation_input !== 'delete this product'}
					onclick={async () => {
						const { error } = await supabase.from('products').delete().eq('id', id);
						delete_confirmation_input = '';
						mounted = false;
						confirm_delete = false;
					}}
					type="button"
					class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 bg-red-500 px-4 py-2 text-base font-medium text-white hover:bg-red-600 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed disabled:bg-red-300"
					>delete product
				</button>
			</div>
		</div>
	</div>
{/if}
<!-- edit ui -->
{#if edit_page}
	<div
		class="fixed inset-0 z-20 flex min-h-screen w-screen flex-col items-center justify-start overflow-auto bg-white"
	>
		<div
			class="mb-10 flex h-24 w-full items-center justify-between gap-2 border-b-2 border-b-gray-300 bg-white px-10 py-4"
		>
			<div>
				<h1 class="text-2xl font-bold tracking-wider text-black">edit product:</h1>
				<p class="text-lg text-gray-400">{name}</p>
			</div>
			<button
				onclick={() => (edit_page = false)}
				class="flex items-center justify-center gap-2 rounded-lg border-2 border-gray-500 bg-white px-4 py-2 font-medium text-gray-500 transition duration-200 ease-in-out hover:cursor-pointer active:scale-95"
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
					class="stroke-gray-500"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg
				>
				<p class="hidden lg:block">back to products</p></button
			>
		</div>
		<div
			class="mx-auto flex h-fit w-fit items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-1.5"
		>
			<button
				type="button"
				onclick={() => {
					tab = 'basic info';
				}}
				class={[
					'flex w-full cursor-pointer  items-center justify-center rounded-sm px-20 py-2  font-medium ',
					tab == 'basic info' ? 'bg-white text-black ' : 'text-gray-500 '
				]}
				><p class="text-nowrap">basic info</p>
			</button>
			<button
				type="button"
				onclick={() => {
					tab = 'images';
				}}
				class={[
					'flex w-full cursor-pointer flex-wrap items-center justify-center rounded-sm px-20 py-2  font-medium ',
					tab == 'images' ? 'bg-white text-black ' : 'text-gray-500 '
				]}>images</button
			>
			<button
				type="button"
				onclick={() => {
					tab = 'variants';
				}}
				class={[
					'flex w-full cursor-pointer flex-wrap items-center justify-center rounded-sm px-20 py-2  font-medium ',
					tab == 'variants' ? 'bg-white text-black ' : 'text-gray-500 '
				]}>variants</button
			>
		</div>
		<div class="relative flex h-fit w-full flex-col items-center justify-center px-4 py-4">
			{#if tab == 'basic info'}
				<div
					class="flex w-3/5 flex-col items-center justify-start gap-4 rounded-2xl border-1 border-gray-300 py-4"
				>
					<div class="flex w-full items-center justify-between gap-2 px-4">
						<!-- name -->
						<div class="flex w-full flex-col gap-1">
							<label for="" class="font-medium tracking-wide">product name </label>
							<input
								bind:value={edited_product.name}
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
									<!-- svelte-ignore a11y_click_events_have_key_events -->
									<!-- svelte-ignore a11y_no_static_element_interactions -->
									<div
										class="flex w-full items-center justify-between rounded-lg border-2 border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-200"
										onclick={() => {
											menuopen = !menuopen;
										}}
									>
										<span>{edited_product.category ?? (category || 'Select a category')}</span>
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
												<!-- svelte-ignore a11y_click_events_have_key_events -->
												<li
													onclick={() => {
														menuopen = false;
														edited_product.category = category.name;
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
					<div class="flex w-full flex-col items-start justify-start px-4">
						<label for="store-description" class="font-medium">product description </label>

						<textarea
							bind:value={edited_product.description}
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
					<div class="flex w-full items-center justify-between gap-2 px-4">
						<!--price  -->
						<div class="flex w-full flex-col gap-1">
							<label for="" class="font-medium tracking-wide">buying price </label>
							<input
								bind:value={edited_product.buying_price}
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
								bind:value={edited_product.selling_price}
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
					<!-- cancel and save buttons  -->
					<div class="flex w-full items-center justify-end gap-4 px-4 py-2">
						<button
							type="button"
							class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-base font-medium hover:bg-gray-200 active:scale-95"
							>cancel</button
						>
						<!-- change into submit later !!! -->
						<button
							disabled={name === edited_product.name &&
								buying_price === edited_product.buying_price &&
								selling_price === edited_product.selling_price &&
								inventory === edited_product.inventory &&
								description === edited_product.description &&
								category === edited_product.category}
							onclick={async () => {
								const found = categories.find((item) => item.name === edited_product.category);
								if (found) {
									const { data, error } = await supabase
										.from('products')
										.update({
											name: edited_product.name,
											buying_price: edited_product.buying_price,
											selling_price: edited_product.selling_price,
											initial_stock: edited_product.inventory,
											description: edited_product.description,
											category_id: found.id
										})
										.eq('id', id)
										.select();
								} else {
									const { data, error } = await supabase
										.from('products')
										.update({
											name: edited_product.name,
											buying_price: edited_product.buying_price,
											selling_price: edited_product.selling_price,
											initial_stock: edited_product.inventory,
											description: edited_product.description
										})
										.eq('id', id)
										.select();
								}
								edit_page = false;
							}}
							type="button"
							class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 bg-black px-4 py-2 text-base font-medium text-white hover:bg-gray-800 active:scale-95 disabled:bg-gray-600"
							>save changes
						</button>
					</div>
				</div>
			{:else if tab == 'images'}
				<div
					class="flex w-3/5 flex-col items-center justify-start gap-4 rounded-2xl border-1 border-gray-300 px-2 py-4"
				>
					<div class="flex w-full flex-wrap items-center justify-start gap-4 px-2 py-2">
						{#each urls as img, index}
							<div class="relative h-fit w-fit">
								<!-- svelte-ignore a11y_consider_explicit_label -->
								<button
									type="button"
									onclick={async () => {
										const path = img.split('/products-images/')[1];
										const { data, error } = await supabase.storage
											.from('products-images')
											.remove([path]);
										if (error) {
											console.error('Delete error:', error.message);
										} else {
											urls = urls.filter((u) => u !== img);
											await supabase.from('products').update({ img_url: urls }).eq('id', id);
										}
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
									src={img ?? '/placeholder.svg'}
									alt=""
									class=" h-23 w-23 rounded-md border-1 border-gray-300 object-cover p-2"
								/>
							</div>
						{/each}
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
									onchange={async (e) => {
										if (e.target.files[0]) {
											const file = e.target.files[0];
											e.target.value = '';

											// Generate clean file path
											let filepath = `${name.trim().replace(/"/g, '').replace(/\s+/g, '-').toLowerCase()}-${urls.length}.png`;

											// Upload file
											const { data: upload, error: uploadError } = await supabase.storage
												.from('products-images')
												.upload(filepath, file);

											if (uploadError) {
												alert(uploadError.message);
												console.log(uploadError);
												return;
											}

											// Get public URL
											const { data: urlData, error: urlError } = supabase.storage
												.from('products-images')
												.getPublicUrl(upload.path); // use `upload.path`, not `fullPath`

											if (urlError) {
												console.log(urlError);
												return;
											}

											const publicUrl = urlData.publicUrl;
											urls.push(publicUrl);

											// Update DB
											const { data: updated, error: updateError } = await supabase
												.from('products')
												.update({ img_url: urls }) // Make sure img_url is a text[] column
												.eq('id', id)
												.select();

											if (updateError) {
												console.log(updateError);
											}
										}
									}}
									class="border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring hidden h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
									id="category-image-upload"
									accept="image/*"
									type="file"
								/>
							</label>
						</div>
					</div>
					<!-- cancel and save buttons  -->
					<div class="flex w-full items-center justify-end gap-4 px-4 py-2">
						<button
							type="button"
							class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-base font-medium hover:bg-gray-200 active:scale-95"
							>cancel</button
						>
						<!-- change into submit later !!! -->
						<button
							type="button"
							class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 bg-black px-4 py-2 text-base font-medium text-white hover:bg-gray-800 active:scale-95"
							>save changes
						</button>
					</div>
				</div>
			{:else if tab == 'variants'}
				<div
					class=" flex w-fit min-w-3/5 flex-col items-center justify-start gap-4 rounded-2xl border-1 border-gray-300 px-2 py-4"
				>
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
									<th class="w-25 p-2"></th>
								</tr>
							</thead>
						{/if}
						<tbody>
							{#each variants as variant, i}
								<tr class="w-fit text-left hover:bg-gray-50">
									<td class="w-25 p-2 text-center">{i + 1}</td>
									<td class="w-25 p-2 text-left"
										><img
											src={variant.img_url ?? '/placeholder.svg'}
											onerror={() => {
												this.src = '/placeholder.svg';
											}}
											alt=""
											class="style-none h-10 w-10 rounded-lg border-2 border-gray-300 bg-white object-cover"
										/></td
									>
									<td class="w-25 p-2 text-left">{variant.stock ?? '0'}</td>
									{#each def as td}
										<td class="w-25 p-2 text-left">{variant.specific_attributes[td.name] ?? '-'}</td
										>
									{/each}
									<td class="w- p-2">
										<div class="flex items-center justify-between">
											<!-- svelte-ignore a11y_consider_explicit_label -->
											<button
												onclick={() => {}}
												class=" flex size-9 cursor-pointer items-center justify-center rounded-lg bg-white p-1 text-sm font-semibold hover:bg-gray-200 active:scale-95"
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
													class="lucide lucide-square-pen h-4 w-4"
													><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
													></path><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"
													></path></svg
												>
											</button>
											<!-- svelte-ignore a11y_consider_explicit_label -->

											<button
												onclick={() => {
													confirm_delete_variant = true;
													variant_id_to_delete = variant.id;
												}}
												class=" flex size-9 cursor-pointer items-center justify-center rounded-lg bg-white p-1 text-sm font-semibold hover:bg-gray-200 active:scale-95"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke=""
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="lucide lucide-trash2 h-4 w-4 stroke-red-500"
													><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
													></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line
														x1="10"
														x2="10"
														y1="11"
														y2="17"
													></line><line x1="14" x2="14" y1="11" y2="17"></line></svg
												>
											</button>
										</div>
									</td>
								</tr>
							{:else}
								<tr class="h-30">
									<td class="text-center" colspan="100%">
										<p class="text-sm font-medium text-gray-400">this product has no variants</p>
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
											<span class="ms-3 text-sm font-medium text-gray-900">{inputfield.name}</span>
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
												placeholder={inputfield.default}
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
												placeholder={inputfield.default}
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
												placeholder={inputfield.default}
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
												><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path
													d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
												/></svg
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
										<span class="text-muted-foreground mt-1 text-xs text-gray-500">Add Image</span>
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
								onclick={async () => {
									// Gather specific attributes from inputs
									for (let i = 0; i < def.length; i++) {
										const field = def[i];
										const input = document.getElementsByName(field.name)[0];
										if (!input) continue;
										new_variant.specific_attributes[field.name] =
											field.type === 'yes/no' ? input.checked : input.value;
									}

									// Upload image if present
									const file = new_variant.img?.[0];
									if (!file) {
										alert('Please upload an image.');
										return;
									}

									const filepath = `${name.trim().replace(/"/g, '').replace(/\s+/g, '-').toLowerCase()}-v${variants.length}.png`;

									const { data: upload, error: uploadError } = await supabase.storage
										.from('variants')
										.upload(filepath, file);

									if (uploadError) {
										alert(uploadError.message);
										console.error(uploadError);
										return;
									}

									// Get public URL of uploaded image
									const { data: urlData, error: urlError } = supabase.storage
										.from('variants')
										.getPublicUrl(upload.path);

									if (urlError) {
										console.error(urlError);
										return;
									}

									const publicUrl = urlData.publicUrl;

									// Insert the new variant into DB
									const { data, error } = await supabase
										.from('product_variants')
										.insert([
											{
												product_id: id,
												initial_stock: new_variant.stock,
												img_url: publicUrl,
												specific_attributes: new_variant.specific_attributes
											}
										])
										.select();

									if (error) {
										console.error(error);
										alert('Failed to insert variant.');
										return;
									}

									// Update local variant list
									variants.push({
										...new_variant,
										img_url: publicUrl
									});

									// Reset form
									adding_new_variant = false;
									new_variant = {
										stock: null,
										img: null,
										specific_attributes: {}
									};

									console.log('New variants:', variants);
								}}
								type="button"
								class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 bg-black px-4 py-2 text-base font-medium text-white hover:bg-gray-800 active:scale-95"
								>add variant
							</button>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}
<!-- delete variant ui -->
{#if confirm_delete_variant}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="absolute inset-0 z-20 flex h-screen w-screen items-center justify-center bg-black/50"
		onclick={(confirm_delete_variant = false)}
	>
		<div
			class="flex h-85 w-140 flex-col items-center justify-center gap-3 rounded-2xl bg-white px-10 py-5"
			onclick={(e) => {
				e.stopImmediatePropagation();
			}}
		>
			<div class="flex h-10 w-full items-center justify-start gap-3.5">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#fb2c36"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
					></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg
				>
				<p class="w-full text-xl font-bold text-red-500">Delete variant</p>
			</div>
			<!-- warning -->
			<div class="flex flex-col items-center justify-center gap-1 rounded-2xl">
				<p class="text-justify text-base tracking-tight text-gray-500">
					By confirming, you agree to permanently delete this variant of <span
						class="text-lg font-medium text-black/70">{name}</span
					>
					and all associated data, including revenue analytics and sales history.
					<span class=""> This action is irreversible and cannot be undone. </span>
				</p>
			</div>
			<div class="flex w-full flex-col gap-1">
				<label for="" class="font-medium tracking-wide text-red-500">Confirmation</label>
				<input
					bind:value={delete_confirmation_input_variant}
					type="text"
					name=""
					id=""
					placeholder={'Type "delete this variant" to confirm'}
					class="w-full rounded-md border-2 border-red-500 px-2 py-1.5 ring-red-600 placeholder:text-gray-500 focus:border-red-400 focus:ring-2 focus:outline-none"
				/>
			</div>

			<!-- cancel and delete buttons -->
			<div class="flex w-full items-center justify-end gap-4 py-2">
				<button
					onclick={() => {
						delete_confirmation_input_variant = '';
						confirm_delete_variant = false;
						variant_id_to_delete = null;
					}}
					type="button"
					class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-base font-medium hover:bg-gray-200 active:scale-95"
					>cancel</button
				>
				<button
					disabled={delete_confirmation_input_variant !== 'delete this variant'}
					onclick={async () => {
						const { error } = await supabase
							.from('product_variants')
							.delete()
							.eq('product_id', id)
							.eq('id', variant_id_to_delete);
						delete_confirmation_input_variant = '';
						confirm_delete_variant = false;
						variants = variants.filter((v) => v.id !== variant_id_to_delete);
						variant_id_to_delete = null;
					}}
					type="button"
					class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 bg-red-500 px-4 py-2 text-base font-medium text-white hover:bg-red-600 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed disabled:bg-red-300"
					>delete product
				</button>
			</div>
		</div>
	</div>
{/if}
