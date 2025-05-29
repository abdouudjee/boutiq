<script>
	import { goto } from '$app/navigation';

	let { id, name, img_url, rating, raters, notes, price, discount, isfav = false } = $props();
</script>

<div
	class="relative flex h-80.5 w-60.5 shrink-0 flex-col items-center justify-start gap-2.5 rounded-xl border-1 border-[#EBEBEB] bg-white hover:[&_a]:text-[#1F66F0] hover:[&_a]:underline"
>
	<div class="absolute top-2 right-2 z-10 flex items-center justify-center gap-2">
		<!-- add to favorite and features -->
		{#if discount > 0}
			<div class="flex h-4.5 items-center justify-center rounded-sm bg-[#E5EEFF] px-2 py-0.5">
				<p class="text-sm font-medium text-[#1F66F0]">Promo</p>
			</div>
		{/if}
		<button
			class="relative flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md active:scale-90"
		>
			<img
				src="/favorite/{isfav?"added":"removed"}.svg"
				alt=""
				class="absolute top-[55%] left-[50%] size-4 -translate-x-1/2 -translate-y-1/2 transform"
			/>
		</button>
	</div>
	<div class="flex h-fit max-h-7/10 min-h-6/10 w-full items-end justify-center">
		<img
			src={img_url ?? '/placeholder.svg'}
			onerror={(e) => {
				e.currentTarget.src = '/placeholder.svg';
			}}
			alt=""
			class="h-full w-full object-cover"
		/>
	</div>
	<div class="flex h-fit w-full flex-col items-start justify-between gap-2.5 p-2">
		<div class="flex flex-col items-start justify-start gap-1">
			<!-- category -->
			<!-- <p class="text-[10px] font-medium tracking-[0.2em] text-black uppercase">JEANS bla allllll</p> -->
			<!-- product name -->
			<a
				href={'/product/' + name}
				onclick={() => {
					goto(`/product/${name}`);
				}}
				class="text-base font-medium text-wrap text-black">{name}</a
			>
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
				<span class="text-[12px] text-[#878787]">(100)</span>
			</div>
		</div>
		{#if discount > 0}
			<p class="text-[10px] font-medium text-black">
				<span class="text-lg leading-4 font-bold text-red-500 line-through decoration-red-500"
					>{price}
				</span>
				<span class="pl-2 text-xl leading-4 text-green-300">
					{(parseFloat(1 - parseInt(discount) / 100) * price).toFixed(2)}</span
				> DZD
			</p>
		{:else}
			<p class="text-[10px] font-medium text-black">
				<span class="text-lg leading-4 font-bold text-black">{price} </span> DZD
			</p>
		{/if}
	</div>
</div>
