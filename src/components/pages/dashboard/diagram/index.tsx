import React, {useMemo, useState} from 'react'
import {IStatistic, IStatisticKeys} from '../../../../graphql/queries'

import styles from './index.module.css'
import classNames from 'classnames'

interface IProps extends IStatistic {
  title: string
}

export const Diagram: React.FC<IProps> = ({title, ...props}) => {

  const values = {
    ...props,
    sum: props.completed + props.active + props.inactive
  }

  const [currentValue, setCurrentValue] = useState<IStatisticKeys | 'sum'>('sum')
  const [isAllSelected, setIsAllSelected] = useState(false)

  const activeOffset = useMemo(() => values.active / values.sum * 100, [values.active, values.sum])
  const inactiveOffset = useMemo(() => values.inactive / values.sum * 100, [values.inactive, values.sum])
  const completedOffset = useMemo(() => values.completed / values.sum * 100, [values.completed, values.sum])

  const createMouseHandlers = (value: IStatisticKeys | 'sum') => ({
    onMouseEnter: () => setCurrentValue(value),
    onMouseLeave: () => setCurrentValue('sum')
  })

  return <div className={styles.root}>
    <div className={styles.chartRoot}>
      <svg className="chart" width="300" height="300" viewBox="0 0 50 50">

        <circle
          className={classNames(styles.unit, styles.completed, {[styles.hovered]: isAllSelected || currentValue === 'completed'})}
          style={{
            strokeDasharray: `${completedOffset} 100`,
            strokeDashoffset: `-${activeOffset + inactiveOffset}`
          }}
          r="15.9" cx="50%" cy="50%"
          {...createMouseHandlers('completed')}
        />

        <circle
          className={classNames(styles.unit, styles.inactive, {[styles.hovered]: isAllSelected || currentValue === 'inactive'})}
          style={{
            strokeDasharray: `${inactiveOffset} 100`,
            strokeDashoffset: `-${activeOffset}`
          }}
          r="15.9" cx="50%" cy="50%"
          {...createMouseHandlers('inactive')}
        />

        <circle
          className={classNames(styles.unit, styles.active, {[styles.hovered]: isAllSelected || currentValue === 'active'})}
          style={{
            strokeDasharray: `${activeOffset} 100`
          }}
          r="15.9" cx="50%" cy="50%"
          {...createMouseHandlers('active')}
        />

      </svg>

      <div className={styles.chartInnerContent}>
        <div className={styles.title}>{title}</div>
        <div className={styles.mainValue}>{values[currentValue]}</div>
      </div>

    </div>
    <div className={styles.legend}>

      <button
        className={classNames(styles.legendItem, styles.legendItemAll)}
        onMouseEnter={() => {
          setCurrentValue('sum')
          setIsAllSelected(true)
        }}
        onMouseLeave={() => {
          setIsAllSelected(false)
        }}
      >
        <span>Всего:</span>
        <span>{values.sum}</span>
      </button>

      <button
        className={classNames(styles.legendItem, {[styles.hovered]: currentValue === 'active'})}
        {...createMouseHandlers('active')}
      >
        <span>Активных:</span>
        <span>{values.active}</span>
      </button>

      <button
        className={classNames(styles.legendItem, {[styles.hovered]: currentValue === 'inactive'})}
        {...createMouseHandlers('inactive')}
      >
        <span>Неактивных:</span>
        <span>{values.inactive}</span>
      </button>

      <button
        className={classNames(styles.legendItem, {[styles.hovered]: currentValue === 'completed'})}
        {...createMouseHandlers('completed')}
      >
        <span>Завершённых:</span>
        <span>{values.completed}</span>
      </button>
    </div>
  </div>
}