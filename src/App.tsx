import React from 'react'
import styles from './App.module.css'
import {Route, Routes} from 'react-router-dom'
import {LoginPage} from './components/pages/login'
import {RequireAuth} from './components/utils/require-auth'
import {DashboardPage} from './components/pages/dashboard'

function App() {

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
