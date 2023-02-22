import { Route, Routes } from 'react-router-dom'
import StoreHome from './StoreHome'

const Storefront = () => (
  <Routes>
    <Route path="/:id" element={<StoreHome />} />
  </Routes>
)

export default Storefront
