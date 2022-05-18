import SingleProduct from '../../components/SingleProduct';
import { useRouter } from 'next/router'


//;

export default function SingleProductPage() {


  const router = useRouter()
  const {ref}= router.query


  return <SingleProduct referencia={ref} />
}
