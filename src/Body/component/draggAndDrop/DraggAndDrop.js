import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Status } from '../../../Provider/data'
import { TaskContainer } from '../../../Header/components/TaskContainer/TaskContainer'
import { TaskWrapper } from '../taskWrapper'

const Board = (props) => {
  const { sortTask, setTask: setSortedTask } = props
  const initialTasks = sortTask

  const columns = {
    'column-1': {
      id: Status.new,
      title: 'Новое',
      taskIds: initialTasks.map((task) => task.id),
    },
    'column-2': {
      id: Status.inWork,
      title: 'В работе',
      taskIds: [],
    },
    'column-3': {
      id: Status.done,
      title: 'Готово',
      taskIds: [],
    },
  }
  console.log(columns)
  const [tasks, setTasks] = useState(initialTasks)
  const [columnsData, setColumnsData] = useState(columns)

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result

    if (!destination) {
      return
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    const sourceColumn = columnsData[source.droppableId]
    const destinationColumn = columnsData[destination.droppableId]
    const updatedSourceTaskIds = Array.from(sourceColumn.taskIds)
    updatedSourceTaskIds.splice(source.index, 1)
    const updatedDestinationTaskIds = Array.from(destinationColumn.taskIds)
    updatedDestinationTaskIds.splice(destination.index, 0, draggableId)

    const newColumnsData = {
      ...columnsData,
      [source.droppableId]: {
        ...sourceColumn,
        taskIds: updatedSourceTaskIds,
      },
      [destination.droppableId]: {
        ...destinationColumn,
        taskIds: updatedDestinationTaskIds,
      },
    }

    setColumnsData(newColumnsData)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {Object.values(columnsData).map((column) => (
        <Droppable droppableId={column.id} key={column.id}>
          {(provided) => (
            <div className="column">
              <h3>{column.title}</h3>
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {column.taskIds.map((taskId, index) => {
                  const task = tasks.find((t) => t.id === taskId)
                  console.log(task)
                  return (
                    <Draggable draggableId={taskId} index={index} key={taskId}>
                      {(provided) => (
                        <div
                          className="task"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskWrapper
                            key={index}
                            task={task}
                            setTask={setSortedTask}
                          />
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
      ))}
    </DragDropContext>
  )
}

export default Board
