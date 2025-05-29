import { supabase } from "$lib/index.js";
export async function load({ locals }) {
    const x = await locals.safeGetSession();
    const { data: id, error: iderr } = await supabase.from("clients").select(
        "id",
    ).eq(
        "this_id",
        x.user.identities[0].user_id,
    );
    const { data, error } = await supabase.from("wishlist").select(
        "id, products(*)",
    );
    return {
        liked: data,
    };
}
