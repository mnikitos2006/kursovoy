import { useContext, useEffect } from 'react'
import styles from './Body.module.css'
import { TaskManagerContext } from '../Provider'
import { TaskWrapper } from './component/taskWrapper'
import {BASE_URL} from "../constants/constants";

const getTasks = async () => {
  let response = await fetch(BASE_URL)
  console.log('response', response)

  let commits = await response.json() // читаем ответ в формате JSON
  console.log('commit', commits)
  return commits
}
export const Body = () => {
  const { tasks, setTask } = useContext(TaskManagerContext)
  useEffect(() => {
      getTasks().then((result)=>{
          setTask(result)
      })
  }, [])

  console.log(tasks)
  return (
    <div className={styles.container}>
      <div>Tasks</div>
      <div>
        {tasks.length === 0 && <div>Нет задач</div>}
        {tasks.map((task, index) => (
          <TaskWrapper key={index} task={task} setTask={setTask} />
        ))}
      </div>
    </div>
  )
}
