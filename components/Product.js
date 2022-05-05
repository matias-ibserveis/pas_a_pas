import Link from "next/link";
import styled from "styled-components";

import Title from "./styles/Title";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";
import Image from "next/image";
import imagenDefault from "../public/images/default_image.jpg";
// ojo, Image "incompatible" con styled  https://nextjs.org/docs/basic-features/image-optimization#image-sizing


export default function Product(props) {
  const { product } = props;

  return (
    <FichaStyles>
      <div style={{ display: "block", width: "100%", height: "400px" }}>
        <Image src={imagenDefault} alt={product.name} layout="responsive" />
      </div>

      <Title>
        <Link href={`/product/${product.id}`} passHref>
          <span>{product.name}</span>
        </Link>
      </Title>

      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>

      {/* TODO: Add buttons to edit and delte item */}
    </FichaStyles>
  );
}




const FichaStyles = styled.div`
  display: flex;
  flex-direction: column;
  position:relative;
  background: white;
  border: 1px solid var(--offWhite);
  box-shadow: var(--bs);
  
  p {
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }

  }
`;
