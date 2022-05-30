import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import Product from "./Product";
import { leerlistaproductos } from "../pages/func_client/api-client";
import { useState, useEffect } from "react";

export default function Products() {
  const [productosLeidos, setproductosLeidos] = useState(["inicial"]);

  useEffect(() => {
    async function empezarleerproductos() {
      try {
        const leeLista = await leerlistaproductos();
        console.log("leelista", leeLista);
        setproductosLeidos(leeLista);
      } catch (error) {
        console.log("error en try", error);
      }
    }
    empezarleerproductos();
  }, []);

  const CrearLista = () => {
    console.log("CrearLista");
    return (
      <div>
        <ProductsListStyles>
          {productosLeidos.map((elemento, clave) => (
            // mejor elemento.id como Key
            <Product key={clave} product={elemento} />
          ))}
        </ProductsListStyles>
      </div>
    );
  };

  return <>{productosLeidos?.length ? <CrearLista /> : false}</>;
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
    width: 100%;
    font-size: 1.25rem;
  }
`;
