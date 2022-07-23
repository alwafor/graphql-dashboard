import React from 'react'
import styles from './index.module.css'
import classNames from 'classnames'

import {Diagram} from './diagram'
import {useNavigate} from 'react-router-dom'
import {useQuery} from '@apollo/client'
import {IQueryDashboard, QUERY_DASHBOARD} from '../../../graphql/queries'

import imgIconLogout from './../../../assets/images/icons/icon-logout.png'

export const DashboardPage: React.FC = () => {

  const {data, loading, error} = useQuery<IQueryDashboard>(QUERY_DASHBOARD)
  const navigate = useNavigate()

  if (error) return <div className={classNames(styles.root, styles.full)}>Произошла ошибка! Повторите попытку
    позже!</div>

  if (loading || !data) return <div className={classNames(styles.root, styles.full)}>Загрузка...</div>

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login', {replace: true})
  }

  return <div className={styles.root}>
    <header className={styles.header}>
      <span>Сводка</span>
      <button className={styles.btnLogout} onClick={logout}>
        <img src={imgIconLogout} alt="Выход"/>
      </button>
    </header>
    <div className={styles.diagrams}>
      <Diagram title={'Сценарии'} {...data.dashboard.scenarios}/>
      <Diagram title={'Списки'} {...data.dashboard.lists}/>
      <Diagram title={'Диалоги'} {...data.dashboard.dialogs}/>
    </div>
  </div>
}

