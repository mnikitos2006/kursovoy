import React, { useContext, useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Status } from '../../../Provider/data'
import { TaskContainer } from '../../../Header/components/TaskContainer/TaskContainer'
import { TaskWrapper } from '../taskWrapper'
import { TaskManagerContext } from '../../../Provider'
import styles from './DraggAndDrop.module.css'
import cls from 'classnames'

const getColumns = (tasks) => ({
  'column-1': {
    id: Status.new,
    title: 'Новое',
    taskIds: tasks.filter((el) => el.status === Status.new),
  },
  'column-2': {
    id: Status.inWork,
    title: 'В работе',
    taskIds: tasks.filter((el) => el.status === Status.inWork),
  },
  'column-3': {
    id: Status.done,
    title: 'Готово',
    taskIds: tasks.filter((el) => el.status === Status.done),
  },
})
const Board = (props) => {
  const { editTask } = useContext(TaskManagerContext)
  const { sortTask, setSortedTask } = props
  const [columnsData, setColumnsData] = useState(getColumns(sortTask))

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result

    if (!destination) {
      return // Добавляем проверку на наличие destination
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }
    console.log(result)
    console.log(result.destination.droppableId)
    const changeTask = sortTask.find((el) => el.id === result.draggableId)

    editTask(
      changeTask.text,
      changeTask.color,
      changeTask.category,
      changeTask.levelImportance,
      changeTask.date,
      result.destination.droppableId,
      changeTask.id
    )
  }

  useEffect(() => {
    if (sortTask.length) {
      setColumnsData(getColumns(sortTask))
    }
  }, [sortTask])
  return (
    <div className={styles.container}>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.values(columnsData).map(
          (column) =>
             (
              <Droppable droppableId={column.id} key={column.id}>
                {(provided) => (
                  <div
                    className={cls(styles.column, {
                      [styles.new]: column.id === Status.new,
                      [styles.inWork]: column.id === Status.inWork,
                      [styles.done]: column.id === Status.done,
                    })}
                  >
                    <h3 className={styles.title}>{column.title}</h3>
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {column.taskIds.map((taskId, index) => {
                        return (
                          <Draggable
                            draggableId={taskId.id}
                            index={index}
                            key={taskId}
                          >
                            {(provided) => (
                              <div
                                className={styles.task}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {taskId && (
                                  <TaskWrapper
                                    key={index}
                                    task={taskId}
                                    setTask={setSortedTask}
                                  />
                                )}
                              </div>
                            )}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            )
        )}
      </DragDropContext>
    </div>
  )
}

export default Board
