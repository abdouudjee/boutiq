<div class="bg-smoke flex h-15 w-full items-center border-b-2 border-b-[#c3c0c0] pl-20">
	<p class="flex items-center gap-3 font-medium text-[#505050]">
		<span class="cursor-pointer hover:text-[#1f66f0]">Home</span> &#10095;
		<span class="text-wrap overflow-ellipsis text-[#1e1e1e]">Shopping cart</span>
	</p>
</div>

<div class="bg-smoke flex flex-col gap-2 py-10 pl-20">
	<p class="text-3xl font-bold text-black">Shopping cart</p>
	<p class="text-lg font-medium text-gray-400">Review your items and proceed to checkout</p>
</div>
<div class="flex flex-wrap lg:flex-nowrap">
	<!-- Cart elements -->
	<div class="flex w-full flex-col p-4">
		<table
			cellspacing="0"
			class="mb-3 w-full border-separate rounded-t-2xl border-2 border-b-0 border-gray-300 bg-white text-left"
		>
			<thead class="border-separate rounded-t-2xl">
				<tr class="rounded-t-2xl border-b-1 border-b-gray-300">
					<th class="w-10 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2">product</th>
					<th class="border-b-2 border-b-gray-300 px-4 py-2"> </th>
					<th class="w-30 border-b-2 border-b-gray-300 px-4 py-2 text-left">Price</th>
					<th class="w-20 rounded-t-2xl border-b-2 border-b-gray-300 px-4 py-2"></th>
				</tr>
			</thead>
			<tbody class="">
				<tr>
					<td class="border-b-2 border-b-gray-300 p-1">
						<img
							src="/placeholder.svg"
							alt=""
							class="size-20 rounded-lg border-1 border-gray-200 object-cover object-center"
						/></td
					>
					<td class="h-full gap-4 border-b-2 border-b-gray-300 p-3 align-top">
						<p class="text-lg font-medium">pair of poor designed jeans</p>
						<p class="text-wrap text-gray-700">color: blue, size: M, brand: zara</p>
					</td>
					<td class="w-30 border-b-2 border-b-gray-300 px-4">9999 DZD</td>
					<td class="border-b-2 border-b-gray-300 p-1">
						<div class="flex items-center justify-center gap-2 px-2">
							<!-- svelte-ignore a11y_consider_explicit_label -->
							<button
								class="flex items-center justify-center rounded-lg p-1 hover:cursor-pointer hover:bg-gray-100"
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
									class="lucide lucide-external-link-icon lucide-external-link"
									><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path
										d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
									/></svg
								></button
							>
							<!-- svelte-ignore a11y_consider_explicit_label -->
							<button
								class="flex items-center justify-center rounded-lg p-1 hover:cursor-pointer hover:bg-gray-100"
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
									class="lucide lucide-heart-icon lucide-heart"
									><path
										d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
									/></svg
								></button
							>
							<!-- svelte-ignore a11y_consider_explicit_label -->
							<button
								class="flex items-center justify-center rounded-lg p-1 hover:cursor-pointer hover:bg-gray-100"
								><svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="lucide lucide-trash-icon lucide-trash"
									><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path
										d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
									/></svg
								></button
							>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="flex items-center font-medium justify-end gap-2 text-lg">
			<button
				class="flex cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 hover:bg-gray-200"
				>Continue Shopping</button
			>
			<button
				class="flex cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 hover:bg-gray-200"
				>Clear cart</button
			>
		</div>
	</div>
	<div class="w-full p-4">
		<!-- the form -->
		<div class="h-full w-full rounded-xl border-2 border-gray-300 text-lg font-medium">
			<!-- title -->
			<p class="p-2 text-2xl font-medium">shipping info</p>
			<!-- address -->
			<div class="flex w-full flex-col px-2 py-1">
				<label for="">Address</label>
				<input
					type="text"
					name=""
					id=""
					placeholder="enter you address"
					class="w-full rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none"
				/>
			</div>
			<!-- wilaia and postal code -->
			<div class="flex w-full items-center gap-3 px-2 py-1">
				<div class="flex w-full flex-col">
					<!-- replace with dropdown -->
					<label for="">Wilaia</label>
					<input
						type="text"
						name=""
						id=""
						placeholder="Choose your wilaia"
						class="w-full rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none"
					/>
				</div>
				<div class="flex w-full flex-col">
					<label for="">Postal Code</label>
					<input
						type="text"
						name=""
						id=""
						placeholder="Enter your postal code"
						class="w-full rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none"
					/>
				</div>
			</div>
			<!-- phone number and shipping company -->
			<div class="flex w-full items-center gap-3 px-2 py-1">
				<div class="flex w-full flex-col">
					<label for="">phone number</label>
					<input
						type="number"
						name=""
						id=""
						placeholder="enter you phone number"
						class="w-full rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none"
					/>
				</div>
				<!-- replace with dropdown -->
				<div class="flex w-full flex-col">
					<label for="">Shipping with</label>
					<input
						type="text"
						name=""
						id=""
						placeholder="choose a shipping company"
						class="w-full rounded-md border-2 border-gray-300 px-2 py-1.5 ring-gray-500 focus:border-gray-400 focus:ring-2 focus:outline-none"
					/>
				</div>
			</div>
			<!--submit and cancel buttons  -->
			<div class="flex items-center justify-between">
				<p class="px-2 text-2xl font-medium">
					Total: 100040 <span class=" text-lg font-medium text-gray-700"> Dzd</span>
				</p>

				<div class="flex items-center justify-end gap-3 px-2 py-2">
					<button
						class="flex cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 text-lg font-medium hover:bg-gray-200"
						>cancel</button
					>
					<button
						class="flex items-center justify-center rounded-lg border-2 border-black bg-black px-4 py-2 text-lg font-medium text-white"
					>
						submit
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		margin: 0;
	}
</style>
