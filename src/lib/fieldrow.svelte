<script>
	let menuopen = $state(false);
	let selectedtype = $state(null);
	let {
		remove,
		name = $bindable(''),
		def_val = $bindable(''),
		is_req = $bindable(false),
		type = $bindable(null)
	} = $props();
</script>

<div class=" flex w-full items-center justify-between rounded-lg px-1 py-2 hover:bg-gray-100">
	<input
		type="text"
		bind:value={name}
		name=""
		id=""
		placeholder="field name"
		class="w-33 rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none"
	/>
	<div class="relative w-33">
		<button
			type="button"
			class="flex w-full items-center justify-between rounded-lg border-2 border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-200"
			onclick={() => {
				menuopen = !menuopen;
			}}
			><span>{selectedtype || 'field type'}</span>
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
				class="absolute z-1 mt-1 w-full rounded-lg border-1 border-gray-300 bg-white p-1 shadow-lg"
			>
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<li
					onclick={() => {
						menuopen = false;
						type = 'text';
					}}
					class="rounded-lg px-5 py-1.5 text-sm hover:bg-gray-100"
				>
					text
				</li>
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<li
					onclick={() => {
						menuopen = false;
						type = 'number';
					}}
					class="rounded-lg px-5 py-1.5 text-sm hover:bg-gray-100"
				>
					number
				</li>
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<li
					onclick={() => {
						menuopen = false;
						type = 'date';
					}}
					class="rounded-lg px-5 py-1.5 text-sm hover:bg-gray-100"
				>
					date
				</li>

				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<li
					onclick={() => {
						menuopen = false;
						type = 'yes/no';
					}}
					class="rounded-lg px-5 py-1.5 text-sm hover:bg-gray-100"
				>
					yes/no
				</li>
			</ul>
		{/if}
	</div>
	<input
		bind:value={def_val}
		type="text"
		name=""
		id=""
		placeholder="default value"
		class="w-33 rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none"
	/>
	<div class="flex items-center gap-2">
		<label for="">required</label>

		<input
			bind:checked={is_req}
			type="checkbox"
			name=""
			id=""
			class="h-4 w-4 rounded-sm border-1 ring-black checked:bg-black"
		/>
	</div>
	<!-- svelte-ignore a11y_consider_explicit_label -->
	<button
		onclick={remove}
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
			><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path
				d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
			></path></svg
		>
	</button>
</div>
