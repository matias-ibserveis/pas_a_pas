import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';

export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <Link href="/">Sick fits</Link>
        </Logo>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <Nav />
    </HeaderStyles>
  );
}


const Logo = styled.h1`
  font-size: 2rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  background: blue;
  transform: skew(-7deg);
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;


const HeaderStyles = styled.header`
  .bar {
    background: var(--offWhite);
    border-bottom: 2px solid var(--black, black);
    display: flex;
    justify-content: space-between;;
    align-items: center;

    @media (max-width: 600px) {
      gap:1rem;
    }

  }

  .sub-bar {
    display: flex;
    border-bottom: 1px solid var(--black, black);
    padding: 0 0.25rem;
  }
`;

