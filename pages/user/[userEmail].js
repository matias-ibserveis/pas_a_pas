import SingleUser from '../../components/SingleUser';
import { useRouter } from 'next/router'

//;

export default function SingleUserPage() {

  const router = useRouter()
  const {userEmail} = router.query


  return <SingleUser userCorreo={userEmail} />
}
