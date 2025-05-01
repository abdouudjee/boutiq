<script>
	import { supabase } from '$lib/index.js';
	import { onMount } from 'svelte';
	let { customer } = $props();
	let delete_user = $state(false);
	let ban_user = $state(false);
	let unban_user = $state(false);
	let orders_counter = $state(0);
	let total_spent = $state(0);
	let delete_confirmation_input = $state('');
	let last_order = $state();
	$effect(async () => {
		let { data, error } = await supabase.from('orders').select('*').eq('client_id', customer.id);
		orders_counter = data.length;
		data.forEach((order) => {
			total_spent += order.total_price;
		});
		data.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
		total_spent += ' dzd';
		last_order = data?.[0]?.order_date.split('T')[0];
	});
</script>

<tr>
	<td class="w-80 border-b-2 border-b-gray-300 px-4 py-2 text-left font-medium">
		<div class="flex flex-col">
			<p class="text-sm font-medium">
				{customer.full_name}
			</p>
			<p class="text-sm text-gray-500">
				{customer.email}
			</p>
		</div>
	</td>
	<td class="w-20 border-b-2 border-b-gray-300 px-4 py-2 text-left font-medium"
		>{orders_counter ?? 'counting...'}</td
	>
	<td class="w-20 border-b-2 border-b-gray-300 px-4 py-2 text-left font-medium"
		>{total_spent ?? 'counting...'}
	</td>
	<td class="w-20 border-b-2 border-b-gray-300 px-4 py-2 text-center font-medium"
		>{last_order ?? '-'}</td
	>
	<td class="w-20 border-b-2 border-b-gray-300 px-4 py-2 text-left text-sm"
		><p
			class={[
				' mx-auto  w-fit rounded-full  px-2  py-1 text-sm font-medium ',
				customer.status == 'active'
					? 'border-1 border-green-400 bg-green-200 font-medium  text-green-700'
					: '',
				customer.status == 'inactive'
					? 'border-1 border-red-400 bg-red-200 font-medium  text-red-700'
					: '',
				customer.status == 'new'
					? 'border-1 border-blue-400 bg-blue-200 font-medium  text-blue-700'
					: '',
				customer.status == 'banned'
					? 'border-1 border-purple-400 bg-purple-200 font-medium  text-purple-700'
					: ''
			]}
		>
			{customer.status}
		</p>
	</td>
	<td class="border-b-2 border-b-gray-300 px-4 py-2 text-left text-sm">
		<div class="flex items-center justify-center">
			{#if customer.status !== 'banned'}
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button
					onclick={() => {
						ban_user = true;
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
						class=""><circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" /></svg
					>
				</button>
			{:else}
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button
					onclick={() => {
						unban_user = true;
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
						class="h-5 w-5"
						><path
							d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
						/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" /></svg
					>
				</button>
			{/if}
			<!-- svelte-ignore a11y_consider_explicit_label -->

			<button
				onclick={() => {
					delete_user = true;
				}}
				class=" flex size-9 cursor-pointer items-center justify-center rounded-lg bg-white text-sm font-semibold hover:bg-gray-200 active:scale-95"
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
					class="lucide lucide-trash2 h-5 w-5 stroke-red-500"
					><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path
						d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
					></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"
					></line></svg
				>
			</button>
		</div>
	</td>
</tr>
<!-- delete user ui -->
{#if delete_user}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="fixed inset-0 z-20 flex h-screen w-screen items-center justify-center bg-black/50"
		onclick={(delete_user = false)}
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
				<p class="w-full text-xl font-bold text-red-500">Delete user</p>
			</div>
			<!-- warning -->
			<div class="flex flex-col items-center justify-center gap-1 rounded-2xl">
				<p class="text-justify text-base tracking-tight text-gray-500">
					By confirming, you agree to permanently delete <span
						class="text-lg font-medium text-black/70">{customer.full_name}</span
					>
					account and all associated data, including purchase history .
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
					placeholder={'Type "delete this user" to confirm'}
					class="w-full rounded-md border-2 border-red-500 px-2 py-1.5 ring-red-600 placeholder:text-gray-500 focus:border-red-400 focus:ring-2 focus:outline-none"
				/>
			</div>

			<!-- cancel and delete buttons -->
			<div class="flex w-full items-center justify-end gap-4 py-2">
				<button
					onclick={() => {
						delete_confirmation_input = '';
						delete_user = false;
					}}
					type="button"
					class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-base font-medium hover:bg-gray-200 active:scale-95"
					>cancel</button
				>
				<button
					disabled={delete_confirmation_input !== 'delete this customer'}
					onclick={async () => {
						const { error } = await supabase.from('clients').delete().eq('id', customer.id);
						delete_confirmation_input = '';
						delete_user = false;
					}}
					type="button"
					class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 bg-red-500 px-4 py-2 text-base font-medium text-white hover:bg-red-600 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed disabled:bg-red-300"
					>delete customer
				</button>
			</div>
		</div>
	</div>
{/if}
<!-- ban user ui -->
{#if ban_user}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="fixed inset-0 z-20 flex h-screen w-screen items-center justify-center bg-black/50"
		onclick={(ban_user = false)}
	>
		<div
			class="flex h-fit w-140 flex-col items-center justify-center gap-3 rounded-2xl bg-white px-10 py-5"
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
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class=""><circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" /></svg
				>
				<p class="w-full text-xl font-bold text-black">ban user</p>
			</div>
			<!-- warning -->
			<div class="flex flex-col items-center justify-center gap-1 rounded-2xl">
				<p class="text-justify text-base tracking-tight text-gray-500">
					By confirming, you agree to ban <span class="text-lg font-medium text-black/70"
						>{customer.full_name}</span
					>. this will restrict him from loggin in or accessing any part of their account
				</p>
			</div>

			<!-- ban and cancel buttons -->
			<div class="flex w-full items-center justify-end gap-4 py-2">
				<button
					onclick={() => {
						ban_user = false;
					}}
					type="button"
					class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-base font-medium hover:bg-gray-200 active:scale-95"
					>cancel</button
				>
				<button
					onclick={async () => {
						const { error } = await supabase
							.from('clients')
							.update({ status: 'banned' })
							.eq('id', customer.id);
						customer.status = 'banned';
						ban_user = false;
					}}
					type="button"
					class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 bg-black px-4 py-2 text-base font-medium text-white hover:bg-gray-800 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed disabled:bg-gray-600"
					>ban customer
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- unban user ui -->
{#if unban_user}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="fixed inset-0 z-20 flex h-screen w-screen items-center justify-center bg-black/50"
		onclick={() => {
			unban_user = false;
		}}
	>
		<div
			class="flex h-fit w-140 flex-col items-center justify-center gap-3 rounded-2xl bg-white px-10 py-5"
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
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-key-round-icon lucide-key-round"
					><path
						d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
					/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" /></svg
				>
				<p class="w-full text-xl font-bold text-black">unban user</p>
			</div>
			<!-- warning -->
			<div class="flex flex-col items-center justify-center gap-1 rounded-2xl">
				<p class="text-justify text-base tracking-tight text-gray-500">
					By confirming, you agree to unban <span class="text-lg font-medium text-black/70"
						>{customer.full_name}</span
					>. this will grant them from login and using their account again.
				</p>
			</div>

			<!-- ban and cancel buttons -->
			<div class="flex w-full items-center justify-end gap-4 py-2">
				<button
					onclick={() => {
						unban_user = false;
					}}
					type="button"
					class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-base font-medium hover:bg-gray-200 active:scale-95"
					>cancel</button
				>
				<button
					onclick={async () => {
						let new_status = total_spent === '0 dzd' ? 'new' : 'active';
						const { error } = await supabase
							.from('clients')
							.update({ status: new_status })
							.eq('id', customer.id);
						customer.status = new_status;
						unban_user = false;
					}}
					type="button"
					class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 bg-black px-4 py-2 text-base font-medium text-white hover:bg-gray-800 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed disabled:bg-gray-600"
					>unban customer
				</button>
			</div>
		</div>
	</div>
{/if}
