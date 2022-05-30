import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import styled from "styled-components";
import DisplayError from "./ErrorMessage";

const SINGLE_ITEM_QUERY = gql`
  query singleUser($userCorreo: String!) {
    singleUser(email: $userCorreo) {
      id
      name
      email
    }
  }
`;

export default function SingleUser({ userCorreo }) {
  console.log("uEmail en singleUser nuevo", userCorreo);
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      userCorreo,
    },
  });

  console.log("data singleuser", data);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { singleUser } = data;

  return (
    <UserStyles>
      <Head>
        <title>Sick Fits | {singleUser.name}</title>
      </Head>

      <div className="details">
        <h2>{singleUser.name}</h2>
        <p>{singleUser.email}</p>
      </div>
    </UserStyles>
  );
}

const UserStyles = styled.div`
  display: flex;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;
