import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';
import { ParsedUrlQuery } from 'querystring';

const SINGLE_ITEM_QUERY = gql`
  query singleProduct($referencia: String!) {
    singleProduct(referencia: $referencia ) {
      id
      ref
      name
      description
      price
      status
      enlace
      userEmail
      photo
      photo2
      photo3
      photo4
    }
  }
`;

export default function SingleProduct( {referencia} ) {

 // const {referencia} = props
// console.log("referencia em singleprodu", referencia)

  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      referencia,
    },
  });
  
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { singleProduct } = data;
  //console.log("data", data);
  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {singleProduct.name}</title>
      </Head>
      <img src={singleProduct.photo}/>
      <div className="details">
        <h2>{singleProduct.name}</h2>
        <p>{singleProduct.description}</p>
      </div>
    </ProductStyles>
  );
}

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;
