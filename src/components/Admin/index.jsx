import AdminLogin from './AdminLogin'
import AdminControlPanel from './AdminControlPanel'
import { useAuthStatusQuery } from '../../hooks/authHooks'

const Admin = () => {
  const { data: authorized, isLoading, error } = useAuthStatusQuery()

  if (isLoading || error) return null
  if (authorized) return <AdminControlPanel />
  return <AdminLogin />
}

export default Admin
