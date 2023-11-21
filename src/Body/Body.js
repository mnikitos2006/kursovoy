import { useContext, useEffect, useMemo } from 'react'
import styles from './Body.module.css'
import { TaskManagerContext } from '../Provider'
import { levelImportance } from '../Provider/data'
import DraggAndDrop from './component/draggAndDrop/DraggAndDrop'
import isEmpty from 'lodash/isEmpty'
import {Notfound} from "./component/Notfound/Notfound";

export const Body = () => {
  const { tasks, setTask, fetchTasks, filter } = useContext(TaskManagerContext)
  useEffect(() => {
    fetchTasks().then((result) => {
      setTask(result)
    })
  }, [])
  const compareDifficulty = (a, b) => {
    const order = {
      [levelImportance.hard]: 1,
      [levelImportance.normal]: 2,
      [levelImportance.easy]: 3,
    }
    return order[a] - order[b]
  }
  const sortTask = tasks.sort((a, b) =>
    compareDifficulty(a.levelImportance, b.levelImportance)
  )

  const filterTask = () => {
    if (isEmpty(filter)) {
      return sortTask
    } else {
      return sortTask.filter((el) => {
        return el.levelImportance === filter.levelImportance
      })
    }
  }
  return (
    <div className={styles.container}>
      {tasks.length === 0 ? <Notfound/>:
      <DraggAndDrop sortTask={filterTask()} setTask={setTask} />}
    </div>
  )
}
