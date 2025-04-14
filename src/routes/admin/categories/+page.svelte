<script>
	import Field from '$lib/fieldrow.svelte';
	import { category_row } from '$lib/tablerow.svelte';
	let add_category_form = $state(false);
	$effect(() => {
		add_category_form
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'auto');
	});
	// category form vars
	let category_name = $state('');
	let category_description = $state('');
	let category_img = $state(null);

	// custom fields
	let custom_fields = $state([]);
	$inspect(custom_fields);
</script>

<div
	class="mb-10 flex h-24 w-full items-center justify-between gap-2 border-b-2 border-b-gray-300 bg-white py-4"
>
	<div>
		<h1 class="text-2xl font-bold tracking-wider text-black">Categories</h1>
		<p class="text-gray-400">Manage product categories and subcategories.</p>
	</div>
	<button
		onclick={() => (add_category_form = true)}
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
		<p class="hidden lg:block">add a category</p></button
	>
</div>
<table
	cellspacing="0"
	class="w-full border-separate rounded-t-2xl border-2 border-b-0 border-gray-300 bg-white text-left"
>
	<thead class="border-separate rounded-t-2xl">
		<tr class="rounded-t-2xl border-b-1 border-b-gray-300">
			<th class="w-10 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2">image</th>
			<th class="border-b-2 border-b-gray-300 px-4 py-2">category </th>
			<th class=" border-b-2 border-b-gray-300 px-4 py-2">description</th>
			<th class="w-40 border-b-2 border-b-gray-300 px-4 py-2">products</th>
			<th class="w-15 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2"></th>
		</tr>
	</thead>
	<tbody class="">
		{@render category_row({
			name: 'electronics',
			description: 'electronic devices and gadgets',
			products_count: 10
		})}
		{@render category_row({
			name: 'clothing',
			description: 'clothing and apparel',
			products_count: 20
		})}
		{@render category_row({
			name: 'home appliances',
			description: 'home appliances and gadgets',
			products_count: 15
		})}
	</tbody>
</table>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- new category form -->
<div
	onclick={() => {
		add_category_form = false;
	}}
	class={[
		'fixed inset-0 z-50 flex items-center justify-center bg-black/50',
		add_category_form ? 'flex' : 'hidden'
	]}
>
	<div
		onclick={(e) => e.stopPropagation()}
		class="relative z-60 h-150 w-full min-w-120 overflow-y-auto rounded-xl bg-white p-6 shadow-lg"
	>
		<!-- Header -->
		<div class="mb-2 flex items-center justify-between">
			<h2 class="text-lg font-semibold tracking-wide">Add New category</h2>
			<button
				onclick={() => {
					add_category_form = false;
				}}
				class="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 active:scale-95"
			>
				✕
			</button>
		</div>

		<form class="flex h-full flex-col justify-between py-10" method="POST">
			<div class=" flex h-fit w-full flex-col items-start gap-2 py-3 lg:flex-row">
				<div
					class="flex w-full flex-col items-start gap-2 rounded-lg border-2 border-gray-300 px-4 py-2 lg:w-1/2"
				>
					<div>
						<p class="text-xl font-medium">basic info</p>
						<p class="text-sm font-medium text-gray-400">add new category for your store</p>
					</div>
					<div class="flex w-full flex-col gap-1">
						<label for="" class="font-medium tracking-wide">category name </label>
						<input
							bind:value={category_name}
							type="text"
							name=""
							id=""
							placeholder="eg. electronics"
							class="w-full rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none"
						/>
					</div>
					<div class="flex w-full flex-col items-start justify-start">
						<label for="store-description" class="font-medium">category description </label>

						<textarea
							bind:value={category_description}
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
					<div class="flex w-full items-center justify-start">
						<div
							class="flex h-24 w-24 items-center justify-center rounded-md border border-dashed border-gray-300"
						>
							{#if category_img && category_img[0]}
								<img
									src={URL.createObjectURL(category_img[0])}
									alt=""
									class=" h-full w-full object-cover"
								/>
							{:else}
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
										bind:files={category_img}
										class="border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring hidden h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
										id="category-image-upload"
										accept="image/*"
										type="file"
									/>
								</label>
							{/if}
						</div>
					</div>
				</div>
				<div
					class="flex w-full flex-col gap-5 rounded-lg border-2 border-gray-300 bg-white px-4 py-2 lg:w-1/2"
				>
					<div>
						<p class="text-xl font-medium">Custom fields</p>
						<p class="text-sm font-medium text-gray-400">
							Add custom fields to define your category
						</p>
					</div>
					<div class="flex w-full flex-col items-center justify-center gap-4">
						{#each custom_fields as field, index}
							<Field
								remove={() => {
									custom_fields.splice(index, 1);
								}}
								bind:name={field.name}
								bind:def_val={field.def_val}
								bind:is_req={field.is_req}
								bind:type={field.type}
							/>
						{:else}
							<p class="text-sm font-medium text-gray-400">No custom fields added yet</p>
						{/each}
						<button
							onclick={() => {
								custom_fields.push({ name: '', def_val: '', type: null, is_req: false });
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
							add a custom field</button
						>
					</div>
				</div>
			</div>
			<div class="flex w-full items-center justify-end gap-4 py-2">
				<button
					onclick={() => {
						category_description = null;
						category_img = null;
						category_name = null;
					}}
					type="button"
					class="flex cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-base font-medium hover:bg-gray-200 active:scale-95"
					>cancel</button
				>
				<button
					class="flex cursor-pointer items-center justify-center rounded-lg border-2 bg-black px-4 py-2 text-base font-medium text-white hover:bg-gray-800 active:scale-95"
					>add category
				</button>
			</div>
		</form>
	</div>
</div>
