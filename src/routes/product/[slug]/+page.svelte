<div class="bg-smoke flex h-15 w-full items-center pl-20">
	<p class="flex items-center gap-3 font-medium text-[#505050]">
		<span class="cursor-pointer hover:text-[#1f66f0]">Home</span> &#10095;
		<span class="cursor-pointer hover:text-[#1f66f0]">Jeans</span>
		&#10095;
		<span class="text-wrap overflow-ellipsis text-[#1e1e1e]">some crappy name for the product</span>
	</p>
</div>
<main class="flex flex-wrap items-start justify-center gap-5 px-5 py-10">
	<div class="flex items-start gap-3">
		<!-- variants imgs -->
		<div class="flex h-127 flex-col items-center gap-2 overflow-scroll">
			<img src="/placeholder.svg" alt="" class="h-30 w-30 rounded-lg border-2 border-[#1f66f0]" />
			<img src="/placeholder.svg" alt="" class="h-30 w-30 rounded-lg border-2 border-gray-300" />
			<img src="/placeholder.svg" alt="" class="h-30 w-30 rounded-lg border-2 border-gray-300" />
			<img src="/placeholder.svg" alt="" class="h-30 w-30 rounded-lg border-2 border-gray-300" />
			<img src="/placeholder.svg" alt="" class="h-30 w-30 rounded-lg border-2 border-gray-300" />
		</div>
		<!-- product images -->
		<div class="grid w-126 grid-cols-3 grid-rows-3 gap-0.5">
			<img
				src={'/placeholder.svg'}
				alt=""
				class="border-smoke col-span-2 row-span-2 h-full w-full rounded-xl border-2 bg-white"
			/>
			<img
				src={'/placeholder.svg'}
				alt=""
				class="h-full w-full rounded-lg border-2 border-gray-200 object-cover"
			/>
			<img
				src={'/placeholder.svg'}
				alt=""
				class="h-full w-full rounded-lg border-2 border-gray-200 object-cover"
			/>
			<img
				src={'/placeholder.svg'}
				alt=""
				class="h-full w-full rounded-lg border-2 border-gray-200 object-cover"
			/>
			<img
				src={'/placeholder.svg'}
				alt=""
				class="h-full w-full rounded-lg border-2 border-gray-200 object-cover"
			/>
			<img
				src={'/placeholder.svg'}
				alt=""
				class="h-full w-full rounded-lg border-2 border-gray-200 object-cover"
			/>
		</div>
	</div>
	<!-- product infos -->
	<div class="flex flex-col items-start gap-3 xl:w-1/2">
		<!--basic info -->
		<div class="flex flex-col items-start gap-3">
			<p class="text-3xl font-semibold text-black">some crappy name for the product</p>
			<div class="flex items-center gap-4">
				<div class="flex items-center justify-start gap-1">
					<!-- rating -->
					<div class="flex h-3 items-center justify-center">
						<img src="/stars/full.svg" alt="" class="h-4" />
						<img src="/stars/full.svg" alt="" class="h-4" />
						<img src="/stars/full.svg" alt="" class="h-4" />
						<img src="/stars/full.svg" alt="" class="h-4" />
						<img src="/stars/empty.svg" alt="" class="h-4" />
					</div>
					<!-- rating count -->
					<span class="text-[12px] text-[#878787]">(100 reviews)</span>
				</div>
				<!-- share product -->
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button class="h-fit w-fit cursor-pointer rounded-full p-1 hover:bg-gray-100">
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
						class="size-5 text-[#505050]"
						><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle
							cx="18"
							cy="19"
							r="3"
						></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line
							x1="15.41"
							x2="8.59"
							y1="6.51"
							y2="10.49"
						></line></svg
					>
				</button>
				<!-- add to fav -->
				<button
					class="relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white active:scale-90"
				>
					<img
						src="/favorite/removed.svg"
						alt=""
						class="absolute top-[55%] left-[50%] size-5 -translate-x-1/2 -translate-y-1/2 transform"
					/>
				</button>
			</div>
			<!-- price -->
			<p class="text-3xl font-medium">15555.00 Dzd</p>
			<!-- tags -->
			<div class="flex items-center gap-3">
				<div class="flex items-center justify-center rounded-full bg-[#E5EEFF] px-2 py-1">
					<p class="text-sm font-medium text-[#1F66F0]">In stock</p>
				</div>

				<div class="flex items-center justify-center rounded-full bg-[#E5EEFF] px-2 py-1">
					<p class="text-sm font-medium text-[#1F66F0]">Free shipping</p>
				</div>
			</div>
		</div>
		<!-- line -->
		<div class="h-0.5 w-full rounded-full bg-gray-300"></div>
		<!-- description -->
		<div>
			<p class="max-w-200 text-justify text-slate-600">
				High quality jeans with ... Lorem ipsum dolor sit, amet consectetur adipisicing elit.
				Cupiditate similique reprehenderit, voluptatibus reiciendis nisi nulla ab voluptates
				temporibus tempora sequi corrupti! A, ad culpa minima quos illo optio omnis repudiandae.
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit voluptas expedita tempore
				rerum eum? Architecto, quis possimus quaerat ipsa a mollitia eveniet eaque repellendus
				consequatur nam exercitationem, modi officiis. Ipsum.
			</p>
		</div>
		<!-- line -->
		<div class="h-0.5 w-full rounded-full bg-gray-300"></div>
		<!-- selected values -->
		<div class="flex flex-wrap items-start gap-5">
			<!-- radio group for each field -->
			{#each [1, 2, 3]}
				<!-- radio group div  -->
				<div class="flex flex-col items-start gap-3">
					<p class="text-xl font-medium">Color :</p>
					<div class="flex items-center gap-5">
						<!-- choice -->
						<div class="flex items-center gap-2 rounded-xl border-2 border-gray-300 p-2">
							<input
								type="radio"
								name="color"
								value="black"
								class="cursor-pointer ring-0 outline-0"
							/>
							<span>Black</span>
						</div>
						<div class="flex items-center gap-2 rounded-xl border-2 border-gray-300 p-2">
							<input
								type="radio"
								name="color"
								value="red"
								class="cursor-pointer ring-0 outline-0"
							/>
							<span>Red</span>
						</div>
						<div class="flex items-center gap-2 rounded-xl border-2 border-gray-300 p-2">
							<input
								type="radio"
								name="color"
								value="purple"
								class="cursor-pointer ring-0 outline-0"
							/>
							<span>Purple</span>
						</div>
						<div class="flex items-center gap-2 rounded-xl border-2 border-gray-300 p-2">
							<input
								type="radio"
								name="color"
								value="purple"
								class="cursor-pointer ring-0 outline-0"
							/>
							<span>Purple</span>
						</div>
						<div class="flex items-center gap-2 rounded-xl border-2 border-gray-300 p-2">
							<input
								type="radio"
								name="color"
								value="purple"
								class="cursor-pointer ring-0 outline-0"
							/>
							<span>Purple</span>
						</div>
						<div class="flex items-center gap-2 rounded-xl border-2 border-gray-300 p-2">
							<input
								type="radio"
								name="color"
								value="purple"
								class="cursor-pointer ring-0 outline-0"
							/>
							<span>Purple</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<!-- add to cart , wishlist buttons -->
		<div class="flex-row items-center gap-3 py-2">
			<button
				class="ring-offset-background focus-visible:ring-ring [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 inline-flex h-13 cursor-pointer items-center justify-center gap-2 rounded-md bg-[#1f66f0] px-4 py-2 font-medium whitespace-nowrap text-white transition-colors hover:bg-[#1f66f0]/90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95 disabled:pointer-events-none disabled:opacity-50"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="white"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="size-5"
					><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path
						d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
					></path></svg
				>Add to Cart</button
			>
			<button
				class="ring-offset-background focus-visible:ring-ring [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border-input bg-background hover:bg-accent inline-flex h-13 items-center justify-center gap-2 rounded-md border px-4 py-2 font-medium whitespace-nowrap text-[#1f66f0] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
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
					class="size-5"
					><path
						d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
					></path></svg
				>Add to Wishlist</button
			>
		</div>
	</div>
</main>
<!-- cart counting -->
<button
	class="fixed scale-80 right-5 bottom-5 flex size-20 cursor-pointer items-center justify-center rounded-full bg-[#1f66f0] active:scale-75"
>
	<div class="relative h-fit w-fit">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="white"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="size-13"
		>
			<circle cx="8" cy="21" r="1" fill="white"></circle>
			<circle cx="19" cy="21" r="1" fill="white"></circle>
			<path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12">
			</path></svg
		>
		<span class="absolute top-3.5 left-4.5 w-6 text-center font-medium text-white">0</span>
	</div>
</button>
