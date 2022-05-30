import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`

  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid white;
  padding: 0.15rem;
  font-size: 1rem;
  line-height: 1;
  max-width:700px;
  label {
    display: block;
    margin: 0.5rem 0.15rem ;
  }
  input,
  textarea,
  select {
    display: block;
    width: 98%;
    padding: 0.75rem 0.25rem;
    margin: 0rem ;
    font-size: 1rem;
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: var(--green);
    }
  }
  button,
  input[type='submit'] {
    background: green;
    color:  var(--lightGrey);
    font-size: 1.1rem;
    border: 0;
    margin: 1rem 1rem;
    padding: 0.75rem 1.2rem;
    cursor: pointer;
    &:hover {
      color: white;
    }
  }
  
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.7;
    }
    &::before {
      height: 4px;
      content: '';
      display: block;
      background-image: linear-gradient(
        to right,
        #ff3019 0%,
        #e2b04a 50%,
        #ff3019 100%
      );
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

export default Form;
