import styled from 'styled-components';


const Title = styled.div`
  display:flex;
  justify-content:center;
  align-items:"flex-end";
  gap:1rem;
  font-family: 'Raleway-MediumItalic';
  font-size: 1.5rem;
  padding: 0 1rem 0 0;
  margin:1rem 0 1rem 2.5rem;
  
  a {
    display: inline;
    color: black;
    text-decoration:underline;
    
    &:hover {
      color:var(--red);
    }
  }
 
  
`;


export default Title;