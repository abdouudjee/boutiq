<script>
	import Nav from '$lib/nav.svelte';
	import Bluebtn from '$lib/bluebtn.svelte';
	import Card from '$lib/category_card.svelte';
	import Product from '$lib/product.svelte';
	let scrollable;
</script>

<Nav />
<div class="flex h-120 w-full items-center justify-center">
	<div class="flex h-95 w-256 items-center justify-between rounded-3xl bg-[#f4f4f4]">
		<div class="flex h-95 w-128 items-center justify-end">
			<div class="justify- flex h-57 w-112 flex-col items-start gap-7">
				<h1 class="text-5xl font-bold text-[#222]">Your One-Stop Fashion Destination</h1>
				<p class="text-lg font-normal text-[#505050]">
					Discover the perfect blend of elegance and modern fashion—all in one place!
				</p>
				<Bluebtn />
			</div>
		</div>
		<img class="h-95 w-108 object-cover" src="image1.png" alt="" />
	</div>
</div>
<div class="flex h-10 w-full items-center justify-center gap-10">
	<div class="flex h-10 w-256 items-center justify-between">
		<div class="flex h-9 items-center justify-center gap-2">
			<div class="flex h-9 w-9 items-center justify-center">
				<svg
					width="30"
					height="30"
					viewBox="0 0 30 30"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M24.546 5.454L19.242 10.758M24.546 5.454C22.0143 2.92226 18.5804 1.5 15 1.5C11.4196 1.5 7.98574 2.92226 5.454 5.454M24.546 5.454C27.0777 7.98574 28.5 11.4196 28.5 15C28.5 16.7728 28.1508 18.5283 27.4724 20.1662C26.7939 21.8041 25.7996 23.2924 24.546 24.546M19.242 10.758C18.1168 9.63278 16.5913 9 15 9C13.4087 9 11.8832 9.63278 10.758 10.758M19.242 10.758C20.3672 11.8832 21 13.4087 21 15C21 16.5913 20.3672 18.1168 19.242 19.242M19.242 19.242L24.546 24.546M19.242 19.242C18.1168 20.3672 16.5913 21 15 21C13.4087 21 11.8832 20.3672 10.758 19.242M24.546 24.546C23.2924 25.7996 21.8041 26.7939 20.1662 27.4724C18.5283 28.1508 16.7728 28.5 15 28.5C13.2272 28.5 11.4717 28.1508 9.83377 27.4724C8.19588 26.7939 6.70759 25.7996 5.454 24.546M10.758 10.758L5.454 5.454M10.758 10.758C9.63278 11.8832 9 13.4087 9 15C9 16.5913 9.63278 18.1168 10.758 19.242M5.454 5.454C2.92226 7.98574 1.5 11.4196 1.5 15C1.5 16.7728 1.84919 18.5283 2.52763 20.1662C3.20606 21.8041 4.20041 23.2924 5.454 24.546M10.758 19.242L5.454 24.546"
						stroke="#1F66F0"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
			<div class="flex flex-col items-start justify-center gap-0.5">
				<p class="text-base font-medium text-black">Support</p>
				<p class="text-gunmetal text-xs font-normal">Customer Service available 27/4</p>
			</div>
		</div>
		<div class="flex h-9 items-center justify-center gap-2">
			<div class="flex h-9 w-9 items-center justify-center">
				<svg
					width="37"
					height="36"
					viewBox="0 0 37 36"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M18.6666 2.25L5.16663 6.75V20.25C5.16663 27.7066 11.21 33.75 18.6666 33.75C26.1233 33.75 32.1666 27.7066 32.1666 20.25V6.75L18.6666 2.25ZM29.6354 20.25C29.6354 26.3074 24.724 31.2188 18.6666 31.2188C12.6092 31.2188 7.69788 26.3074 7.69788 20.25V8.64844L18.6666 4.78125L29.6354 8.64844V20.25Z"
						fill="#1F66F0"
					/>
					<path
						d="M13.9697 16.7027C13.8524 16.5849 13.713 16.4914 13.5595 16.4276C13.4059 16.3638 13.2413 16.3309 13.075 16.3309C12.9087 16.3309 12.7441 16.3638 12.5905 16.4276C12.437 16.4914 12.2976 16.5849 12.1803 16.7027C12.0624 16.82 11.9689 16.9595 11.9051 17.113C11.8413 17.2666 11.8085 17.4312 11.8085 17.5975C11.8085 17.7637 11.8413 17.9284 11.9051 18.0819C11.9689 18.2355 12.0624 18.3749 12.1803 18.4922L16.7295 23.0414L16.8033 23.1152C16.9143 23.2264 17.0461 23.3146 17.1912 23.3748C17.3362 23.4349 17.4918 23.4659 17.6488 23.4659C17.8059 23.4659 17.9614 23.4349 18.1065 23.3748C18.2516 23.3146 18.3834 23.2264 18.4943 23.1152L26.3518 15.2578C26.4629 15.1469 26.5511 15.0151 26.6113 14.87C26.6715 14.7249 26.7024 14.5694 26.7024 14.4123C26.7024 14.2552 26.6715 14.0997 26.6113 13.9546C26.5511 13.8095 26.4629 13.6778 26.3518 13.5668L26.2533 13.4684C26.1424 13.3572 26.0106 13.269 25.8655 13.2088C25.7204 13.1486 25.5649 13.1177 25.4078 13.1177C25.2507 13.1177 25.0952 13.1486 24.9501 13.2088C24.8051 13.269 24.6733 13.3572 24.5623 13.4684L17.6471 20.3801L13.9697 16.7027Z"
						fill="#1F66F0"
					/>
				</svg>
			</div>
			<div class="flex flex-col items-start justify-center gap-0.5">
				<p class="text-base font-medium text-black">Secure</p>
				<p class="text-gunmetal text-xs font-normal">Certificated marketplace since 2024</p>
			</div>
		</div>
		<div class="flex h-9 items-center justify-center gap-2">
			<div class="flex h-9 w-9 items-center justify-center">
				<svg
					width="37"
					height="36"
					viewBox="0 0 37 36"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M18.3333 4.5L30.3333 11.25V24.75L18.3333 31.5L6.33325 24.75V11.25L18.3333 4.5Z"
						stroke="#1F66F0"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M18.3333 18L30.3333 11.25"
						stroke="#1F66F0"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M18.3333 18V31.5"
						stroke="#1F66F0"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M18.3333 18L6.33325 11.25"
						stroke="#1F66F0"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M24.3333 7.875L12.3333 14.625"
						stroke="#1F66F0"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
			<div class="flex flex-col items-start justify-center gap-0.5">
				<p class="text-base font-medium text-black">Shipping</p>
				<p class="text-gunmetal text-xs font-normal">Free, Fast and available 58 stats</p>
			</div>
		</div>
		<div class="flex h-9 items-center justify-center gap-2">
			<div class="flex h-9 w-9 items-center justify-center">
				<svg
					width="28"
					height="30"
					viewBox="0 0 28 30"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M20 19.5V18C20 16.4087 19.3679 14.8826 18.2426 13.7574C17.1174 12.6321 15.5913 12 14 12H8M8 12L12.5 16.5M8 12L12.5 7.5M26 28.5V4.5C26 3.70435 25.6839 2.94129 25.1213 2.37868C24.5587 1.81607 23.7956 1.5 23 1.5H5C4.20435 1.5 3.44129 1.81607 2.87868 2.37868C2.31607 2.94129 2 3.70435 2 4.5V28.5L8 25.5L14 28.5L20 25.5L26 28.5Z"
						stroke="#1F66F0"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
			<div class="flex flex-col items-start justify-center gap-0.5">
				<p class="text-base font-medium text-black">Transparent</p>
				<p class="text-gunmetal text-xs font-normal">Hassle-Free Return Policy</p>
			</div>
		</div>
	</div>
</div>
<div class="flex h-88.5 w-full flex-col items-center justify-center gap-10">
	<div class="flex h-9 w-256 items-center justify-start">
		<p class="text-3xl font-bold text-black">Our categories</p>
	</div>
	<div class="flex h-50 w-256 items-center gap-6">
		<Card />
		<Card />
		<Card />
		<Card />
		<Card />
		<Card />
	</div>
</div>
<div class="mb-5 flex h-fit w-full flex-col items-center justify-center gap-5">
	<div class="flex h-9 w-256 items-center justify-between">
		<p class="text-3xl font-bold text-black">Featured Products</p>
		<div class="flex h-4.5 w-18 items-center justify-between">
			<a href="/" class="text-blue">View all</a>
			<div class="flex h-4 w-4 items-center justify-center">
				<svg
					width="6"
					height="11"
					viewBox="0 0 6 10"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M0.75 10L5.25 5.5L0.75 1"
						stroke="#1F66F0"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
		</div>
	</div>
	<div
		class="relative mb-3 flex h-90 w-256 items-center justify-between pb-2 after:absolute after:bottom-0 after:left-2/10 after:h-1 after:w-6/10 after:border-b-2 after:border-b-[#d9d9d9] after:content-['']"
	>
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<div class="flex h-10 w-10 items-center justify-start">
			<button
				class="flex h-6 w-6 items-center justify-center rounded-full border-1 border-[#535557] bg-[#f8f8f8] hover:bg-[rgba(0,0,0,0.2)]"
				onclick={() => scrollable.scrollBy({ left: -194, behavior: 'smooth' })}
				><svg
					width="6"
					height="10"
					viewBox="0 0 6 10"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M5.09375 8.9375L1.15625 5L5.09375 1.0625"
						stroke="#535557"
						stroke-width="1.25"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>
		<div
			bind:this={scrollable}
			class="scrollbar-hide flex h-90 w-250 items-center gap-2 overflow-x-auto px-2 whitespace-nowrap"
			style="scrollbar-width: none;"
		>
			<Product />
			<Product />
			<Product />
			<Product />
			<Product />
			<Product />
			<Product />
			<Product />
			<Product />
			<Product />
			<Product />
		</div>
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<div class="flex h-10 w-10 items-center justify-end">
			<button
				class="flex h-6 w-6 items-center justify-center rounded-full border-1 border-[#535557] bg-[#f8f8f8] hover:bg-[rgba(0,0,0,0.2)]"
				onclick={() => {
					scrollable.scrollBy({ left: 194, behavior: 'smooth' });
				}}
				><svg
					width="6"
					height="10"
					viewBox="0 0 6 10"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M0.90625 8.9375L4.84375 5L0.90625 1.0625"
						stroke="#535557"
						stroke-width="1.25"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>
	</div>
</div>

<dir class="flex w-full items-center justify-center">
	<div
		class="relative mb-10 flex w-256 items-center justify-center gap-5 pb-10 after:absolute after:bottom-0 after:left-2/10 after:h-1 after:w-6/10 after:border-b-2 after:border-b-[#d9d9d9] after:pb-5 after:content-['']"
	>
		<div class="flex h-60 w-130 items-center justify-between rounded-2xl bg-[#F4F4F4]">
			<div class="flex h-45 w-50 flex-col items-start justify-center gap-2 pl-5">
				<p class=" text-2xl leading-7 font-bold text-[#222222]">Free Shipping Everywhere</p>
				<p class="text-sm text-[#222222]">
					Free, fast, and available to 58 states, what are you waiting for?
				</p>
				<div><Bluebtn /></div>
			</div>
			<img src="image.png" class="h-60 w-60 object-cover" alt="" />
		</div>
		<div class="flex h-60 w-130 items-center justify-between rounded-2xl bg-[#F4F4F4]">
			<div class="flex h-45 w-50 flex-col items-start justify-center gap-2 pl-5">
				<p class=" text-2xl leading-7 font-bold text-[#222222]">What is boutiq?</p>
				<p class="text-sm text-[#222222]">
					We are a fashion marketplace that connects you with the best brands and products.
				</p>
				<div><Bluebtn content={"About us"} /></div>
			</div>
			<img src="image.png" class="h-60 w-60 object-cover" alt="" />
		</div>
	</div>
</dir>
