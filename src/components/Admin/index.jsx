import { Route, Routes } from 'react-router-dom'
import AdminLogin from './AdminLogin'
import AdminControlPanel from './AdminControlPanel'

const Admin = () => (
  <Routes>
    <Route path="/" element={<AdminControlPanel />} />
    <Route path="login" element={<AdminLogin />} />
  </Routes>
)

export default Admin
