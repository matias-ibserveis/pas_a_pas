import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import styled from "styled-components";
import DisplayError from "./ErrorMessage";
import Carousel from "../components/miSlide";
import { filtraUnProducto } from "../pages/func_client/api-client";
import { useState, useEffect } from "react";

export default function SingleProduct({ identificador }) {
  const [singleProduct , setproductoLeido] = useState(["inicial"]);

  useEffect(() => {
    async function empezarfiltraunproducto() {
      try {
        const singleProduct = await filtraUnProducto(identificador);
        console.log("productoLeido", singleProduct);
        setproductoLeido(singleProduct);
      } catch (error) {
        console.log("error en try", error);
      }
    }
    empezarfiltraunproducto();
  }, []);

  if (singleProduct === null) return (<p>sin datos...</p>)


  const Details = () => {
    return (
      <div className="details">
         <h3>{singleProduct.name}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: singleProduct.description || "😊 Aquí va la descripción",
          }}
        />
        <p>categoria</p>
        <div
          dangerouslySetInnerHTML={{
            __html: singleProduct.categoria || "sin categoria",
          }}
        />
        <p>{singleProduct.userEmail}</p>
      </div>
    );
  };

  return (
    <SingleProductStyles>
      <Head>
        <title>Sick Fits | {singleProduct.name}</title>
      </Head>

      <div style={{ display: "flex", width: "400px" }}>
        {singleProduct ? (
          <Carousel
            photo={singleProduct.photo}
            photo2={singleProduct.photo2}
            photo3={singleProduct.photo3}
            photo4={singleProduct.photo4}
          />
        ) : (
          false
        )}
      </div>

      {singleProduct ?  <Details /> : false}

    </SingleProductStyles>
  );
}

const SingleProductStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 99%;
  justify-content: center;

  img {
    width: 100%;
  }

  @media (min-width: 732px) {
    justify-content: flex-start;
  }

  .details {
    background-color: lightgrey;
    width: 345px;
    padding: 0.5rem;
    margin: 0rem 0.25rem 0rem 0.25rem;

    @media (min-width: 732px) {
      padding: 0 0.25rem;
      background-color: pink;
      margin: 0rem 0rem 0rem 1rem;
    }
  }
`;
