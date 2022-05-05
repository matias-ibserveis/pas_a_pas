import { ApolloServer, gql } from 'apollo-server-micro';
import prisma from '../../lib/prisma'
const { DateTimeResolver } = require('graphql-scalars')

const typeDefs = gql`
  type Producto {
      id: String!
      createdAt: DateTime!
      ref: String!
      name: String!
      description: String!
      categoria: String!
      price: Float
  }
  
  type Query {
    allProducts: [Producto]
  }

  scalar DateTime
`

async function database() {
  const lecturaproductos = await prisma.product.findMany({
    take:8,
    orderBy:{
      name: "desc"
    }
  })
  return lecturaproductos
}


const resolvers = {

  DateTime: DateTimeResolver,

  Query: {

    allProducts: () => {
      const listaproductos = database()
      return listaproductos
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

