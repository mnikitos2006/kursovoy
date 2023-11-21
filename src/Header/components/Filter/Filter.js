import { levelImportance } from '../../../Provider/data'
import { Button } from 'antd'
import { useContext } from 'react'
import { TaskManagerContext } from '../../../Provider'
import isEmpty from 'lodash/isEmpty'
import styles from './filter.module.css'

export const Filter = () => {
  const { setFilter, filter } = useContext(TaskManagerContext)

  return (
    <div className={styles.container}>
      {Object.values(levelImportance).map((el) => (
        <Button
          type={el === filter.levelImportance ? 'primary' : 'default'}
          onClick={() => setFilter({ levelImportance: el })}
        >
          {el}
        </Button>
      ))}
      <Button
        type={isEmpty(filter) ? 'primary' : 'default'}
        onClick={() => setFilter({})}
      >
        Все
      </Button>
    </div>
  )
}
