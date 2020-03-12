import { ApolloClient, Httplink, InMemoryCache } from 'apollo-boost'

const link = new Httplink({
  uri: 'http/localhost:4000'
})

const apollo = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevsTools: process.env.NODE_ENV !== 'production'
})

export default apollo
