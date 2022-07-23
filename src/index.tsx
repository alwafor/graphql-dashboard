import React from 'react'
import ReactDOM from 'react-dom/client'

import './assets/styles/global.css'

import App from './components/app'

import {ApolloProvider} from '@apollo/client'
import {BrowserRouter} from 'react-router-dom'
import {client} from './graphql/client'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </BrowserRouter>
)
