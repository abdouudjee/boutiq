import { supabase } from "$lib/index.js";
export async function load({ url }) {
    const fullurl = url.href;
    const tag = url.searchParams.get("tag");
    let products = [];
    if (tag == "promo") {
        const { data, error: supabaseerror } = await supabase.from(
            "products",
        ).select("*").neq("discount", "0");
        products = data;
    }
    else{
        const { data, error: supabaseerror } = await supabase.from(
            "products",
        ).select("*").neq("", "");
        products = data;
    }
    return { products };
}
