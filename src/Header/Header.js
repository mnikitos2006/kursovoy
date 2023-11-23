import styles from './Header.module.css'
import { ReactComponent as Plus } from '../img/pluse.svg'
import { useContext, useState } from 'react'
import { ModalWindow } from '../ModalWindow/ModalWindow'

import { TaskManagerContext } from '../Provider'
import { TaskContainer } from './components/TaskContainer/TaskContainer'
import { AddTask } from './components/AddTask/AddTask'
import { Button } from 'antd'
import { Filter } from './components/Filter/Filter'
import {SearchInput} from "./components/SearchInput/SearchInput";

export const Header = () => {
  const { isVisibleAddTask, setIsVisibleAddTask, fetchLogout, user } =
    useContext(TaskManagerContext)

  return (
    <div>
      <div className={styles.header}>
        <Button onClick={fetchLogout}> Выход</Button>
        <h1>Tasks Manager {user?.name || ''}</h1>
        <Plus onClick={() => setIsVisibleAddTask(true)} />
      </div>
      <Filter />
        <SearchInput/>

      {isVisibleAddTask && (
        <ModalWindow setIsVisible={setIsVisibleAddTask}>
          <AddTask />
        </ModalWindow>
      )}
    </div>
  )
}
