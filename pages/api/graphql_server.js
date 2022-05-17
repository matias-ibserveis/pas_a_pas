import { ApolloServer, gql } from 'apollo-server-micro';
import prisma from '../../lib/prisma'
import {nuevoproducto, listadotodosproductos} from '../api/dbprisma/db_functions'

const { DateTimeResolver } = require('graphql-scalars')

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
      enlace:  String
      photo:   String
      photo2:  String
      photo3:  String
      photo4:  String
      userEmail: String!
    }

  type Query {
    allProducts: [Producto]
  }

  input ProductInput {
      ref: String!
      name: String!
      description: String!
      status: String!
      categoria: String!
      price: Float
      price2: Float
      pricetext: String
      enlace:  String
      photo:   String
      photo2:  String
      photo3:  String
      photo4:  String
      userEmail:  String!
}

  type Mutation {
    createProduct(data: ProductInput): Producto
}

  scalar DateTime
`

const resolvers = {

  DateTime: DateTimeResolver,

  Query: {
    allProducts: () => {
      const listaproductos = listadotodosproductos()
      return listaproductos
    },
  },

  Mutation: {
    createProduct: (root, {data}) => {
      console.log("datainput en graphserver", data)
      nuevoproducto(data)
    }
  }

  
};


const apolloServer = new ApolloServer({typeDefs,resolvers,})
const startServer = apolloServer.start()

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

