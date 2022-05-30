import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import Product from "./Product";


export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
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

export default function Products() {
  
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY,
    { fetchPolicy: "cache-and-network", nextFetchPolicy: "cache-first" } 
  );

  console.log(data, error, loading);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ProductsListStyles>
        {data.allProducts.map((elemento, clave) => (
          // mejor elemento.id como Key
          <Product key={clave} product={elemento} />
        ))}
      </ProductsListStyles>
    </div>
  );
}




const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 3rem;
  padding: 0.25rem;
  margin-top: 1rem;
  background-color: white;

  @media (min-width: 800px) {
    grid-template-columns: 1.1fr 1fr;
    padding: 1rem;
    align-items: flex-start;
  }

  @media (min-width: 1360px) {
    display: grid;
    grid-template-columns: 1fr 1.2fr 1fr;
  }

  button {
    width:100%;
    font-size:1.25rem;
  }

`;