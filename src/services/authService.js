export const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return `Bearer ${token}`
}

export const authenticate = async (password) => {
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  })

  if (response.status !== 200) throw new Error('Authentication error!')

  const { token } = await response.json()
  localStorage.setItem('token', token)
}

export const deleteAuth = () => {
  localStorage.removeItem('token')
}

export const isAuthenticated = async () => {
  const response = await fetch('/api/auth/check', {
    headers: {
      Authorization: getAuthHeader(),
    },
  })
  const data = await response.json()
  return !!data?.authenticated // boolean return
}
