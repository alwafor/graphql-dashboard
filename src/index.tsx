import React from 'react'
import ReactDOM from 'react-dom/client'

import './assets/styles/reset.css'
import './assets/styles/global.css'

import App from './App'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://gravitel-graphql-backend.herokuapp.com/',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
)
