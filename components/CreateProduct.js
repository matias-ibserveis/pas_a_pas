import { useMutation, gql } from '@apollo/client';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import { useSession } from "next-auth/react";
import Router from 'next/router';
import { ALL_PRODUCTS_QUERY } from './Products'

// refetchQueries: https://github.com/apollographql/apollo-client/issues/3633
// " agilepapplications: first define appropriate cache policies:"

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in? And What types are they
    $ref: String!
    $name: String!
    $description: String!
    $categoria: String!
    $price: Float!
    $price2:  Float
    $pricetext: String  
    $enlace:  String
    $photo: String!
    $photo2: String!
    $photo3:   String
    $photo4:  String
    $userEmail: String!
  ) {
    createProduct(
      data: {
        ref: $ref
        name: $name
        description: $description
        status: "DISPONIBLE"
        categoria: $categoria
        price: $price
        price2: $price2
        pricetext: $pricetext
        enlace: $enlace
        photo: $photo
        photo2: $photo2
        photo3: $photo3
        photo4: $photo4
        userEmail: $userEmail
      }
    ) {
      id
      ref
      name
    }
  }
`;


export default function CreateProduct() {

  const { data: session, status } = useSession()
  const ahora = new Date()

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    id:'', createdAt:ahora, ref:'', name:'', price: 0, price2: 0, pricetext: '', 
    enlace:'', description:'', categoria:'', photo: '../images/default_image.jpg', 
    photo2: '../images/default_image.jpg', photo3: '../images/default_image.jpg', photo4: '../images/default_image.jpg', 
    userEmail: ''
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );


  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log("inputs en FORM", inputs);
        // Submit the inputfields to the backend:
        if (session) {
          inputs.userEmail = session?.user?.email || "no hay"
          const res = await createProduct();
          
          Router.push({
            pathname: `/products`,
          });
        
        }
        else {
         console.log("Registrate para subir un curso")
        }

        clearForm();
      }}
    >
      
      <DisplayError error={error} />

      <fieldset disabled={loading} aria-busy={loading}>
        
        <label htmlFor="ref">
          Ref
          <input required type="text"
            id="ref"
            name="ref"
            placeholder="Referencia"
            value={inputs.ref}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="name">
        Name
          <input required type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="price">
          Price
          <input type="number"
            id="price"
            name="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="categoria">
         Categoria
          <input type="text"
            id="categoria"
            name="categoria"
            placeholder="categoria"
            value={inputs.categoria}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="photo">
          Image
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleChange}
          />
        </label>

        <label htmlFor="photo2">
          Image2
          <input
            type="file"
            id="photo2"
            name="photo2"
            onChange={handleChange}
          />
        </label>

        <button type="submit">+ Subir Product</button>
      </fieldset>
    </Form>
  );
}
