<script>
	let selected = $state('store');
    let store_desc = $state('');
    $effect(() => {
        store_desc=store_desc.trimStart();
        if (store_desc.match(/\s{4,}$/)) {
            store_desc = store_desc.replace(/\s{4,}$/, '   ');
        }
    });
</script>

<div
	class="py- sticky top-0 z-10 mb-4 flex h-24 w-full flex-col items-start justify-start gap-2 border-b-2 border-b-gray-300 bg-white"
>
	<h1 class="text-2xl font-bold tracking-wider text-black">Settings</h1>
	<p class="text-gray-400">Manage your store settings and preferences.</p>
</div>
<div class="flex h-fit w-full items-center justify-center gap-2 rounded-lg bg-gray-100 p-4">
	<button
		onclick={(selected = 'store')}
		class={[
			'flex w-full cursor-pointer flex-wrap items-center justify-center rounded-lg py-2  font-medium ',
			selected == 'store' ? 'bg-white text-black ' : 'text-gray-500 '
		]}>store</button
	>
	<button
		onclick={(selected = 'shipping')}
		class={[
			'flex w-full cursor-pointer flex-wrap items-center justify-center rounded-lg py-2 font-medium',
			selected == 'shipping' ? 'bg-white text-black' : 'text-gray-500'
		]}>shipping</button
	>
	<button
		onclick={(selected = 'admins')}
		class={[
			'flex w-full cursor-pointer flex-wrap items-center justify-center rounded-lg py-2 font-medium',
			selected == 'admins' ? 'bg-white text-black' : 'text-gray-500'
		]}>admins</button
	>
</div>
<div class="mt-5 flex h-full w-full flex-col items-start justify-start gap-4">
	{#if selected == 'store'}
		<div class="h-fit w-full rounded-lg border-2 border-gray-300 px-4 py-2">
			<p class="text-3xl leading-10 font-medium tracking-wide text-black">store information</p>
			<div class="flex flex-col items-start justify-start gap-4 py-4">
				<div class="flex w-full flex-col items-start justify-start">
					<label for="store-name" class="font-medium ">store name</label>
					<input
						type="text"
						id="store-name"
						class="mt-2 h-10 w-1/2 rounded-lg border-2 border-gray-300 px-4"
						placeholder="store name"
					/>
				</div>
				<div class="flex w-full flex-col items-start justify-start">
					<label for="store-description" class="font-medium">store description </label>

					<textarea 
                    bind:value={store_desc}
                    
						name="store-description"
						id=""
						class="mt-2 h-30 w-full  rounded-lg border-2 border-gray-300 text-left ring-0"
						style=" 
                    scroll-behavior: smooth;
                    scrollbar-width: none;"
					>
					</textarea>
				</div>
				<div class="flex w-full  items-center justify-start gap-4">
					<div class="flex w-1/2 flex-col items-start justify-start">
						<label class="font-medium" for="store-name">contact email</label>
						<input
							type="text"
							id="store-name"
							class="mt-2 h-10 w-full rounded-lg border-2 border-gray-300 px-4"
							placeholder="store name"
						/>
					</div>
					<div class="flex w-1/2 flex-col items-start justify-start">
						<label for="store-name" class="font-medium">contact phone</label>
						<input
							type="text"
							id="store-name"
							class="mt-2 h-10 w-full rounded-lg border-2 border-gray-300 px-4"
							placeholder="store name"
						/>
					</div>
				</div>

				<div class="flex w-full flex-col items-start justify-start">
					<label for="store-description" class="font-medium">Store Address </label>

					<textarea
						name="store-description"
						id=""
						class="mt-2 h-15 w-full rounded-lg border-2 border-gray-300 px-4"
						style="
                    scroll-behavior: smooth;
                    scrollbar-width: none;"
					>
					</textarea>
				</div>
			</div>
		</div>
	{:else if selected == 'shipping'}
		shipping settings
	{:else if selected == 'admins'}
		admins settings
	{/if}
</div>
