import React from 'react'
import {Navigate, Outlet, useLocation} from 'react-router-dom'
import {useQuery} from '@apollo/client'
import {QUERY_ME} from '../../graphql/queries'

interface IProps {

}

export const RequireAuth: React.FC<IProps> = () => {
  const {data, loading, error} = useQuery(QUERY_ME, {})
  const location = useLocation()

  if (loading) return <div>Загрузка...</div>
  if (error) {
    console.log(error)
    return <Navigate to="/login" state={{from: location}}/>
  }

  return <Outlet/>
}