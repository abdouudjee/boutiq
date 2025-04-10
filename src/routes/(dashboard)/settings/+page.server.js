import { supabase } from '$lib/index.js';

export async function load() {
	const { data } = await supabase.from('wilayas').select('*').range(0, 10);
	console.log(data);  
	return {
		admins: data ?? []
	};
}
