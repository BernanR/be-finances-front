import apollo, { onLogin } from '@/plugins/apollo'
import LoginMutation from './../graphql/Login.gql'
import SignUpMutation from './../graphql/SignUp.gql'

const login = async variables => {
  const response = await apollo.mutate({
    mutation: LoginMutation,
    variables
  })
  console.log('variables', variables)
  const { login } = response.data.login
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

export default {
  login,
  signup
}
