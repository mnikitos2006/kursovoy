import { useContext, useEffect } from 'react'
import styles from './Body.module.css'
import { TaskManagerContext } from '../Provider'
import { TaskWrapper } from './component/taskWrapper'
import {levelImportance, Status} from "../Provider/data";
import {FilterWrapper} from "./component/filterWrapper/FilterWrapper";

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
    const sortTask=  tasks.sort((a,b)=>
            compareDifficulty(a.levelImportance,b.levelImportance))
  return (
    <div className={styles.container}>
      <div>Tasks</div>
      <div>
        {tasks.length === 0 && <div>Нет задач</div>}
          <div className={styles.wrapperStatus}>
              <FilterWrapper tasks={sortTask} status={Status.new} setTask={setTask}/>
              <FilterWrapper tasks={sortTask} status={Status.inWork} setTask={setTask}/>
              <FilterWrapper tasks={sortTask} status={Status.done} setTask={setTask}/>
          </div>
      </div>
    </div>
  )
}
