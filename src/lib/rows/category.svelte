<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/index.js';
	let { category } = $props();
	let img = $state(category.image_url);
	let name = $state(category.name);
	let definition = $state('');
	let description = $state(category.description);
	let products_count = $state('counting ...');
	onMount(async () => {
		if (!category.definition.length) {
			definition = 'no definition provided';
		} else {
			custom_fields_to_edit = category.definition;
			definition = category.definition.map((i) => {
				return ` ${i.name}`;
			});
		}
		const { count, error } = await supabase
			.from('products')
			.select('*', { count: 'exact', head: true })
			.eq('category_id', category.id);
		products_count = count;
	});
	// delete vars
	let delete_confirmation_input = $state(),
		confirm_delete = $state(false),
		is_category_deleted = $state(false);
	// edit vars
	let name_to_edit = $state(name);
	let description_to_edit = $state(description),
		img_to_edit = $state(),
		custom_fields_to_edit = $state([]);
	let edit_page = $state(false);
	// let new_field = $state({ is_req, def_val, field_name, type });
</script>

{#if !is_category_deleted}
	<tr>
		<td class="border-b-2 border-b-gray-300 px-4 py-2">
			<img
				id={'cat-' + name}
				src={img ?? '/placeholder.svg'}
				onerror={() => {
					document.getElementById('cat-' + name).src = '/placeholder.svg';
				}}
				alt=""
				class="style-none h-10 w-10 rounded-lg border-2 border-gray-300 bg-gray-300 object-cover"
			/></td
		>
		<td class="border-b-2 border-b-gray-300 px-4 py-2 text-left text-sm">{name ?? '-'}</td>
		<td class=" border-b-2 border-b-gray-300 px-4 py-2 text-sm">{definition ?? '-'}</td>
		<td class=" border-b-2 border-b-gray-300 px-4 py-2 text-sm">{description ?? '-'}</td>
		<td class="w-20 border-b-2 border-b-gray-300 px-4 py-2">{products_count ?? '-'}</td>
		<td class="w-20 border-b-2 border-b-gray-300 px-4 py-2 text-center">
			<div class="flex items-center justify-between">
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button
					onclick={() => {
						edit_page = true;
					}}
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
						><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path
							d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"
						></path></svg
					>
				</button>
				<!-- svelte-ignore a11y_consider_explicit_label -->

				<button
					onclick={() => {
						confirm_delete = true;
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
						><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path
							d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
						></path><line x1="10" x2="10" y1="11" y2="17"></line><line
							x1="14"
							x2="14"
							y1="11"
							y2="17"
						></line></svg
					>
				</button>
			</div></td
		>
	</tr>
{/if}

<!-- delete category confirmation ui -->
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
				<p class="w-full text-xl font-bold text-red-500">Delete category</p>
			</div>
			<!-- warning -->
			<div class="flex flex-col items-center justify-center gap-1 rounded-2xl">
				<p class="text-justify text-base tracking-tight text-gray-500">
					By confirming, you agree to permanently delete <span
						class="text-lg font-medium text-black/70">{name}</span
					>
					and all associated data, including products, revenue analytics and sales history.
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
					placeholder={'Type "delete this category" to confirm'}
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
					disabled={delete_confirmation_input !== 'delete this category'}
					onclick={async () => {
						const { error } = await supabase.from('categories').delete().eq('id', category.id);
						delete_confirmation_input = '';
						is_category_deleted = true;
						confirm_delete = false;
					}}
					type="button"
					class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 bg-red-500 px-4 py-2 text-base font-medium text-white hover:bg-red-600 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed disabled:bg-red-300"
					>delete category
				</button>
			</div>
		</div>
	</div>
{/if}
<!-- edit category page  -->
{#if edit_page}
	<div
		class="fixed inset-0 z-20 gap-5  flex min-h-screen w-screen flex-col items-center justify-start overflow-auto bg-white"
	>
		<!-- headers -->
		<div
			class="mb-10 flex h-24 w-full items-center justify-between gap-2 border-b-2 border-b-gray-300 bg-white px-10 py-4"
		>
			<div>
				<h1 class="text-2xl font-bold tracking-wider text-black">edit category:</h1>
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
				<p class="hidden lg:block">back to categories</p></button
			>
		</div>
		<!-- edit form -->
		<div
			class="flex w-full flex-wrap items-center justify-center gap-5 px-2 md:flex-nowrap lg:px-20"
		>
			<div class="flex w-full flex-col items-center justify-start gap-4 px-4">
				<div class="flex w-full flex-col gap-1">
					<label for="" class="font-medium tracking-wide">category name </label>
					<input
						bind:value={name_to_edit}
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
						bind:value={description_to_edit}
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
					<div class="flex h-28 w-fit items-center justify-center gap-3 rounded-md">
						<img
							src={img ?? '/placeholder.svg'}
							id={name + 'edit'}
							onerror={(e) => {
								e.currentTarget.src = '/placeholder.svg';
							}}
							onload={(e) => {
								if (e.currentTarget.naturalWidth === 0 || e.currentTarget.naturalHeight === 0) {
									e.currentTarget.src = '/placeholder.png';
								}
							}}
							alt="img"
							class=" h-28 w-28 rounded-md border border-gray-300 object-cover"
						/>
						<label
							class="flex h-fit w-fit cursor-pointer flex-col items-center justify-center rounded-md border-1 border-gray-300 px-2 py-1 text-center text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
							<span class="text-muted-foreground mt-1 text-xs text-nowrap text-gray-500"
								>change Image</span
							>
							<input
								class="border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring hidden h-10 w-full rounded-md border border-dashed px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
								id="category-image-upload"
								accept="image/*"
								type="file"
							/>
						</label>
					</div>
				</div>
			</div>
			<!-- custom fields -->
			<div class="flex w-full flex-col items-start justify-center gap-4">
				<table class="w-full">
					<thead class="w-full">
						{#if custom_fields_to_edit.length}
							<tr class="hover:bg-gray-50">
								<th class="w-35 px-1 py-2 text-left">name</th>
								<th class="w-35 px-2 py-2 text-left">type</th>
								<th class="w-35 px-1 py-2 text-center">default value</th>
								<th class="w-35 px-1 py-2 text-center">required</th>
								<th class="w-35 px-1 py-2 text-center"></th>
							</tr>
						{:else}
							<tr class="h-40">
								<th class="text-cetner" colspan="100%">
									<p class="text-center text-xl font-medium text-gray-400">
										this category has no definition fields
									</p>
								</th>
							</tr>
						{/if}
					</thead>
					<tbody>
						{#each custom_fields_to_edit as field, index}
							<tr class="hover:bg-gray-50">
								<td class="w-35 px-1 py-2 text-left">{field.name ?? '-'}</td>
								<td class="w-35 px-2 py-2 text-left">{field.type ?? '-'}</td>
								<td class="w-35 px-1 py-2 text-center">{field.def_val ?? '-'}</td>
								<td class="w-35 px-1 py-2 text-center">{field.is_req ? 'yes' : 'no'}</td>
								<td class="w-35 px-1 py-2 text-center">
									<!-- svelte-ignore a11y_consider_explicit_label -->
									<button
										onclick={() => {
											custom_fields_to_edit.splice(index, 1);
										}}
										type="button"
										class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg hover:bg-gray-200 active:scale-95"
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
											class="lucide lucide-trash text-muted-foreground h-4 w-4"
											><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
											></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg
										>
									</button></td
								>
							</tr>
						{/each}
					</tbody>
				</table>
				{#if custom_fields_to_edit.length < 6}
					<button
						onclick={() => {
							// adding_new_field = !adding_new_field;
						}}
						type="button"
						class="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border-2 border-gray-300 bg-white py-2 font-semibold hover:bg-gray-100"
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
				{/if}
			</div>
		</div>
		<!-- buttons -->
		<div class="flex w-full items-center justify-center gap-4 px-40 py-2">
			<button
				type="button"
				class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-xl font-medium hover:bg-gray-200 active:scale-95"
				>cancel</button
			>
			<!-- change into submit later !!! -->
			<button
				type="button"
				class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 bg-black px-4 py-2 text-xl font-medium text-white hover:bg-gray-800 active:scale-95 disabled:scale-100 disabled:bg-gray-700"
				>save changes
			</button>
		</div>
	</div>
{/if}
