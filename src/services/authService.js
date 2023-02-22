export const authenticate = async (password) => {
  const response = await fetch('/api/authenticate', {
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

export const signout = () => {
  localStorage.removeItem('token')
}

export const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  return !!token
}
