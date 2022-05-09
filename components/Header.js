import Link from "next/link";
import styled from "styled-components";
import Nav from "./Nav";
import Image from "next/image";

export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <span style={{ cursor: "pointer", margin: "0.25rem" }}>
          <Link href="/" passHref>
            <a>
              <Image
                src="/static/images/schola.gif"
                alt="logo"
                width="100%"
                height="100%"
                objectFit="contain"
              />
            </a>
          </Link>
        </span>

        <Nav />
      </div>

      <div className="sub-bar">
        <p>Buscar</p>
      </div>
    </HeaderStyles>
  );
}




const HeaderStyles = styled.header`
  .bar {
    background: var(--offWhite);
    border-bottom: 2px solid var(--black, black);
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 600px) {
      gap: 1rem;
    }
  }

  .sub-bar {
    display: flex;
    border-bottom: 1px solid var(--black, black);
    padding: 0 0.25rem;
  }
`;
