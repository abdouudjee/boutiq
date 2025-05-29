import { supabase } from "$lib";
export async function load({ params }) {
    const { data: cat, error: iderr } = await supabase.from("categories")
        .select(
            "id,description",
        )
        .eq("name", params.slug);

    if (!iderr) {
        const { data: prods, error } = await supabase.from("products").select(
            "*",
        ).eq(
            "category_id",
            cat[0].id,
        );
        return { products: prods, category: { ...cat[0], name: params.slug } };
    }
}
