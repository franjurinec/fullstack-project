export const authFetch = (url, options) => {
  const token = localStorage.getItem('token')

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
    ...options,
  })
}

export const authenticate = async (password) => {
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  })

  if (response.status !== 200) {
    throw new Error('Authentication error!')
  }

  const { token } = await response.json()
  localStorage.setItem('token', token)
}

export const deleteAuth = () => {
  localStorage.removeItem('token')
}

export const isAuthenticated = async () => {
  const result = await authFetch('/api/auth/check')
  const data = await result.json()
  return !!data?.authenticated // boolean return
}
