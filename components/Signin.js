
import styled from 'styled-components';
import { signIn, signOut, useSession } from "next-auth/react";


export default function Signin() {

  const { data: session, status } = useSession()

  if (status === "authenticated") {
    return (
    <>
      <p>{session?.user?.email?.split('@')[0]} </p>
      <button onClick={() => signOut()}>Sign out</button>
    </>
    )
  }

  return (
    <SignStyles>
      <div className="boton"> 
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    </SignStyles>
  );
}



const SignStyles = styled.div`
  .boton {
    border: 10px solid var(--black, black);

  }
`;