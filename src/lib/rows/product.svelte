<script>
	import { tick } from 'svelte';

	let { name, img, price, inventory, category } = $props();
	// delete vars
	let open = $state(false);
	let dropdown = $state();
	let confirm_delete = $state(false);
	let delete_confirmation_input = $state('');
	$effect(() => {
		confirm_delete || edit_page
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'auto');
	});
	// edit vars
	let edit_page = $state(true);
	let tab = $state('basic info');
</script>

<tr>
	<td class="border-b-2 border-b-gray-300 px-4 py-2">
		<img
			id={name}
			src={img || '/placeholder.svg'}
			onerror={() => {
				document.getElementById(name).src = '/placeholder.svg';
			}}
			alt=""
			class="productimg style-none h-10 w-10 rounded-lg border-2 border-gray-300 bg-gray-300 object-cover"
		/></td
	>
	<td class="border-b-2 border-b-gray-300 px-4 py-2 text-left text-sm">{name}</td>
	<td class="w-30 border-b-2 border-b-gray-300 px-4 py-2">{price} Dzd</td>
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
<!-- delete ui -->
{#if confirm_delete}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="absolute inset-0 z-20 flex h-screen w-screen items-center justify-center bg-black/50"
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
					type="button"
					class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-base font-medium hover:bg-gray-200 active:scale-95"
					>cancel</button
				>
				<!-- change into submit later !!! -->
				<button
					disabled={delete_confirmation_input !== 'delete this product'}
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
		class="absolute inset-0 z-20 flex h-screen w-screen flex-col items-center justify-start bg-white"
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
	</div>
{/if}
