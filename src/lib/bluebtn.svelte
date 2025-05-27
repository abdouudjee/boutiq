<script>
	import { goto } from '$app/navigation';
	let { content = 'Shop Now', url = '/product' } = $props();
</script>

<button
	class="bg-blue rounded-md border-none px-4 py-2 font-medium text-white transition
           hover:bg-blue-600 hover:shadow-lg
           active:scale-95 active:bg-blue-700"
	onclick={goto(url)}
>
	{content}</button
>
