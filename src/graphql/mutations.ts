import {gql} from '@apollo/client'

export const MUTATION_LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      token
    }
  }  
`