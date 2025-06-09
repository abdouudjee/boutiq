import { redirect } from '@sveltejs/kit';
export async function load({ locals }) {
	const x = await locals.safeGetSession();
	if (!x.session) {
		redirect(308, '/');
	}
	if (!x.session.user.user_metadata.isAdmin) {
		redirect(308, '/');
	}
}
