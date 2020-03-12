import apollo from '@plugins/apollo'
import LoginMutation from './../graphql/Login.gql'

const login = async variables => {
  const response = await apollo.mutate({
    mutate: LoginMutation,
    variables
  })
  return response.data.login
}

export default {
  login
}
