import styles from '../Body.module.css'
import { ModalWindow } from '../../ModalWindow/ModalWindow'
import { EditTask } from '../../Header/components/EditTask/EditTask'
import { useContext, useState } from 'react'
import { Button } from 'antd'
import { TaskManagerContext } from '../../Provider'
import dayjs from 'dayjs'
import {EditOutlined, DeleteOutlined, CheckCircleOutlined} from '@ant-design/icons'
import { HighlightedText } from './HighlightedText/HighlightedText'
import cls from 'classnames'
import { Status } from '../../Provider/data'

export const TaskWrapper = (props) => {
  const { task, setTask } = props
  const [isVisible, setIsVisible] = useState(false)
  const { deleteTask, search, doneTask } = useContext(TaskManagerContext)

  const isDone=task.status===Status.done
  const onClick = () => {
    if (!isDone){
      setIsVisible(true)
    }

  }
  const deleteMessage = (id) => {
    if (!isDone){
      deleteTask(id)
    }

  }
  const checkedTask = (id) => {
    if (!isDone){
      doneTask(id)
    }

  }

  return (
    <>
      <div
        className={styles.task}
        key={task.id}
        style={{ borderColor: task.color }}
      >
        <div className={styles.container}>
          <HighlightedText
            className={cls(isDone && styles.throud)}
            search={search}
            text={task.text}
          />
          <span className={cls(isDone && styles.throud)}>
            {task.category}
          </span>
          <span className={cls(isDone && styles.throud)}>
            {task.levelImportance}
          </span>
          <span className={cls(isDone && styles.throud)}>{dayjs(task.date).format('MM-DD-YYYY')}</span>
        </div>

        <div className={styles.btnTask}>
          {!isDone&& <CheckCircleOutlined className={styles.done} onClick={()=>checkedTask(task.id)}/>}

          <EditOutlined  className={styles.edit} onClick={onClick} />
          <DeleteOutlined  className={styles.delete} onClick={() => deleteMessage(task.id)} />

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
