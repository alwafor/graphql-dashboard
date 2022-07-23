import React from 'react'
import {Navigate, Outlet, useLocation} from 'react-router-dom'
import {useQuery} from '@apollo/client'
import {QUERY_ME} from '../../../graphql/queries'

import styles from './index.module.css'

export const RequireAuth: React.FC = () => {
  const {loading, error} = useQuery(QUERY_ME)
  const location = useLocation()

  if (loading) return <div className={styles.root}>Загрузка...</div>

  if (error) {
    return <Navigate to="/login" state={{from: location}}/>
  }

  return <Outlet/>
}