import jwt from 'https://esm.sh/jsonwebtoken@8.5.1'

export const validateToken = async (req) => {
  const token = req.headers.get('Authorization').replace('Bearer ', '')
  const key = Deno.env.get('JWT_SECRET')

  const user = await jwt.verify(token, key)

  return user
}
