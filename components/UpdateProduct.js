import { useMutation, useQuery, gql} from '@apollo/client';
import { useState,useEffect } from "react"
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import Editor from "./CKEcomponent"
import { UniqueInputFieldNamesRule } from 'graphql';
import { ALL_PRODUCTS_QUERY } from './Products'
import {SINGLE_ITEM_QUERY} from './SingleProduct'
import Router from 'next/router';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: String!
    $referencia: String!
    $name: String!
    $description: String!
    $status: String!
    $categoria: String!
    $price: Float
    $price2:Float
    $pricetext: String
    $enlace: String!
    $photo: String,
    $photo2: String,
    $photo3: String,
    $photo4: String,
    $userEmail: String!,
  ) {
    updateProduct(
      data: { 
        id: $id,
        ref: $referencia
        name: $name
        description: $description
        status:$status
        categoria:$categoria
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
    ) 
      {
        id
        ref
        name
        description
        price
      }
  }
`;

export default function UpdateProduct({identificador}) {

  const [editorLoaded, setEditorLoaded] = useState(false);                                      
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  // 1. We need to get the existing product
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      identificador,
    },
  });

  const {singleProduct} = data
  //console.table("singleproduct data", singleProduct)
 
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    id:singleProduct.id, createdAt:singleProduct.createdAt, ref:singleProduct.ref,
    name:singleProduct.name, description:singleProduct.description, 
    status:singleProduct.status, categoria:singleProduct.categoria,
    price: singleProduct.price, price2: singleProduct.price2, pricetext: singleProduct.pricetext, 
    enlace:singleProduct.enlace,  
    photo: singleProduct.photo, photo2: singleProduct.photo2, photo3: singleProduct.photo3, photo4:singleProduct.photo4, 
    userEmail: singleProduct.userEmail
  });

  //console.log("inputs description", inputs.description);

  const [ updateProduct, { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION,
    {
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }], 
    }
    );


  if (loading) return <p>loading...</p>;

  return (
    <Form
    onSubmit={async (e) => {
      e.preventDefault();
      const res = await updateProduct({
        variables: {
          id: inputs.id,
          referencia: inputs.ref,
          name: inputs.name,
          description: inputs.description,
          status: inputs.status,
          categoria: inputs.categoria,
          price: inputs.price,
          price2:inputs.price2,
          pricetext: inputs.pricetext,
          enlace: inputs.enlace,
          userEmail: inputs.userEmail,
          photo: inputs.photo,
          photo2: inputs.photo2,
          photo3: inputs.photo3,
          photo4: inputs.photo4
        },
      })
     
      Router.push({
        pathname: `/product/${res.data.updateProduct.id}`,
      });
  
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
          <Editor
            name="description"
            onChange={(data) => {
              inputs.description = data;
            } }
            editorLoaded={editorLoaded}   value={inputs.description}     />
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
      
        <button type="submit"> Modificar </button>

    </fieldset>
  </Form>
  );


}
