import React from 'react'
import styles from './index.module.css'

import {Diagram, TestDiagram} from './diagram'
import {useQuery} from '@apollo/client'
import {QUERY_DASHBOARD} from '../../../graphql/queries'

interface IProps {

}

export const DashboardPage: React.FC<IProps> = () => {

  // const {data, loading, error} = useQuery(QUERY_DASHBOARD)
  // if(error) return <div>Error!</div>
  // if(loading) return <div>Loading...</div>
  //
  // console.log(data)

  return <div>
    <div className={styles.diagrams}>
      <TestDiagram title={'Сценарии'} active={78} completed={78} inactive={42}/>
      <TestDiagram title={'Списки'} active={78} completed={78} inactive={42}/>
      <TestDiagram title={'Диалоги'} active={78} completed={78} inactive={42}/>
    </div>
  </div>
}

