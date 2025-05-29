<script>
	import Nav from '$lib/nav.svelte';
	import Bluebtn from '$lib/bluebtn.svelte';
	import Card from '$lib/category_card.svelte';
	import Product from '$lib/product.svelte';
	import Accordion from '$lib/ui/accordion.svelte';
	import Category from '$lib/rows/category.svelte';
	import { supabase } from '$lib/index.js';
	import { error } from '@sveltejs/kit';
	let { data } = $props();
	// fetching categories
	let categories = $state();
	$effect(async () => {
		const { data, error } = await supabase.from('categories').select('id,name,image_url');
		categories = data.slice(0, 6);
	});
	// fetching products
	let products = $state();
	$effect(async () => {
		const { data, error } = await supabase
			.from('products')
			.select('name,selling_price,discount,img_url');
		products = data;
	});
	let scrollable;
</script>

<Nav userdata={data.user ?? null} />
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
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-truck size-9 text-[#1f66f0]"
					><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path
						d="M15 18H9"
					></path><path
						d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"
					></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg
				>
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
	<div class="flex h-9 w-256 items-center justify-between">
		<p class="text-3xl font-bold text-black">Our categories</p>
		<a href="/categories" class="text-blue">see all...</a>
	</div>
	<div class="flex h-50 w-256 items-center gap-6">
		{#each categories as category}
			<Card name={category.name} img_url={category.image_url} id={category.id} />
		{/each}
	</div>
</div>
<div class="mb-5 flex h-fit w-full flex-col items-center justify-center gap-5">
	<div class="flex h-9 w-256 items-center justify-between">
		<p class="text-3xl font-bold text-black">Featured Products</p>
		<div class="flex h-4.5 w-fit items-center justify-between gap-2 px-2">
			<a href="/" class="text-blue text-nowrap">View all</a>
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
				class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-1 border-[#535557] bg-[#f8f8f8] hover:bg-[rgba(0,0,0,0.2)]"
				onclick={() => scrollable.scrollBy({ left: -250, behavior: 'smooth' })}
			>
				<svg width="6" height="10" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg">
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
			{#each products as product}
				{#if product.discount > 0}
					<Product
						name={product.name}
						price={product.selling_price}
						img_url={product.img_url[0]}
						discount={product.discount}
					/>
				{/if}
			{/each}
		</div>
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<div class="flex h-10 w-10 items-center justify-end">
			<button
				class="flex h-6 w-6 rotate-180 items-center justify-center rounded-full border-1 border-[#535557] bg-[#f8f8f8] hover:cursor-pointer hover:bg-[rgba(0,0,0,0.2)]"
				onclick={() => {
					scrollable.scrollBy({ left: 250, behavior: 'smooth' });
				}}
			>
				<svg width="6" height="10" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg">
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
	</div>
</div>
<div class="flex w-full items-center justify-center">
	<div
		class="relative mb-10 flex w-256 flex-wrap items-center justify-center gap-5 pb-10 after:absolute after:bottom-0 after:left-2/10 after:h-1 after:w-6/10 after:border-b-2 after:border-b-[#d9d9d9] after:pb-5 after:content-[''] lg:flex-nowrap"
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
				<div><Bluebtn content={'About us'} url={'/about'} /></div>
			</div>
			<img src="image.png" class="h-60 w-60 object-cover" alt="" />
		</div>
	</div>
</div>
<!-- New products section -->
<section></section>
<!-- Frequently asked questions section-->
<section class="flex h-fit w-full flex-col items-center gap-6 bg-[#F8F8F8] px-20 py-20">
	<div class="flex max-w-256 flex-col items-start justify-start gap-6">
		<p class=" text-3xl font-bold text-black">Frequently asked questions</p>
		<div class="flex w-fit flex-wrap items-start justify-start gap-3 py-3 lg:flex-nowrap">
			<div class="flex flex-col items-start justify-start gap-3">
				<Accordion
					question={'Is my payment information secure? some bla bla bla'}
					answer={'yes, 100%.'}
				/>
				<Accordion question={'Is my payment information secure?'} answer={'yes, 100%.'} />
				<Accordion question={'Is my payment information secure?'} answer={'yes, 100%.'} />
			</div>
			<div class="flex flex-col items-start justify-start gap-3">
				<Accordion question={'Is my payment information secure?'} answer={'yes, 100%.'} />
				<Accordion question={'Is my payment information secure?'} answer={'yes, 100%.'} />
				<Accordion question={'Is my payment information secure?'} answer={'yes, 100%.'} />
			</div>
		</div>
	</div>
</section>
<!-- footer section -->
<footer class="flex h-fit w-full flex-col items-center gap-6 bg-white px-20 py-3 pt-12 pb-12">
	<!-- links -->
	<div class="flex h-fit max-w-256 flex-wrap items-start gap-6 lg:w-256 lg:flex-nowrap">
		<div class="flex h-44 w-full flex-col items-start justify-between">
			<div>
				<svg
					width="129"
					height="24"
					viewBox="0 0 129 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M16.8685 9.26548C16.4692 11.3414 15.0968 12.3668 13.5497 12.867L13.2752 12.9171C15.0968 13.2422 16.5441 14.5678 16.0201 17.369C15.2964 21.0456 12.7262 22.4212 9.03312 22.4212H0L3.46852 4.53843H12.0026C15.7206 4.53843 17.4923 6.0891 16.8685 9.26548ZM6.56274 11.7666H9.53219C10.7799 11.7666 11.9776 11.3664 12.302 9.7657C12.5515 8.41511 11.7281 8.21502 10.4804 8.21502H7.26143L6.56274 11.7666ZM6.03871 14.5178L5.21525 18.7446H8.30947C10.181 18.7446 11.3538 18.1944 11.7031 16.3936C12.0026 14.8429 11.254 14.5178 9.38247 14.5178H6.03871Z"
						fill="#1F66F0"
					/>
					<path
						d="M24.6097 22.8214C18.8205 22.8214 16.3252 18.7696 17.3981 13.2422C18.3963 7.98993 22.1892 4.13825 27.7288 4.13825C33.4681 4.13825 36.0383 8.19001 34.9653 13.6924C33.9422 18.9697 30.0994 22.8214 24.6097 22.8214ZM24.8343 19.1448C28.203 19.1448 29.9247 16.4936 30.5735 13.2422C31.1475 10.2659 30.6484 7.81485 27.5292 7.81485C24.1356 7.81485 22.4138 10.466 21.7899 13.6924C21.216 16.6937 21.6901 19.1448 24.8343 19.1448Z"
						fill="#1F66F0"
					/>
					<path
						d="M50.8433 16.0684C49.9699 20.5204 47.5744 22.8214 42.3092 22.8214C36.7945 22.8214 35.0977 20.3203 35.9461 15.8683L38.142 4.53843H42.6336L40.4128 16.0684C39.9386 18.3944 40.6872 19.1448 42.5338 19.1448C44.6299 19.1448 45.9275 18.1944 46.3766 15.8683L48.5725 4.53843H53.0641L50.8433 16.0684Z"
						fill="#1F66F0"
					/>
					<path
						d="M56.2231 22.4212L58.9929 8.21502H53.8026L54.5013 4.53843H69.3485L68.6498 8.21502H63.4845L60.7147 22.4212H56.2231Z"
						fill="#1F66F0"
					/>
					<path
						d="M70.9212 4.53843H75.4128L71.9443 22.4212H67.4527L70.9212 4.53843Z"
						fill="#1F66F0"
					/>
					<path
						d="M91.5134 21.4458L88.7186 23.8718L87.0467 21.8459C85.6743 22.4962 84.1521 22.8214 82.5551 22.8214C76.7659 22.8214 74.2706 18.7696 75.3436 13.2422C76.3417 7.98993 80.1346 4.13825 85.6743 4.13825C91.4135 4.13825 93.9837 8.19001 92.9107 13.6924C92.4616 15.9434 91.5134 18.0443 89.9912 19.645L91.5134 21.4458ZM82.7797 19.1448C83.5033 19.1448 84.0523 19.0447 84.5763 18.8696L82.9044 16.7187L85.6992 14.2927L87.446 16.2935C87.9201 15.4432 88.2694 14.4427 88.519 13.2422C89.0929 10.2659 88.5938 7.81485 85.4746 7.81485C82.081 7.81485 80.3592 10.466 79.7354 13.6924C79.1614 16.6937 79.6356 19.1448 82.7797 19.1448Z"
						fill="#1F66F0"
					/>
					<path
						d="M117.735 21.624C117.735 22.9423 116.68 24 115.365 24C114.049 24 112.984 22.9423 112.984 21.624C112.984 20.3057 114.055 19.2375 115.365 19.2375C116.685 19.2375 117.735 20.3057 117.735 21.624ZM104.536 19.2375C103.221 19.2375 102.165 20.3109 102.165 21.624C102.165 22.937 103.221 24 104.536 24C105.851 24 106.917 22.9423 106.917 21.624C106.917 20.3057 105.851 19.2375 104.536 19.2375ZM119.7 5.16891C103.99 5.16891 99.9871 4.50195 95.7294 0C97.5178 2.69388 98.5003 7.75858 115.125 7.51368C132.452 7.25315 121.884 12 118.806 17.3565C128.512 8.67043 135.41 5.16891 119.7 5.16891Z"
						fill="#1F66F0"
					/>
				</svg>
			</div>
			<div>
				<div class="flex items-center justify-start gap-2">
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.7714 3.53601C9.68869 1.48735 6.31202 1.48735 4.22936 3.53601C2.14669 5.58535 2.14669 8.90734 4.22936 10.956L8.00002 14.666L11.7714 10.956C13.854 8.90734 13.854 5.58535 11.7714 3.53601ZM8.00002 8.99935C7.55469 8.99935 7.13669 8.82601 6.82136 8.51134C6.17136 7.86135 6.17136 6.80401 6.82136 6.15401C7.13602 5.83935 7.55469 5.66601 8.00002 5.66601C8.44536 5.66601 8.86402 5.83935 9.17869 6.15401C9.82869 6.80401 9.82869 7.86201 9.17869 8.51134C8.86402 8.82601 8.44536 8.99935 8.00002 8.99935Z"
							fill="#4B4B4B"
						/>
					</svg>
					<p class="text-sm text-[#505050]">123 Main Street, Tebessa DZ</p>
				</div>
				<div class="flex items-center justify-start gap-2">
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M13.3333 2.66663H2.66665C1.93331 2.66663 1.33998 3.26663 1.33998 3.99996L1.33331 12C1.33331 12.7333 1.93331 13.3333 2.66665 13.3333H13.3333C14.0666 13.3333 14.6666 12.7333 14.6666 12V3.99996C14.6666 3.26663 14.0666 2.66663 13.3333 2.66663ZM13.3333 5.33329L7.99998 8.66663L2.66665 5.33329V3.99996L7.99998 7.33329L13.3333 3.99996V5.33329Z"
							fill="#4B4B4B"
						/>
					</svg>
					<p class="text-sm text-[#505050]">contact@xmahdirz.me</p>
				</div>
				<div class="flex items-center justify-start gap-2">
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M13.658 11.4267L10.948 8.96266C10.8199 8.84623 10.6516 8.78414 10.4785 8.78948C10.3055 8.79483 10.1413 8.86721 10.0207 8.99133L8.42534 10.632C8.04134 10.5587 7.26934 10.318 6.47467 9.52533C5.68001 8.73 5.43934 7.956 5.36801 7.57466L7.00734 5.97866C7.13161 5.85808 7.2041 5.69388 7.20945 5.5208C7.2148 5.34772 7.15259 5.17936 7.03601 5.05133L4.57267 2.342C4.45603 2.21357 4.29392 2.13567 4.12077 2.12484C3.94762 2.11401 3.77707 2.1711 3.64534 2.284L2.19867 3.52466C2.08341 3.64034 2.01462 3.7943 2.00534 3.95733C1.99534 4.124 1.80467 8.072 4.866 11.1347C7.53667 13.8047 10.882 14 11.8033 14C11.938 14 12.0207 13.996 12.0427 13.9947C12.2057 13.9855 12.3596 13.9164 12.4747 13.8007L13.7147 12.3533C13.828 12.222 13.8855 12.0516 13.8749 11.8785C13.8644 11.7053 13.7865 11.5432 13.658 11.4267Z"
							fill="#4B4B4B"
						/>
					</svg>
					<p class="text-sm text-[#505050]">+21366370165</p>
				</div>
			</div>
		</div>
		<div class="flex h-44 w-full items-start justify-between">
			<div class=" flex flex-col gap-3">
				<p class=" font-medium text-[#1E1E1E]">links</p>
				<li class="flex flex-col items-start justify-start gap-1 marker:text-transparent">
					<ul class="text-sm text-[#888888]">Home</ul>
					<ul class="text-sm text-[#888888]">Product</ul>
					<ul class="text-sm text-[#888888]">New Arival</ul>
					<ul class="text-sm text-[#888888]">Promo</ul>
				</li>
			</div>
			<div class=" flex flex-col gap-3">
				<p class=" font-medium text-[#1E1E1E]">Categories</p>
				<li class="flex flex-col items-start justify-start gap-1 marker:text-transparent">
					<ul class="text-sm text-[#888888]">Shoes</ul>
					<ul class="text-sm text-[#888888]">Jeans</ul>
					<ul class="text-sm text-[#888888]">Bags</ul>
					<ul class="text-sm text-[#888888]">Accessories</ul>
					<ul class="text-sm text-[#888888]">Luxury</ul>
					<ul class="text-sm text-[#888888]">Watches</ul>
				</li>
			</div>
			<div class=" flex flex-col gap-3">
				<p class=" font-medium text-[#1E1E1E]">Support</p>
				<li class="flex flex-col items-start justify-start gap-1 marker:text-transparent">
					<ul class="text-sm text-[#888888]">Help Center</ul>
					<ul class="text-sm text-[#888888]">Contact Us</ul>
					<ul class="text-sm text-[#888888]">Privacy Police</ul>
					<ul class="text-sm text-[#888888]">Terms of Use</ul>
					<ul class="text-sm text-[#888888]">Refund Police</ul>
				</li>
			</div>
		</div>
	</div>
	<!-- payment methods -->
	<div class="flex items-center gap-3">
		<div
			class="flex h-8.5 w-14 items-center justify-center overflow-hidden rounded-lg border-1 border-[#1E1E1E]"
		>
			<svg class="size-10" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0,0,256,270">
				<g
					fill="none"
					fill-rule="nonzero"
					stroke="none"
					stroke-width="1"
					stroke-linecap="butt"
					stroke-linejoin="miter"
					stroke-miterlimit="10"
					stroke-dasharray=""
					stroke-dashoffset="0"
					font-family="none"
					font-weight="none"
					font-size="none"
					text-anchor="none"
					style="mix-blend-mode: normal"
					><g transform="scale(2.13333,2.13333)"
						><rect x="7" y="96" width="106" height="4" fill="#ffffff" opacity="0.35"></rect><rect
							x="7"
							y="24"
							width="106"
							height="72"
							fill="#ffffff"
						></rect><path
							d="M77,39c-6.567,0 -12.539,2.535 -17,6.676c-4.461,-4.141 -10.433,-6.676 -17,-6.676c-13.807,0 -25,11.193 -25,25c0,13.807 11.193,25 25,25c6.567,0 12.539,-2.535 17,-6.676c4.461,4.141 10.433,6.676 17,6.676c13.807,0 25,-11.193 25,-25c0,-13.807 -11.193,-25 -25,-25z"
							fill="#ffffff"
							opacity="0.35"
						></path><path
							d="M52,60c0,-7.24 3.081,-13.758 8,-18.324c-4.461,-4.141 -10.433,-6.676 -17,-6.676c-13.807,0 -25,11.193 -25,25c0,13.807 11.193,25 25,25c6.567,0 12.539,-2.535 17,-6.676c-4.919,-4.566 -8,-11.084 -8,-18.324z"
							fill="#ff1200"
						></path><path
							d="M77,35c-6.567,0 -12.539,2.535 -17,6.676c4.919,4.566 8,11.084 8,18.324c0,7.24 -3.081,13.758 -8,18.324c4.461,4.141 10.433,6.676 17,6.676c13.807,0 25,-11.193 25,-25c0,-13.807 -11.193,-25 -25,-25z"
							fill="#ffc400"
						></path><path
							d="M68,60c0,-7.24 -3.081,-13.758 -8,-18.324c-4.919,4.566 -8,11.084 -8,18.324c0,7.24 3.081,13.758 8,18.324c4.919,-4.566 8,-11.084 8,-18.324z"
							fill="#ff7500"
						></path></g
					></g
				>
			</svg>
		</div>
		<div
			class="flex h-8.5 w-14 items-center justify-center overflow-hidden rounded-lg border-1 border-[#1E1E1E] bg-white"
		>
			<svg
				class="size-40"
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				width="100"
				height="100"
				viewBox="0,0,256,256"
			>
				<defs
					><radialGradient
						cx="32"
						cy="31.5"
						r="31.259"
						gradientUnits="userSpaceOnUse"
						id="color-1_ugDgmU0qYRe3_gr1"
						><stop offset="0" stop-color="#ffffff"></stop><stop offset="0.35" stop-color="#ffffff"
						></stop><stop offset="0.907" stop-color="#ffffff"></stop><stop
							offset="1"
							stop-color="#ffffff"
						></stop></radialGradient
					><linearGradient
						x1="32"
						y1="59.085"
						x2="32"
						y2="2.012"
						gradientUnits="userSpaceOnUse"
						id="color-2_ugDgmU0qYRe3_gr2"
						><stop offset="0" stop-color="#ffffff"></stop><stop offset="0.085" stop-color="#ffffff"
						></stop><stop offset="0.606" stop-color="#ffffff"></stop><stop
							offset="1"
							stop-color="#ffffff"
						></stop></linearGradient
					><linearGradient
						x1="36.372"
						y1="12.106"
						x2="36.372"
						y2="73.12"
						gradientUnits="userSpaceOnUse"
						id="color-3_ugDgmU0qYRe3_gr3"
						><stop offset="0" stop-color="#ffffff"></stop><stop offset="1" stop-color="#ffffff"
						></stop></linearGradient
					><linearGradient
						x1="43.998"
						y1="32.702"
						x2="43.998"
						y2="45.509"
						gradientUnits="userSpaceOnUse"
						id="color-4_ugDgmU0qYRe3_gr4"
						><stop offset="0" stop-color="#ffffff"></stop><stop offset="1" stop-color="#ffffff"
						></stop></linearGradient
					><linearGradient
						x1="18"
						y1="-8.506"
						x2="18"
						y2="43.928"
						gradientUnits="userSpaceOnUse"
						id="color-5_ugDgmU0qYRe3_gr5"
						><stop offset="0" stop-color="#ffffff"></stop><stop offset="1" stop-color="#ffffff"
						></stop></linearGradient
					></defs
				><g
					fill="none"
					fill-rule="nonzero"
					stroke="none"
					stroke-width="1"
					stroke-linecap="butt"
					stroke-linejoin="miter"
					stroke-miterlimit="10"
					stroke-dasharray=""
					stroke-dashoffset="0"
					font-family="none"
					font-weight="none"
					font-size="none"
					text-anchor="none"
					style="mix-blend-mode: normal"
					><g transform="scale(4,4)"
						><path
							d="M58,54c-1.105,0 -2,-0.895 -2,-2c0,-1.105 0.895,-2 2,-2h2.5c1.925,0 3.5,-1.575 3.5,-3.5c0,-1.925 -1.575,-3.5 -3.5,-3.5h-10.5c-1.381,0 -2.5,-1.119 -2.5,-2.5c0,-1.381 1.119,-2.5 2.5,-2.5h8c1.65,0 3,-1.35 3,-3c0,-1.65 -1.35,-3 -3,-3h-16v-6h18c2.335,0 4.22,-2.028 3.979,-4.41c-0.209,-2.076 -2.082,-3.59 -4.168,-3.59h-1.811c-1.105,0 -2,-0.895 -2,-2c0,-1.105 0.895,-2 2,-2h0.357c1.308,0 2.499,-0.941 2.63,-2.242c0.15,-1.497 -1.021,-2.758 -2.487,-2.758h-14c-0.828,0 -1.5,-0.672 -1.5,-1.5c0,-0.828 0.672,-1.5 1.5,-1.5h3.857c1.308,0 2.499,-0.941 2.63,-2.242c0.15,-1.497 -1.021,-2.758 -2.487,-2.758h-32.857c-1.308,0 -2.499,0.941 -2.63,2.242c-0.15,1.497 1.021,2.758 2.487,2.758h3.5c1.105,0 2,0.895 2,2c0,1.105 -0.895,2 -2,2h-12.811c-2.086,0 -3.958,1.514 -4.168,3.59c-0.241,2.382 1.644,4.41 3.979,4.41h2.5c1.933,0 3.5,1.567 3.5,3.5c0,1.933 -1.567,3.5 -3.5,3.5h-3.311c-2.086,0 -3.958,1.514 -4.168,3.59c-0.241,2.382 1.644,4.41 3.979,4.41h17v11h-16c-1.65,0 -3,1.35 -3,3c0,1.65 1.35,3 3,3v0c1.105,0 2,0.895 2,2c0,1.105 -0.895,2 -2,2h-1.811c-2.086,0 -3.958,1.514 -4.168,3.59c-0.241,2.382 1.644,4.41 3.979,4.41h53.811c2.086,0 3.958,-1.514 4.168,-3.59c0.241,-2.382 -1.644,-4.41 -3.979,-4.41z"
							fill="url(#color-1_ugDgmU0qYRe3_gr1)"
						></path><path
							d="M50,12h-36c-2.209,0 -4,1.791 -4,4v36c0,2.209 1.791,4 4,4h36c2.209,0 4,-1.791 4,-4v-36c0,-2.209 -1.791,-4 -4,-4z"
							fill="url(#color-2_ugDgmU0qYRe3_gr2)"
						></path><path
							d="M49.979,12h-14.969l-16.266,44h31.235c2.221,0 4.021,-1.8 4.021,-4.021v-35.958c0,-2.221 -1.8,-4.021 -4.021,-4.021z"
							fill="url(#color-3_ugDgmU0qYRe3_gr3)"
						></path><path
							d="M42.985,43c-0.719,0 -1.425,0.363 -1.743,1.009c-0.744,1.514 0.343,2.991 1.758,2.991c0.55,0 1.05,0.22 1.41,0.59c0.37,0.36 0.59,0.86 0.59,1.41c0,0.55 -0.22,1.05 -0.59,1.41c-0.36,0.37 -0.86,0.59 -1.41,0.59h-6.495c-0.991,0 -1.942,0.559 -2.307,1.48c-0.717,1.808 0.589,3.52 2.302,3.52h13.543c2.185,0 3.957,-1.772 3.957,-3.957v-9.043z"
							fill="url(#color-4_ugDgmU0qYRe3_gr4)"
						></path><path
							d="M32.416,33.839v4.113h-1.305v-10.156h3.46c0.834,-0.017 1.641,0.299 2.241,0.879c0.607,0.546 0.948,1.327 0.936,2.143c0.017,0.821 -0.324,1.608 -0.936,2.156c-0.605,0.577 -1.352,0.865 -2.241,0.865l-2.155,0zM32.416,29.046v3.545h2.188c0.485,0.014 0.954,-0.176 1.291,-0.525c0.685,-0.666 0.701,-1.762 0.034,-2.448c-0.011,-0.012 -0.023,-0.023 -0.034,-0.034c-0.333,-0.356 -0.803,-0.553 -1.291,-0.539l-2.188,0.001z"
							fill="#000000"
						></path><path
							d="M40.754,30.776c0.964,0 1.725,0.258 2.284,0.773c0.558,0.515 0.837,1.222 0.836,2.12v4.283h-1.248v-0.964h-0.056c-0.54,0.794 -1.259,1.191 -2.156,1.191c-0.766,0 -1.406,-0.227 -1.921,-0.681c-0.501,-0.422 -0.785,-1.047 -0.773,-1.702c0,-0.719 0.272,-1.291 0.815,-1.716c0.543,-0.425 1.269,-0.637 2.177,-0.639c0.775,0 1.413,0.142 1.914,0.425v-0.298c0.003,-0.446 -0.195,-0.87 -0.539,-1.155c-0.345,-0.311 -0.795,-0.481 -1.259,-0.476c-0.729,0 -1.305,0.307 -1.73,0.922l-1.149,-0.724c0.631,-0.905 1.567,-1.359 2.805,-1.359zM39.066,35.825c-0.002,0.337 0.159,0.654 0.433,0.851c0.289,0.227 0.647,0.347 1.014,0.34c0.551,-0.001 1.078,-0.22 1.468,-0.609c0.432,-0.407 0.648,-0.884 0.648,-1.432c-0.407,-0.324 -0.974,-0.486 -1.702,-0.486c-0.53,0 -0.972,0.128 -1.326,0.383c-0.357,0.259 -0.535,0.574 -0.535,0.953z"
							fill="#000000"
						></path><path
							d="M51.038,31.003l-4.356,10.012h-1.347l1.617,-3.503l-2.865,-6.509h1.418l2.07,4.992h0.028l2.014,-4.992z"
							fill="#000000"
						></path><path
							d="M23.766,32.953c0,-0.398 -0.033,-0.795 -0.1,-1.186h-5.502v2.247h3.151c-0.13,0.725 -0.551,1.366 -1.165,1.773v1.459h1.881c1.101,-1.016 1.735,-2.518 1.735,-4.293z"
							fill="#4285f4"
						></path><path
							d="M18.164,38.654c1.575,0 2.9,-0.517 3.867,-1.408l-1.881,-1.459c-0.523,0.355 -1.198,0.558 -1.986,0.558c-1.522,0 -2.814,-1.026 -3.275,-2.408h-1.938v1.503c0.99,1.97 3.007,3.214 5.213,3.214z"
							fill="#34a853"
						></path><path
							d="M14.888,33.937c-0.244,-0.724 -0.244,-1.509 0,-2.233v-1.504h-1.938c-0.828,1.648 -0.828,3.591 0,5.24z"
							fill="#fbbc04"
						></path><path
							d="M18.164,29.295c0.832,-0.014 1.636,0.301 2.238,0.875v0l1.665,-1.665c-1.056,-0.992 -2.455,-1.536 -3.903,-1.519c-2.206,0 -4.223,1.244 -5.213,3.215l1.938,1.503c0.461,-1.383 1.753,-2.409 3.275,-2.409z"
							fill="#ea4335"
						></path><path
							d="M25.771,13.446c-0.383,-0.899 -1.312,-1.446 -2.289,-1.446h-5.06h-4.435c-2.202,0 -3.987,1.785 -3.987,3.987v7.804h9.689c0.83,0 1.624,-0.469 1.932,-1.239c0.61,-1.526 -0.491,-2.972 -1.936,-2.972h-1.684c-0.699,0 -1.263,-0.564 -1.263,-1.263c0,-0.699 0.564,-1.263 1.263,-1.263h5.474c1.745,-0.001 3.078,-1.775 2.296,-3.608z"
							fill="url(#color-5_ugDgmU0qYRe3_gr5)"
						></path></g
					></g
				>
			</svg>
		</div>
		<div class="flex h-8.5 w-14 items-center justify-center rounded-lg border-1 border-[#1E1E1E]">
			<svg
				class="size-10"
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				width="100"
				height="100"
				viewBox="0 0 50 50"
			>
				<path
					d="M 9.984375 15.001953 C 9.149375 15.041953 8.1182969 15.573313 7.5292969 16.320312 C 6.9892969 16.964312 6.5275313 18.010188 6.6445312 18.992188 C 7.5875313 19.074188 8.5301406 18.500438 9.1191406 17.773438 C 9.6991406 17.026437 10.082375 16.024953 9.984375 15.001953 z M 18 17 L 18 32 L 20.375 32 L 20.375 27 L 23.625 27 C 26.608 27 28.75 24.925 28.75 22 C 28.75 19.075 26.647125 17 23.703125 17 L 18 17 z M 20.375 19 L 23.125 19 C 25.172 19 26.375 20.105 26.375 22 C 26.375 23.895 25.182 25 23.125 25 L 20.375 25 L 20.375 19 z M 9.875 19.5 C 8.5 19.5 7.517 20.25 6.875 20.25 C 6.223 20.25 5.25 19.509766 4.125 19.509766 C 2.75 19.509766 1.4033594 20.372859 0.69335938 21.630859 C -0.76564063 24.145859 0.31460937 27.869016 1.7246094 29.916016 C 2.4156094 30.930016 3.25 32 4.375 32 C 5.406 31.961 5.755 31.375 7 31.375 C 8.254 31.375 8.625 32 9.75 32 C 10.875 32 11.556094 30.969078 12.246094 29.955078 C 13.034094 28.805078 13.356 27.684 13.375 27.625 C 13.356 27.606 11.197734 26.77725 11.177734 24.28125 C 11.158734 22.19525 12.879031 21.200578 12.957031 21.142578 C 11.984031 19.700578 10.375 19.5 10 19.5 L 9.875 19.5 z M 34.199219 21 C 31.710219 21 29.870734 22.395453 29.802734 24.314453 L 31.912109 24.314453 C 32.086109 23.402453 32.948859 22.804688 34.130859 22.804688 C 35.563859 22.804688 36.373047 23.460969 36.373047 24.667969 L 36.375 25.5 L 33.443359 25.654297 C 30.722359 25.815297 29.25 26.908594 29.25 28.808594 C 29.25 30.727594 30.770219 32.001953 32.949219 32.001953 C 34.421219 32.001953 35.78725 31.270328 36.40625 30.111328 L 36.455078 30.111328 L 36.455078 31.886719 L 38.623047 31.886719 L 38.623047 24.515625 C 38.624047 22.376625 36.882219 21 34.199219 21 z M 39.5 21 L 43.507812 31.949219 L 43.292969 32.615234 C 42.930969 33.744234 42.344828 34.177734 41.298828 34.177734 C 41.119828 34.177734 40.781 34.159625 40.625 34.140625 L 40.625 35.945312 C 40.783 35.980313 41.332906 36 41.503906 36 C 43.810906 36 44.896703 35.132047 45.845703 32.498047 L 50 21 L 47.595703 21 L 44.808594 29.884766 L 44.759766 29.884766 L 41.972656 21 L 39.5 21 z M 36.375 27 L 36.367188 27.867188 C 36.367188 29.254188 35.166125 30.242188 33.578125 30.242188 C 32.329125 30.242188 31.535156 29.653953 31.535156 28.751953 C 31.535156 27.820953 32.300672 27.279359 33.763672 27.193359 L 36.375 27 z"
				></path>
			</svg>
		</div>
		<div class="flex h-8.5 w-14 items-center justify-center rounded-lg border-1 border-[#1E1E1E]">
			<svg
				class="size-11"
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				width="100"
				height="100"
				viewBox="0,0,256,256"
			>
				<g
					fill="none"
					fill-rule="nonzero"
					stroke="none"
					stroke-width="1"
					stroke-linecap="butt"
					stroke-linejoin="miter"
					stroke-miterlimit="10"
					stroke-dasharray=""
					stroke-dashoffset="0"
					font-family="none"
					font-weight="none"
					font-size="none"
					text-anchor="none"
					style="mix-blend-mode: normal"
					><g transform="scale(5.33333,5.33333)"
						><path
							d="M45,35c0,2.209 -1.791,4 -4,4h-34c-2.209,0 -4,-1.791 -4,-4v-22c0,-2.209 1.791,-4 4,-4h34c2.209,0 4,1.791 4,4z"
							fill="#ffffff"
						></path><path
							d="M15.186,19l-2.626,7.832c0,0 -0.667,-3.313 -0.733,-3.729c-1.495,-3.411 -3.701,-3.221 -3.701,-3.221l2.6,10.118v-0.002h3.161l4.371,-10.998zM17.689,30h2.871l1.736,-11h-2.907zM38.008,19h-3.021l-4.71,11h2.852l0.588,-1.571h3.596l0.306,1.571h2.613zM34.513,26.328l1.563,-4.157l0.818,4.157zM26.369,22.206c0,-0.606 0.498,-1.057 1.926,-1.057c0.928,0 1.991,0.674 1.991,0.674l0.466,-2.309c0,0 -1.358,-0.515 -2.691,-0.515c-3.019,0 -4.576,1.444 -4.576,3.272c0,3.306 3.979,2.853 3.979,4.551c0,0.291 -0.231,0.964 -1.888,0.964c-1.662,0 -2.759,-0.609 -2.759,-0.609l-0.495,2.216c0,0 1.063,0.606 3.117,0.606c2.059,0 4.915,-1.54 4.915,-3.752c0,-2.661 -3.985,-2.853 -3.985,-4.041z"
							fill="#2100c4"
						></path><path
							d="M12.212,24.945l-0.966,-4.748c0,0 -0.437,-1.029 -1.573,-1.029c-1.136,0 -4.44,0 -4.44,0c0,0 5.661,1.672 6.979,5.777z"
							fill="#2100c4"
						></path></g
					></g
				>
			</svg>
		</div>
	</div>
	<!-- line -->
	<div class="h-0.5 w-full max-w-256 rounded-full bg-[#888888]"></div>
	<!-- copyright -->
	<div class="flex w-full max-w-256 items-center justify-between">
		<p class="font-medium text-[#1E1E1E]">
			Copyright © 2025 <span class="text-[#1F66F0]"> Boutiq.</span> All Rights Reserved.
		</p>
		<div class="flex w-fit items-center justify-end gap-4">
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M11.999 7.37695C10.7726 7.37695 9.59651 7.86412 8.72934 8.73129C7.86217 9.59846 7.375 10.7746 7.375 12.001C7.375 13.2273 7.86217 14.4034 8.72934 15.2706C9.59651 16.1378 10.7726 16.625 11.999 16.625C13.2254 16.625 14.4015 16.1378 15.2687 15.2706C16.1358 14.4034 16.623 13.2273 16.623 12.001C16.623 10.7746 16.1358 9.59846 15.2687 8.73129C14.4015 7.86412 13.2254 7.37695 11.999 7.37695ZM11.999 15.004C11.2023 15.004 10.4382 14.6875 9.87485 14.1241C9.31149 13.5607 8.995 12.7967 8.995 12C8.995 11.2032 9.31149 10.4392 9.87485 9.87581C10.4382 9.31245 11.2023 8.99595 11.999 8.99595C12.7957 8.99595 13.5598 9.31245 14.1231 9.87581C14.6865 10.4392 15.003 11.2032 15.003 12C15.003 12.7967 14.6865 13.5607 14.1231 14.1241C13.5598 14.6875 12.7957 15.004 11.999 15.004Z"
					fill="#1F66F0"
				/>
				<path
					d="M16.806 8.28503C17.4014 8.28503 17.884 7.80239 17.884 7.20703C17.884 6.61166 17.4014 6.12903 16.806 6.12903C16.2107 6.12903 15.728 6.61166 15.728 7.20703C15.728 7.80239 16.2107 8.28503 16.806 8.28503Z"
					fill="#1F66F0"
				/>
				<path
					d="M20.533 6.111C20.3015 5.51319 19.9477 4.97029 19.4943 4.51706C19.0409 4.06384 18.4979 3.71028 17.9 3.479C17.2003 3.21636 16.4611 3.07435 15.714 3.059C14.751 3.017 14.446 3.005 12.004 3.005C9.56195 3.005 9.24895 3.005 8.29395 3.059C7.54734 3.07356 6.80871 3.21561 6.10995 3.479C5.51189 3.71001 4.96872 4.06348 4.51529 4.51673C4.06186 4.96999 3.70818 5.51303 3.47695 6.111C3.21426 6.81062 3.07257 7.54984 3.05795 8.297C3.01495 9.259 3.00195 9.564 3.00195 12.007C3.00195 14.449 3.00195 14.76 3.05795 15.717C3.07295 16.465 3.21395 17.203 3.47695 17.904C3.70883 18.5018 4.06285 19.0446 4.51639 19.4978C4.96993 19.951 5.51302 20.3046 6.11095 20.536C6.80839 20.8092 7.54732 20.9614 8.29595 20.986C9.25895 21.028 9.56395 21.041 12.006 21.041C14.448 21.041 14.761 21.041 15.716 20.986C16.4631 20.9708 17.2022 20.8291 17.902 20.567C18.4997 20.3352 19.0426 19.9813 19.4959 19.528C19.9493 19.0746 20.3031 18.5318 20.535 17.934C20.798 17.234 20.939 16.496 20.954 15.748C20.997 14.786 21.01 14.481 21.01 12.038C21.01 9.59501 21.01 9.285 20.954 8.328C20.9423 7.57028 20.7999 6.82025 20.533 6.111ZM19.315 15.643C19.3085 16.2193 19.2033 16.7902 19.004 17.331C18.8538 17.7199 18.6239 18.073 18.329 18.3677C18.0342 18.6624 17.6809 18.8921 17.292 19.042C16.7572 19.2405 16.1923 19.3456 15.622 19.353C14.672 19.397 14.404 19.408 11.968 19.408C9.52995 19.408 9.28095 19.408 8.31295 19.353C7.74288 19.346 7.17828 19.2408 6.64395 19.042C6.25364 18.893 5.89895 18.6637 5.60284 18.369C5.30673 18.0742 5.07579 17.7206 4.92495 17.331C4.7284 16.7961 4.62326 16.2318 4.61395 15.662C4.57095 14.712 4.56095 14.444 4.56095 12.008C4.56095 9.571 4.56095 9.322 4.61395 8.353C4.62042 7.77703 4.72561 7.20642 4.92495 6.666C5.22995 5.877 5.85495 5.256 6.64395 4.954C7.17854 4.75614 7.74298 4.65097 8.31295 4.643C9.26395 4.6 9.53095 4.588 11.968 4.588C14.405 4.588 14.655 4.588 15.622 4.643C16.1924 4.64987 16.7573 4.75508 17.292 4.954C17.6809 5.10428 18.0341 5.33421 18.3289 5.62903C18.6238 5.92386 18.8537 6.27708 19.004 6.666C19.2005 7.20095 19.3056 7.76516 19.315 8.335C19.358 9.28601 19.369 9.553 19.369 11.99C19.369 14.426 19.369 14.688 19.326 15.644H19.315V15.643Z"
					fill="#1F66F0"
				/>
			</svg>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12 3C7.03832 3 3 7.03832 3 12C3 16.9617 7.03832 21 12 21C16.9617 21 21 16.9617 21 12C21 7.03832 16.9617 3 12 3ZM12 4.5C16.151 4.5 19.5 7.84898 19.5 12C19.5 15.7705 16.7338 18.871 13.1162 19.4092V14.187H15.252L15.5874 12.0176H13.1162V10.8325C13.1162 9.93177 13.4121 9.13184 14.2544 9.13184H15.6079V7.23926C15.3702 7.20701 14.867 7.13672 13.916 7.13672C11.93 7.13672 10.7666 8.18521 10.7666 10.5747V12.0176H8.72461V14.187H10.7666V19.3901C7.20664 18.803 4.5 15.7298 4.5 12C4.5 7.84898 7.84898 4.5 12 4.5Z"
					fill="#1F66F0"
				/>
			</svg>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M10.4883 14.651L15.25 21H22.25L14.3917 10.5223L20.9308 3H18.2808L13.1643 8.88578L8.75 3H1.75L9.26086 13.0145L2.31915 21H4.96917L10.4883 14.651ZM16.25 19L5.75 5H7.75L18.25 19H16.25Z"
					fill="#1F66F0"
				/>
			</svg>
		</div>
	</div>
</footer>
