<script>
	let newvalue = $state('');
	let cell;
	let { value } = $props();
	let input = $state(false);
</script>

<td
	bind:this={cell}
	class="h-10 w-42 cursor-pointer rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2"
	onclick={() => {
		input = true;
		newvalue = value;
	}}
>
	{#if input}
		<div class="flex w-full items-center justify-between">
			<input
				type="text"
				class="h-7 w-18 rounded-lg border-2 border-gray-300 text-sm ring-0"
				bind:value={newvalue}
			/>

			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button
				class="y-1 flex h-7 w-7 items-center justify-center rounded-lg border-1 border-green-300 hover:bg-green-200 active:scale-95"
				onclick={(e) => {
					e.stopPropagation();
					value = newvalue;
					newvalue = '';
					input = false;
				}}
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
					class="stroke-green-600"><path d="M20 6 9 17l-5-5" /></svg
				></button
			>
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button
				class="y-1 flex h-7 w-7 items-center justify-center rounded-lg border-1 border-red-300 hover:bg-red-200 active:scale-95"
				onclick={(e) => {
					e.stopPropagation();
					input = false;
					newvalue = '';
				}}
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke=""
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="stroke-red-600"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
				></button
			>
		</div>
	{:else}
		{value == 'N/A' ? '-' : value + ' DZD'}
	{/if}
</td>
