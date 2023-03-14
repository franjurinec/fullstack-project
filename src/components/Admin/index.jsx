import AdminLogin from './AdminLogin'
import AdminControlPanel from './AdminControlPanel'
import useAuthStatusQuery from '../../hooks/useAuthStatusQuery'

const Admin = () => {
  const { data: authStatus } = useAuthStatusQuery()

  if (!authStatus) return <AdminLogin />
  return <AdminControlPanel />
}

export default Admin
