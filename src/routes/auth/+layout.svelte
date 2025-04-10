<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	let { children } = $props();
</script>

<div class="flex flex-col h-screen w-screen items-center justify-start gap-3 py-30">
	<div class="flex h-fit w-md  items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-2">
		<button
			onclick={() => goto('/auth/signup')}
			class={[
				'flex w-1/2 cursor-pointer items-center justify-center rounded-xs px-10  py-2 text-xl font-medium duration-300 ease-out',
				page.url.pathname.includes('signup') ? 'bg-white text-black' : 'text-gray-500'
			]}>sign up</button
		>
		<button
			onclick={()=>{goto('/auth/signin')}}
			class={[
				'flex w-1/2 cursor-pointer items-center justify-center rounded-xs px-10  py-2 text-xl font-medium duration-300 ease-out',
				page.url.pathname.includes('signin') ? 'bg-white text-black' : 'text-gray-500'
			]}>sign in</button
		>
	</div>
	<div class="h-fit w-md">
		{@render children()}
	</div>
</div>
