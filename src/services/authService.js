const LS_TOKEN_KEY = 'fj-admin-token'

export const getAuthHeader = () => {
  const token = localStorage.getItem(LS_TOKEN_KEY)
  return token ? `Bearer ${token}` : undefined
}

export const authenticate = async (password) => {
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  })

  if (response.status === 401) throw new Error('Invalid password!')
  if (!response.ok) throw new Error('An error has occured.')

  const { token } = await response.json().catch(() => {
    throw new Error('Failed to process server response.')
  })

  localStorage.setItem(LS_TOKEN_KEY, token)
}

export const deleteAuth = () => {
  localStorage.removeItem(LS_TOKEN_KEY)
}

export const isAuthenticated = async () => {
  const response = await fetch('/api/auth/check', {
    headers: {
      Authorization: getAuthHeader(),
    },
  })

  if (!response.ok) throw new Error('An error has occured.')

  return await response.json().then((data) => data.authenticated)
}
