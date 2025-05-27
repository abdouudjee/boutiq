<script>
	import { page } from '$app/state';
	let { children } = $props();
</script>

<nav
	class="sticky top-0 z-20 flex h-20 w-full items-center justify-between border-b-2 border-b-gray-300 bg-white px-5"
>
	<img src="/logo.png" alt="" />

	<ul class="flex items-center justify-between gap-5">
		<li class="">
			<a
				href="/admin/dashboard"
				class={[
					' hover:text-black',
					page.url.pathname.includes('dashboard') ? 'font-medium text-black' : 'text-gray-500'
				]}
			>
				Dashboard</a
			>
		</li>
		<li class="">
			<a
				href="/admin/products"
				class={[
					' hover:text-black',
					page.url.pathname.includes('products') ? 'font-medium text-black' : 'text-gray-500'
				]}
			>
				Products</a
			>
		</li>
		<li class="">
			<a
				href="/admin/categories"
				class={[
					' hover:text-black',
					page.url.pathname.includes('categories') ? 'font-medium text-black' : 'text-gray-500'
				]}
			>
				Categories</a
			>
		</li>
		<li class="">
			<a
				href="/admin/orders"
				class={[
					' hover:text-black',
					page.url.pathname.includes('orders') ? 'font-medium text-black' : 'text-gray-500'
				]}
			>
				Orders</a
			>
		</li>
		<li class="">
			<a
				href="/admin/customers"
				class={[
					' hover:text-black',
					page.url.pathname.includes('customers') ? 'font-medium text-black' : 'text-gray-500'
				]}
			>
				Customers</a
			>
		</li>
	</ul>
	<div class="flex items-center justify-center">
		<img src="" alt="" class="h-10 w-10 rounded-full" />
	</div>
</nav>
<div class="relative flex">
	<aside
		class="sticky top-20 left-0 hidden h-[calc(100vh-5rem)] max-w-70 min-w-55 flex-col items-center justify-start overflow-auto border-r-2 border-r-gray-300 bg-white px-5 py-10 lg:flex"
	>
		<ul class="flex flex-col items-start justify-between gap-5">
			<li
				class="flex w-full items-center justify-start gap-2 rounded-lg px-6 py-2 hover:bg-gray-200 hover:[&_a]:font-medium hover:[&_a]:text-black hover:[&_svg]:stroke-black"
			>
				<div class="flex items-center justify-start gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke={page.url.pathname.includes('dashboard') ? 'black' : '#6a7282'}
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
						<polyline points="9 22 9 12 15 12 15 22"></polyline>
					</svg>

					<a
						href="/admin/dashboard"
						class={page.url.pathname.includes('dashboard')
							? 'font-medium text-black '
							: 'text-gray-500'}
					>
						Dashboard</a
					>
				</div>
			</li>
			<li
				class="flex w-full items-center justify-start gap-2 rounded-lg px-6 py-2 hover:bg-gray-200 hover:[&_a]:font-medium hover:[&_a]:text-black hover:[&_svg]:stroke-black"
			>
				<div class="flex items-center justify-start gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke={page.url.pathname.includes('products') ? 'black' : '#6a7282'}
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path
							d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
						></path>
						<polyline points="3.29 7 12 12 20.71 7"></polyline>
						<line x1="12" x2="12" y1="22" y2="12"></line>
					</svg>

					<a
						href="/admin/products"
						class={[
							' hover:text-black',
							page.url.pathname.includes('products') ? 'font-medium text-black' : 'text-gray-500'
						]}
					>
						Products</a
					>
				</div>
			</li>
			<li
				class="flex w-full items-center justify-start gap-2 rounded-lg px-6 py-2 hover:bg-gray-200 hover:[&_a]:font-medium hover:[&_a]:text-black hover:[&_svg]:stroke-black"
			>
				<div class="flex items-center justify-start gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke={page.url.pathname.includes('categories') ? 'black' : '#6a7282'}
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-folder-tree h-5 w-5.5"
						><path
							d="M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"
						></path><path
							d="M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"
						></path><path d="M3 5a2 2 0 0 0 2 2h3"></path><path d="M3 3v13a2 2 0 0 0 2 2h3"
						></path></svg
					>
					<a
						href="/admin/categories"
						class={[
							' hover:text-black',
							page.url.pathname.includes('categories') ? 'font-medium text-black' : 'text-gray-500'
						]}
					>
						Categories</a
					>
				</div>
			</li>
			<li
				class="flex w-full items-center justify-start gap-2 rounded-lg px-6 py-2 hover:bg-gray-200 hover:[&_a]:font-medium hover:[&_a]:text-black hover:[&_svg]:stroke-black"
			>
				<div class="flex items-center justify-start gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="27"
						height="27"
						viewBox="0 0 27 24"
						fill="none"
						stroke={page.url.pathname.includes('orders') ? 'black' : '#6a7282'}
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-shopping-cart h-6 w-5.5"
						><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path
							d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
						></path></svg
					>
					<a
						href="/admin/orders"
						class={[
							' hover:text-black',
							page.url.pathname.includes('orders') ? 'font-medium text-black' : 'text-gray-500'
						]}
					>
						Orders</a
					>
				</div>
			</li>
			<li
				class="flex w-full items-center justify-start gap-2 rounded-lg px-6 py-2 hover:bg-gray-200 hover:[&_a]:font-medium hover:[&_a]:text-black hover:[&_svg]:stroke-black"
			>
				<div class="flex items-center justify-start gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke={page.url.pathname.includes('customers') ? 'black' : '#6a7282'}
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-users h-5 w-5.5"
						><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"
						></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path
							d="M16 3.13a4 4 0 0 1 0 7.75"
						></path></svg
					>
					<a
						href="/admin/customers"
						class={[
							' hover:text-black',
							page.url.pathname.includes('customers') ? 'font-medium text-black' : 'text-gray-500'
						]}
					>
						Customers</a
					>
				</div>
			</li>
			<li
				class="flex w-full items-center justify-start gap-2 rounded-lg px-6 py-2 hover:bg-gray-200 hover:[&_a]:font-medium hover:[&_a]:text-black hover:[&_svg]:stroke-black"
			>
				<div class="flex items-center justify-start gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke={page.url.pathname.includes('settings') ? 'black' : '#6a7282'}
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-settings h-5 w-5.5"
						><path
							d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
						></path><circle cx="12" cy="12" r="3"></circle></svg
					>
					<a
						href="/admin/settings"
						class={[
							' hover:text-black',
							page.url.pathname.includes('settings') ? 'font-medium text-black' : 'text-gray-500'
						]}
					>
						Settings</a
					>
				</div>
			</li>
		</ul>
	</aside>
	<main class="    h-fit w-full flex-col items-center justify-start overflow-y-auto px-8">
		{@render children()}
	</main>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
		scrollbar-width: none;
	}
</style>
