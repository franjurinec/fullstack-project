import { useParams } from 'react-router-dom'

const ProductDetail = () => {
  const params = useParams()

  return <div>{params.id}</div>
}

export default ProductDetail
