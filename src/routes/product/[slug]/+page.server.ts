import { supabase } from "$lib/index.js";
export async function load({ params, locals }) {
    let product = null;
    let variants = [];
    const { data, error: supabaseerror } = await supabase.from(
        "products",
    ).select("*").eq("name", params.slug);
    product = data[0] ?? null;
    const { data: vars, error } = await supabase.from(
        "product_variants",
    ).select("*").eq("product_id", product.id);
    variants = vars;
    const { data: cate, error: err } = await supabase.from("categories").select(
        "name,definition",
    ).eq("id", product.category_id);
    let user = (await locals.safeGetSession()).user.identities[0].user_id;
    const { data: id, error: iderr } = await supabase.from("clients").select(
        "id",
    ).eq(
        "this_id",
        user,
    );
    return { product, variants, category: cate[0], clientId: id[0].id };
}
