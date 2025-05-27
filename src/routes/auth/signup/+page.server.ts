import { redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";

export const actions: Actions = {
    signup: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const fullname = formData.get("fullname") as string;

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: {fullname:fullname},emailRedirectTo:'http://localhost:5173/' },
        });
        if (error) {
            console.error(error);
            redirect(303, "/auth/error");
        } else {
            redirect(303, "/");
        }
    },
};
