import {gql} from '@apollo/client'

export interface IMutationLoginData {
  login: {
    username: string
    token: string
  }
}

export interface IMutationLoginVars {
  username: string
  password: string
}

export const MUTATION_LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      token
    }
  }  
`