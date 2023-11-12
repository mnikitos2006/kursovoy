import styles from '../Body.module.css'
import { ModalWindow } from '../../ModalWindow/ModalWindow'
import { EditTask } from '../../Header/components/EditTask/EditTask'
import {useContext, useState} from 'react'
import { Button } from 'antd'
import {TaskManagerContext} from "../../Provider";
import dayjs from "dayjs";
import {EditOutlined,DeleteOutlined} from "@ant-design/icons";


export const TaskWrapper = (props) => {
  const { task, setTask } = props
  const [isVisible, setIsVisible] = useState(false)
  const {deleteTask} = useContext(TaskManagerContext)

  const onClick = () => {
    setIsVisible(true)
  }
  const deleteMessage = (id) => {
    deleteTask(id)
  }
  return (
    <>
      <div
        className={styles.task}
        key={task.id}
        style={{ borderColor: task.color }}
      >
        <div className={styles.container}>
          <span>{task.text}</span> <span>{task.category}</span>{' '}
          <span>{task.levelImportance} </span>
          <span>{dayjs(task.date).format("MM-DD-YYYY")}</span>
        </div>

        <div className={styles.btnContainer}>
            <EditOutlined onClick={onClick}/>
            <DeleteOutlined onClick={() => deleteMessage(task.id)}/>
        </div>
      </div>
      {isVisible && (
        <ModalWindow setIsVisible={setIsVisible}>
          <EditTask {...{ task, setTask }} />
        </ModalWindow>
      )}
    </>
  )
}
