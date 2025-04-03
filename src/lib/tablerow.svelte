<script>
	let { name='air frier', price=30, img, inventory=50, category='eletcronics and dashboard', status } = $props();
</script>

<tr>
	<td class="border-b-2 border-b-gray-300 px-4 py-2">
		<img
			src={img || 'placeholder.svg'}
			onerror={() => {
				this.src = 'placeholder.svg';
			}}
			alt=""
			class="style-none h-10 w-10 rounded-lg border-2 border-gray-300 bg-gray-300 object-cover"
		/></td
	>
	<td class="border-b-2 border-b-gray-300 px-4 py-2 text-left text-sm">{name}</td>
	<td class="border-b-2 border-b-gray-300 px-4 py-2 w-30">{price} Dzd</td>
	<td class="border-b-2 border-b-gray-300 px-4 py-2 w-20 ">{inventory}</td>
	<td class="border-b-2 border-b-gray-300 px-4 py-2  w-40 text-wrap break-words text-sm" >{category}</td>
	<td class="border-b-2 border-b-gray-300 py-2 w-30"> <p class={[" mx-auto  w-fit px-2  rounded-full  py-1 font-medium text-sm",status=='low stock'?'bg-white border-1 border-gray-400 text-black  font-medium':'',status=='in stock'?'bg-black text-white  font-medium':'',status=='out of stock'?'bg-red-600 text-white  font-medium':'']}>{status}</p></td>
	<td class="border-b-2 border-b-gray-300 px-4 py-2 w-20 text-center">
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button class="rounded-lg hover:bg-gray-200 p-1"
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
				class="lucide lucide-ellipsis-icon lucide-ellipsis"
			>
				<circle cx="12" cy="12" r="1" />
				<circle cx="19" cy="12" r="1" />
				<circle cx="5" cy="12" r="1" />
			</svg></button
		></td
	>
</tr>
