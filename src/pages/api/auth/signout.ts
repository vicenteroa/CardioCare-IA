import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ redirect, cookies }) => {
  cookies.delete('session', {
    path: '/',
    domain: undefined,
    httpOnly: undefined,
    sameSite: undefined,
    secure: undefined
  })
  return redirect('/signin')
}
