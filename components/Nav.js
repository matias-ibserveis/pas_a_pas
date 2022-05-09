import Link from 'next/link';
import styled from 'styled-components';

export default function Nav() {
  return (
    <NavStyles>

      <Link href="/products" passHref>
        <a title="ver cursos"> Cursos </a>
      </Link>
      
      <Link href="/sell" passHref>
        <a title="subir nuevo"> ➕ Nuevo </a>
      </Link>

      <Link href="/account" passHref>
        <a title="mi cuenta"> Mi cuenta </a>
      </Link>
      
    </NavStyles>
  );
}


const NavStyles = styled.div`
  margin: 0.5rem 0rem;
  padding: 0;
  display:flex;
  align-items:center;

  button {
    margin:0.2rem;
  }
 
  a {
      text-decoration:none;
      font-size: 1rem;
      font-weight: bold;
      background: var(--red);
      color: white;
      border-radius: 4px;
      box-shadow: 0 4px 0px var(--black);
      transition: all .2s;
      position: relative;
      padding: 0.75rem 0.5rem;
      top: 0;
      cursor: pointer;
      margin: 0.1rem;
      
      &:hover,
      &:focus {
        
        text-decoration:underline;
        top: 2px;
        box-shadow: 0 2px 0px #387796;
        transition: all .2s;
      
      }    

      @media (max-width: 600px) {
        font-size: 0.9rem;
        padding: 0.5rem 0.5rem;
        margin: 0.5rem 0.1rem;
      }

      @media (max-width: 400px) {
        font-size: 0.8rem;
        padding: 0.4rem 0.4rem;
        margin: 0.4rem 0.1rem;
      }

  }


  @media (max-width: 400px) {
    margin: 0.5rem 0rem;
    padding: 0;
    display:flex;
    justify-content:flex-end;
  }


`;

