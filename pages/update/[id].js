import UpdateProduct from '../../components/UpdateProduct'
import { useRouter } from 'next/router'


export default function UpdatePage() {

  const router = useRouter()
  const {id} = router.query

  return (
    <div>
      <UpdateProduct identificador={id} />
    </div>
  );
}
