import React, {useState} from 'react'
import {useMutation, useQuery} from '@apollo/client'
import {IMutationLoginData, IMutationLoginVars, MUTATION_LOGIN} from '../../../graphql/mutations'
import styles from './index.module.css'
import {QUERY_ME} from '../../../graphql/queries'
import {Navigate} from 'react-router-dom'

export const LoginPage: React.FC = () => {

  const {data: dataMe, loading: loadingMe} = useQuery(QUERY_ME, {fetchPolicy: 'no-cache'})

  const [login, {
    data: dataLogin,
    loading: loadingLogin,
    error: errorLogin
  }] = useMutation<IMutationLoginData, IMutationLoginVars>(MUTATION_LOGIN)

  const [inputLoginValue, setInputLoginValue] = useState('')
  const [inputPasswordValue, setInputPasswordValue] = useState('')

  if (loadingMe) return <div className={styles.wrapper}>Загрузка...</div>

  // Если пользователь уже авторизован - переходим на основную страницу
  if (dataMe) return <Navigate to={'/dashboard'} replace/>

  // Авторизация успешна - записываем токен и перенаправляем на dashboard страницу
  if (dataLogin) {
    localStorage.setItem('token', dataLogin.login.token)
    return <Navigate to={'/dashboard'} replace/>
  }

  const handleLoginButtonClick = () => {
    login({variables: {username: inputLoginValue, password: inputPasswordValue}})
  }

  const formNotification = () => {
    return errorLogin ? `Ошибка! Неверный логин или пароль!` : loadingLogin ? `Загрузка...` : ''
  }

  return <form className={styles.wrapper} onSubmit={e => e.preventDefault()}>
    <h2 className={styles.title}>Вход</h2>
    <p className={styles.paragraph}>Уникальная технология доступна для вашего бизнеса прямо сейчас!</p>

    <input
      className={styles.input}
      type="text"
      maxLength={60}
      placeholder={'Логин'}

      value={inputLoginValue}
      onChange={e => setInputLoginValue(e.target.value)}
    />

    <input
      className={styles.input}
      type="password"
      placeholder={'Пароль'}

      value={inputPasswordValue}
      onChange={e => setInputPasswordValue(e.target.value)}
    />

    <div className={styles.notification}>{formNotification()}</div>
    <button className={styles.button} onClick={handleLoginButtonClick}>Войти</button>
  </form>
}