<script>
	let { question = '', answer = '' } = $props();
	let content = $state();
	let open = $state(false);
	function toggleAccordion() {
		if (content.style.maxHeight && content.style.maxHeight !== '0px') {
			content.style.maxHeight = '0';
			open = !open;
		} else {
			content.style.maxHeight = content.scrollHeight + 'px';
			open = !open;
		}
	}
</script>

<div class="w-125 rounded-lg border-b border-slate-200 bg-white px-6">
	<button
		onclick={() => {
			toggleAccordion();
		}}
		class="flex h-16 w-full cursor-pointer items-center justify-between py-6 text-slate-800"
	>
		<span class="text-left text-lg font-medium text-wrap text-black">{question}</span>
		<span class="text-slate-800 transition-transform duration-300">
			{#if open}
				<svg
					width="34"
					height="35"
					viewBox="0 0 34 35"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10 18L22.5 17.9922V18"
						stroke="#1E1E1E"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			{:else}
				<svg
					width="34"
					height="35"
					viewBox="0 0 34 35"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10 18L22.5 17.9922V18"
						stroke="#1E1E1E"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M16.2539 24.2461L16.2461 11.7461H16.2539"
						stroke="#1E1E1E"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>{/if}
		</span>
	</button>
	<div bind:this={content} class="max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
		<div class="pb-5 text-base text-wrap text-gray-700">
			{answer}
		</div>
	</div>
</div>
