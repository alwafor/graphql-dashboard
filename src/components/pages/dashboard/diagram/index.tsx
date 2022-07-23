import React, {useState} from 'react'
import styles from './index.module.css'
import {IStatistic} from '../../../../graphql/queries'

interface IProps extends IStatistic {
  title: string
}

export const Diagram: React.FC = () => {

  return <div className={styles.root}>
    <div className={styles.circle}>
      <svg>
        <circle className={styles.cCompleted} cx={70} cy={70} r={70}></circle>
        <circle className={styles.cInactive} cx={70} cy={70} r={70}></circle>
        <circle className={styles.cActive} cx={70} cy={70} r={70}></circle>
      </svg>
      <div className={styles.circleInner}>
        <h2>87</h2>
      </div>
    </div>
  </div>
}

export const TestDiagram: React.FC<IProps> = ({title, active, completed, inactive}) => {

  const [currentValue, setCurrentValue] = useState()

  const sum = active + completed + inactive

  const activeOffset = Math.floor(active / sum * 100)
  const inactiveOffset = Math.floor(inactive / sum * 100)
  const completedOffset = Math.floor(completed / sum * 100)



  return <div className={styles.testRoot}>
    <div className={styles.chartRoot}>
      <svg className="chart" width="250" height="250" viewBox="0 0 50 50">
        <circle className={styles.unit}
                style={{
                  strokeDasharray: `${completedOffset} 100`,
                  strokeDashoffset: `-${activeOffset + inactiveOffset}`
                }}
                r="15.9" cx="50%" cy="50%"
        />
        <circle className={styles.unit}
                style={{strokeDasharray: `${inactiveOffset} 100`, strokeDashoffset: `-${activeOffset}`}}
                r="15.9" cx="50%" cy="50%"
        />
        <circle className={styles.unit}
                style={{strokeDasharray: `${activeOffset} 100`}}
                r="15.9" cx="50%" cy="50%"
        />
      </svg>
      <div className={styles.chartInnerContent}>
        <div className={styles.title}>{title}</div>
        <div className={styles.mainValue}>{13}</div>
      </div>
    </div>
    <div className={styles.legend}>
      <button className={styles.legendItem}><span>Всего:</span> <span>{sum}</span></button>
      <button className={styles.legendItem}><span>Активных:</span> <span>{active}</span></button>
      <button className={styles.legendItem}><span>Неактивных:</span> <span>{inactive}</span></button>
      <button className={styles.legendItem}><span>Завершённых:</span> <span>{completed}</span></button>
    </div>
  </div>
}