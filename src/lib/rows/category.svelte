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
			definition = category.definition.map((i) => {
				return ` ${i.name}`;
			});
		}
		const { count, error } = await supabase
			.from('products')
			.select('*', { count: 'exact', head: true })
			.eq('category_id', category.id);
		console.log(category, count, error);
		products_count = count;
	});
	// delete vars
	let delete_confirmation_input = $state(),
		confirm_delete = $state(false),
		is_category_deleted = $state(false);
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
