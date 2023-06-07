import AdminLogin from './AdminLogin'
import AdminControlPanel from './AdminControlPanel'
import { useAuthStatusQuery } from '../../hooks/authHooks'

const Admin = () => {
  const { data: authorized } = useAuthStatusQuery()
  if (authorized) return <AdminControlPanel />
  return <AdminLogin />
}

export default Admin
