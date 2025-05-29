import { supabase } from "$lib/index.js";
export async function load() {
    const { data, error } = await supabase.from("categories").select("*");
    return { categories: data };
}
