import React from 'react'
import styles from './index.module.css'

import {Route, Routes} from 'react-router-dom'
import {RequireAuth} from '../utils/require-auth'

import {LoginPage} from '../pages/login'
import {DashboardPage} from '../pages/dashboard'

const App: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Routes>
        <Route path={'/login'} element={<LoginPage/>}/>
        <Route element={<RequireAuth/>}>
          <Route path={'/'} element={<DashboardPage/>}/>
          <Route path={'/dashboard'} element={<DashboardPage/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
