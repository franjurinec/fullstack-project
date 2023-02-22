import AdminLogin from './AdminLogin'
import AdminControlPanel from './AdminControlPanel'
import { isAuthenticated } from '../../services/authService'
import { useState } from 'react'

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated())

  if (!authenticated) return <AdminLogin setAuthenticated={setAuthenticated} />
  return <AdminControlPanel setAuthenticated={setAuthenticated} />
}

export default Admin
