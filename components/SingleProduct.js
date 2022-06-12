import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';
import { ParsedUrlQuery } from 'querystring';
import Carousel from '../components/miSlide'
import { useSession } from "next-auth/react";
import Link from 'next/link';

export const SINGLE_ITEM_QUERY = gql`
  query singleProduct($identificador: String!) {
    singleProduct(identificador: $identificador ) {
      id
      ref
      name
      description
      status
      categoria
      price
      price
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

export default function SingleProduct( {identificador}) {

  const { data: session, status } = useSession()
  console.log("session inicio",session)

  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      identificador,
    },
  });
  
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { singleProduct } = data;

  
  const VerUpdate = () => {
    if (status === "authenticated") {
      if (session?.user?.email === singleProduct.userEmail) {
      return (
        <div className="buttonList">
          <Link href={`/update/${singleProduct.id}`}>
              Editar producto ✏️
          </Link>
        </div>
      )
      }
      else return (
       <p>Propietario; {singleProduct.userEmail}</p>
    )
    }
    else return (
      <p>Hola! usuario</p>
    )
  }


  const Details = () => {
    return (
        <div className="details" >
        <div dangerouslySetInnerHTML={{ __html: singleProduct.description || "😊"}} />
        <p>categoria</p>
        <div dangerouslySetInnerHTML={{ __html: singleProduct.categoria || "sin categoria"}} />
        <p>{singleProduct.userEmail}</p>
      </div>
    )
  }
  
  return (
    <SingleProductStyles>
      <Head>
        <title>Sick Fits | {singleProduct.name}</title>
      </Head>

      <div style={{ display:"flex", width:"400px"}}>
        <Carousel photo={singleProduct.photo} photo2={singleProduct.photo2} photo3={singleProduct.photo3} photo4={singleProduct.photo4}/>
      </div>

      <Details/>

      <VerUpdate />

    </SingleProductStyles>
  );
}


const SingleProductStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  width:99%;
  justify-content: center;

  img {
    width: 100%;
  }

  @media (min-width: 732px) {
    justify-content: flex-start;

  }

  .details{
    background-color:lightgrey;
    width:345px;
    padding:0.5rem;
    margin: 0rem 0.25rem 0rem 0.25rem;

    @media (min-width: 732px) {
      padding: 0 0.25rem;
      background-color: pink;
      margin: 0rem 0rem 0rem 1rem;
    }
  }



`;
