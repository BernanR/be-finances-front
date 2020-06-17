import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost'

const AUTH_TOKEN = 'apollo-token'

const link = new HttpLink({
  uri: 'http://192.168.15.148:4000'
})

/* intercepta o link e adiciona um novo header */
const authLink = new ApolloLink((operation, forward) => {
  const headers = operation.getContext().headers
  operation.setContext({
    headers: {
      ...headers,
      Authorization: `Bearer ${window.localStorage.getItem(AUTH_TOKEN)}`
    }
  })
  return forward(operation)
})

/* Limpa o cache quando o usuário fazer login */
const resetApolloClient = async apollo => {
  try {
    await apollo.resetStore()
  } catch (e) {
    console.log('%cError on cache reset', 'color: orange:', e.message)
  }
}

/* Salva o token no local storage */
const onLogin = async (apollo, token) => {
  if (typeof window.localStorage !== 'undefined' && token) {
    window.localStorage.setItem(AUTH_TOKEN, token)
  }
  /* Limpa o cache */
  await resetApolloClient(apollo)
}
/* apololink será responave de adicionar um novo link modificado com o header */
const apollo = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    link
  ]),
  cache: new InMemoryCache(),
  connectToDevsTools: process.env.NODE_ENV !== 'production'
})

export default apollo

export {
  AUTH_TOKEN,
  onLogin
}
