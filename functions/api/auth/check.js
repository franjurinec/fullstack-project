export const onRequest = async ({ data }) => {
  return Response.json({ authenticated: !!data.authenticated })
}
