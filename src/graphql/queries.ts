import {gql} from '@apollo/client'

export const QUERY_ME = gql`
  query Me {
    me {
      username
      token
    }
  }
`

export const QUERY_DASHBOARD = gql`
  fragment StatisticFragment on Statistic {
    active
    inactive
    completed
  }
  
  query Dashboard {
    dashboard {
      scenarios {
        ...StatisticFragment
      }
      lists {
        ...StatisticFragment
      }
       dialogs{
        ...StatisticFragment
      }
    }
  }
`

export interface IStatistic {
  active: number
  inactive: number
  completed: number
}

export interface IQueryDashboard {
  dashboard: {
    scenarios: IStatistic
    lists: IStatistic
    dialogs: IStatistic
  }
}