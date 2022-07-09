import { ApolloServer, gql } from "apollo-server-micro";

import {listado_n_productos, deleteproducto} from '../api/dbprisma/db_functions'

import {
  nuevoproducto,
  listadotodosproductos,
  unproducto,
  updateproducto,
  unusuario,
} from "../api/dbprisma/db_functions";

const { DateTimeResolver } = require("graphql-scalars");

const typeDefs = gql`

  type Producto {
    id: String!
    createdAt: DateTime!
    ref: String!
    name: String!
    description: String!
    status: String!
    categoria: String!
    price: Float
    price2: Float
    pricetext: String
    enlace: String!
    photo: String
    photo2: String
    photo3: String
    photo4: String
    userEmail: String!
  }

  type User {
    id: String!
    name: String!
    email: String!
    password: String!
  }

  type Query {
    allProducts: [Producto]
    nProducts(numero: Int!): [Producto]
    singleProduct(identificador: String!): Producto
    singleUser(email: String!): User
  }

  input ProductInput {
    id: String!
    ref: String!
    name: String!
    description: String!
    status: String!
    categoria: String!
    price: Float
    price2: Float
    pricetext: String
    enlace: String!
    photo: String
    photo2: String
    photo3: String
    photo4: String
    userEmail: String!
  }

  type Mutation {
    createProduct(data: ProductInput): Producto
    updateProduct(data: ProductInput): Producto
    deleteProduct(identificador: String!): Producto
  }

  scalar DateTime
`;

const resolvers = {
  DateTime: DateTimeResolver,

  Query: {
    allProducts: () => {
      const listaproductos = listadotodosproductos();
      return listaproductos;
    },

    nProducts: async (root, {numero}) => {
      const respuesta = await listado_n_productos(numero)
      return respuesta
    },

    singleProduct: async (root, { identificador }) => {
      const respuesta = await unproducto(identificador);
      //console.log("singleProduct en server", respuesta)
      return respuesta;
    },

    singleUser: async (root, { email }) => {
      const respuesta = await unusuario(email);
      return respuesta;
    },
  },

  Mutation: {
    createProduct: async (root, { data }) => {
      console.log("datainput en graphserver", data)
      const nuevo = await nuevoproducto(data);
      return nuevo;
    },

    updateProduct: async (root, {data}) => {
      const modif = await updateproducto(data)
      console.log("modif en server", modif)
      return modif
    },

    deleteProduct: async (root, {identificador}) => {
      const elimina = await deleteproducto(identificador)
      return elimina
    }

  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql_server",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
