import AdminLogin from './AdminLogin'
import AdminControlPanel from './AdminControlPanel'
import { useAuthStatus } from '../../hooks/react-query'

const Admin = () => {
  const { authenticated } = useAuthStatus()

  if (!authenticated) return <AdminLogin />
  return <AdminControlPanel />
}

export default Admin
