import { useMutation, gql } from '@apollo/client';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import { useSession } from "next-auth/react";
import Router from 'next/router';
import { ALL_PRODUCTS_QUERY } from './Products'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState,useEffect } from "react"
import Editor from "../components/CKEcomponent"

// refetchQueries: https://github.com/apollographql/apollo-client/issues/3633
// " agilepapplications: first define appropriate cache policies:"

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in? And What types are they
    $id: String!
    $ref: String!
    $name: String!
    $description: String!
    $categoria: String!
    $price: Float!
    $price2:  Float
    $pricetext: String  
    $enlace:  String!
    $photo: String!
    $photo2: String!
    $photo3:   String
    $photo4:  String
    $userEmail: String!
  ) {
    createProduct(
      data: {
        id: $id
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

  const [editorLoaded, setEditorLoaded] = useState(false);                                      
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    id:'000', createdAt:ahora, ref:'', name:'', price: 0, price2: 0, pricetext: '', 
    enlace:'no hay enlace', description:'', categoria:'', photo: '../images/default_image.jpg', 
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
        //console.log("inputs en FORM", inputs);
     
        if (session) {
          inputs.userEmail = session?.user?.email || "no hay"
          const res = await createProduct();
          console.log("res", res)
          
          Router.push({
            pathname: `/product/${res.data.createProduct.id}`,
          });
        
        }
        else {
          toast.error("Registrate para subir un producto", {
            theme: "colored"
          })

        }

        clearForm();
      }}
    >
      
      <DisplayError error={error} />

      <fieldset disabled={loading} aria-busy={loading}>
        
        <label htmlFor="ref">
          Ref
          <input type="text"
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
          <Editor
            name="description"
            onChange={(data) => {
              inputs.description = data;
            } }
            editorLoaded={editorLoaded} value={undefined}         />
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
