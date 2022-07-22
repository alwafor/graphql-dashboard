import {ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache} from '@apollo/client'

const httpLink = new HttpLink({ uri: 'https://gravitel-graphql-backend.herokuapp.com/' });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || null,
    }
  }));

  return forward(operation);
})

export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
});

console.log(localStorage.getItem('token'))