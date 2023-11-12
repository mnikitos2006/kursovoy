import { createContext, useState } from 'react'
import { getColorTask } from './data'
import { BASE_URL } from '../constants/constants'

export const TaskManagerContext = createContext({})
export const TaskManagerProvider = ({ children }) => {
  const [isVisibleAddTask, setIsVisibleAddTask] = useState(false)
  const [isVisibleEditTask, setIsVisibleEditTask] = useState(false)
  const [tasks, setTask] = useState([])
  const [text, setText] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [color, setColor] = useState("")
  const [isClicked, setIsClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fetchTasks = async () => {
    let response = await fetch(BASE_URL)
    // читаем ответ в формате JSON
    return await response.json()
  }
  const deleteTask = (id) => {
    setIsLoading(true)
    fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    }).then((bla) => {
      fetchTasks().then((result) => {
        setTask(result)
      })
    }).finally(()=>{
      setIsLoading(false)
    })
  }
  const editTask= (
    newText,
    newColor,
    newCategory,
    newPriority,
    newDate,
    newCheckedStatus,
    id
  ) => {
    // если есть ID тогда редактируем если нет то создаём новую
    setIsLoading(true)
    if (id) {

      fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          text: newText,
          color: newColor,
          category: newCategory,
          levelImportance: newPriority,
          date: newDate,
          status: newCheckedStatus,
        }),
      }).then((res) => {
        res.json().then((result) => {
          setTask((prevState) => {
            const newArr = [...prevState]
            newArr.find((el) => el.id === id)
            const index = newArr.findIndex((el) => el.id === id)
            newArr[index] = result
            return newArr
          })
        })
      }).finally(()=>{
        setIsLoading(false)
      })
    } else {
      fetch(BASE_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          text: newText,
          color: newColor,
          category: newCategory,
          levelImportance: newPriority,
          date: newDate,
          status: newCheckedStatus,
        }),
      }).then((res) => {
        res.json().then((result) => {
          setTask((prevstate) => [result, ...prevstate])
        })
      }).finally(()=>{
        setIsLoading(false)
      })
      setIsVisibleAddTask(false)
    }
    setIsVisible(false)
    setText('')
    setColor(getColorTask()[0])
  }
  const getProviderData = () => {
    return {
      tasks,
      setTask,
      color,
      text,
      isVisible,
      setColor,
      setIsVisible,
      setText,
      editTask,
      deleteTask,
      fetchTasks,
      isVisibleAddTask,
      setIsVisibleAddTask,
      isVisibleEditTask,
      setIsVisibleEditTask,
      isLoading
    }
  }
  return (
    <TaskManagerContext.Provider value={getProviderData()}>
      {children}
    </TaskManagerContext.Provider>
  )
}
