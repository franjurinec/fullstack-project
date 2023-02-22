import { Route, Routes } from 'react-router-dom'
import AdminLogin from './AdminLogin'

const Admin = () => (
  <Routes>
    <Route path="login" element={<AdminLogin />} />
  </Routes>
)

export default Admin
