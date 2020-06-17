import apollo, { onLogin } from '@/plugins/apollo'
import LoginMutation from './../graphql/Login.gql'
import SignUpMutation from './../graphql/SignUp.gql'
import UserQuery from './../graphql/User.gql'

/* As configurações de login estão no arquivo appolo */
const login = async variables => {
  const response = await apollo.mutate({
    mutation: LoginMutation,
    variables
  })
  const login = response.data.login
  await onLogin(apollo, login.token)
  return login
}

const signup = async variables => {
  const response = await apollo.mutate({
    mutation: SignUpMutation,
    variables
  })
  const { signup } = response.data.signup
  await onLogin(apollo, signup.token)
  return signup
}

const user = async (options = {}) => {
  const response = await apollo.query({
    query: UserQuery,
    ...options
  })
  return response.data.user
}

export default {
  login,
  signup,
  user
}
