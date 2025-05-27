import { writable } from 'svelte/store';
export let cart = writable([]);
/*
so the cart going to be an arr of obj
obj : {product_id,variant_id}

*/
