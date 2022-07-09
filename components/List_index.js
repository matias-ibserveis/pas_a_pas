import { useQuery, gql} from '@apollo/client';
import Link from 'next/link';
import styled from 'styled-components';
import Product from './Product';

export const N_PRODUCTS_QUERY = gql`
  query N_PRODUCTS_QUERY ($numero: Int!) {
    nProducts (numero: $numero ) {
      id
      createdAt
      ref
      name
      description
      status
      categoria
      price
      price2
      pricetext
      enlace
      photo
      photo2
      photo3
      photo4
      userEmail   
    }
  }
`;

export default function ListIndex() {

  const numero=3;  

  const { data, error, loading } = useQuery(N_PRODUCTS_QUERY,
      { 
        fetchPolicy: "cache-and-network", nextFetchPolicy: "cache-first" ,
        variables: {
          numero,
        },
      }
    );

  if (loading) return <p>...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ListStyles>
        {
          data.nProducts.map((elemento, index) => (
             <Product key={index} product={elemento} />
        ))}
      </ListStyles>
      
      <div >
        <Link href={`/products`} passHref>
         <button style={{margin: '1rem', width:'90%', fontSize: '1.25rem', padding:'0.5rem', background:"lighgrey"}}>
           VER TODOS</button> 
        </Link>
      </div>


    </div>
  );
}


const ListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1.5rem;
  padding: 2rem;
  background-color:offWhite;
  max-width:640px;

  @media (max-width: 600px) {
   padding: 0.30rem;

  }



`;
