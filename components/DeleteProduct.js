import { useMutation, gql } from '@apollo/client';
import Router from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($identificador: String!) {
    deleteProduct(identificador: $identificador ) {
      id
      ref
      name
    }
  }
`;

function update(cache, payload) {
  console.log(payload);
  console.log('running the update function after delete');
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct(props) {
  const {identificador} = props
  const {children} = props


  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: { identificador },
      update,
    }
  );

  async function borrar() {
    if (confirm('Seguro que quieres eliminar este producto?')) {
      toast('Producto eliminado')
      // ELiminar imagen en cloudinary !!!!
      await deleteProduct().catch((err) => alert(err.message));
      Router.push({
        pathname: `/products`,
      });
    }
  }

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => { borrar()}}
    >
      {children}
    </button>
  );
}
