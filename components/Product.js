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
      <div className="card" key={product.id}>
        <PriceTag>
          <Link href={`/product/${product.id}`}>
            {formatMoney(product.price)}
          </Link>
        </PriceTag>

        <img src={product.photo} alt={product.name} />

        <Title>
          <Link href={`/product/${product.id}`} passHref>
            <a>{product.name}este</a>
          </Link>
        </Title>

        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: product.description || "<p>descripción</p>",
          }}
        />
       
      </div>


    </FichaStyles>
  );
}

// https://www.quackit.com/css/flexbox/examples/flexbox_cards.cfm?utm_source=pocket_mylist
const FichaStyles = styled.div`
  .card {
    background-image: linear-gradient(var(--red), white, white);
    padding: 0.25rem;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    position: relative;
    &:hover {
      opacity: 1;
      box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.3);
    }
  }

  .card img {
    max-width: 100%;
    opacity: 0.95;
    padding: 0rem;
    border-radius: 12px;
    &:hover {
      opacity: 1;
    }
  }

  .card .text {
    padding: 0 0.5rem;
  }

  .card .text > button {
    background: gray;
    border: 0;
    color: white;
    padding: 10px;
    width: 100%;
  }

  .description {
    margin-top: 2rem;
    font-size: 1rem;
  }
`;
