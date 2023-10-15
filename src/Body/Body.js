import { useContext, useEffect } from 'react'
import styles from './Body.module.css'
import { TaskManagerContext } from '../Provider'
import { TaskWrapper } from './component/taskWrapper'
import {levelImportance} from "../Provider/data";

export const Body = () => {
  const { tasks, setTask, fetchTasks } = useContext(TaskManagerContext)
  useEffect(() => {
    fetchTasks().then((result) => {
      setTask(result)
    })
  }, [])
    const compareDifficulty = (a, b) => {
        const order = { [levelImportance.hard]: 1, [levelImportance.normal]: 2, [levelImportance.easy]: 3 };
        console.log(a)
        console.log(order)
        return order[a] - order[b];
    };
  console.log(tasks)
  return (
    <div className={styles.container}>
      <div>Tasks</div>
      <div>
        {tasks.length === 0 && <div>Нет задач</div>}
        {tasks.sort((a,b)=>
            compareDifficulty(a.levelImportance,b.levelImportance)).map((task, index) => (
          <TaskWrapper key={index} task={task} setTask={setTask} />
        ))}
      </div>
    </div>
  )
}
