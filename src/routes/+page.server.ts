// src/routes/+layout.server.ts

export const load = async ({ locals: { safeGetSession }, cookies }) => {
  const { session, user } = await safeGetSession();
    console.log(user);
  return {
    session,
    user,
    cookies: cookies.getAll(),
  };
};
