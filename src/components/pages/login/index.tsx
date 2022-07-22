import React from 'react'
import {useMutation, useQuery} from '@apollo/client'
import {MUTATION_LOGIN} from '../../../graphql/mutations'
import styles from './index.module.css'
import {QUERY_ME} from '../../../graphql/queries'
import {Navigate} from 'react-router-dom'

interface IProps {

}

export const LoginPage: React.FC<IProps> = () => {

  const {data: dataMe, loading: loadingMe, error: errorMe} = useQuery(QUERY_ME)
  const [login, {data: dataLogin, loading: loadingLogin, error: errorLogin}] = useMutation(MUTATION_LOGIN)

  if(dataMe) return <Navigate to={'/dashboard'}/>

  if(errorLogin || errorMe) return <div>Ошибка!</div>
  if(loadingLogin || loadingMe) return <div>Загрузка...</div>

  const handleLoginButtonClick = () => {
    login({variables: {username: 'Alan', password: 'Walker'}})
  }

  return <div className={styles.wrapper}>
    Hello
  </div>
}