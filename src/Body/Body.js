import { useContext, useEffect } from 'react'
import styles from './Body.module.css'
import { TaskManagerContext } from '../Provider'
import { levelImportance } from '../Provider/data'
import DraggAndDrop from './component/draggAndDrop/DraggAndDrop'

export const Body = () => {
  const { tasks, setTask, fetchTasks } = useContext(TaskManagerContext)
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
  return (
    <div className={styles.container}>
      {tasks.length === 0 && <div>Нет задач</div>}
      <DraggAndDrop sortTask={sortTask} setTask={setTask} />
    </div>
  )
}
