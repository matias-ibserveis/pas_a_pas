import styled from 'styled-components';

const PriceTag = styled.h5`
position:absolute;
margin: 0 0rem 0 70%;
z-index: 10;
transform: skew(-5deg) rotate(-10deg);
text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1);
a {
  background: var(--red);
  font-size: 1.5rem;
  text-align: center;
  color: white;
  padding: 0 1rem;
}

`;



export default PriceTag;
