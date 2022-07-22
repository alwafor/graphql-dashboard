import React from 'react'
import {useMutation} from '@apollo/client'
import {MUTATION_LOGIN} from './graphql/mutations'

function App() {

  const [login, {data, loading, error}] = useMutation(MUTATION_LOGIN)

  if(loading) return <div>loading</div>
  if(error) return <div>error!</div>

  console.log(data)

  const handleLoginButtonClick = () => {
    login({variables: {username: 'Alan', password: 'Walker'}})
  }

  return (
    <div className="wrapper">
      <button onClick={handleLoginButtonClick}>Нажми</button>
    </div>
  );
}

export default App;
