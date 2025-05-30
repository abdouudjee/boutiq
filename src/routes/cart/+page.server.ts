import { supabase } from "$lib/index.js";

export async function load({ locals }) {
    let user = (await locals.safeGetSession()).user.identities[0].user_id;
    // getting user id using the session
    const { data: id, error: iderr } = await supabase.from("clients").select(
        "id",
    ).eq(
        "this_id",
        user,
    );
    // getting cart items
    const { data, error } = await supabase.from("cart").select(
        "*,products(id,name,selling_price),product_variants(id,specific_attributes,img_url)",
    ).eq(
        "client_id",
        id[0].id,
    );

    return {
        cartItems: data,
    };
}
