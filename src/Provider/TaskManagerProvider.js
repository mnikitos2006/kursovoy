import {createContext, useState} from 'react'
import {getColorTask, levelImportance} from './data'
import {BASE_URL} from '../constants/constants'

const users = [{
    id: "1",
    name: "Nikita",
    password: "admin"
}, {
    id: "2",
    name: "Dmitry",
    password: "admin1",
}]
export const TaskManagerContext = createContext({})

export const TaskManagerProvider = ({children}) => {
    const [filter,setFilter]=useState({})
    const [user, setUser]=useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [isVisibleAddTask, setIsVisibleAddTask] = useState(false)
    const [isVisibleEditTask, setIsVisibleEditTask] = useState(false)
    const [tasks, setTask] = useState([])
    const [text, setText] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [color, setColor] = useState('')
    const [isClicked, setIsClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const fetchLogin = (login, password) => {
       const client= users.find((el) => {
           return  el.name === login
        })
        if (client&&client.password===password){
            setIsAuth(true)
            localStorage.setItem('isAuth', 'true')
            setUser(client)
            localStorage.setItem('clientId',client.id)
        }

    }
    const fetchLogout = () => {
        setIsAuth(false)
        localStorage.removeItem('isAuth')
        localStorage.removeItem('clientId')
        setTask([])
        setUser(null)


    }
    const fetchTasks = async () => {
        setIsLoading(true)
        const url = new URL(BASE_URL);
        url.searchParams.append('userId', user.id);
        let response = await fetch(url)
        // читаем ответ в формате JSON
        setIsLoading(false)

        return await response.json()

    }
    const deleteTask = (id) => {
        setIsLoading(true)
        fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
        })
            .then((bla) => {
                fetchTasks().then((result) => {
                    setTask(result)
                })
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    const editTask = (
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
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    text: newText,
                    color: newColor,
                    category: newCategory,
                    levelImportance: newPriority,
                    date: newDate,
                    status: newCheckedStatus,
                    userId:user.id
                }),
            })
                .then((res) => {
                    res.json().then((result) => {
                        setTask((prevState) => {
                            const newArr = [...prevState]
                            newArr.find((el) => el.id === id)
                            const index = newArr.findIndex((el) => el.id === id)
                            newArr[index] = result
                            return newArr
                        })
                    })
                })
                .finally(() => {
                    setIsLoading(false)
                })
        } else {
            fetch(BASE_URL, {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    text: newText,
                    color: newColor,
                    category: newCategory,
                    levelImportance: newPriority,
                    date: newDate,
                    status: newCheckedStatus,
                    userId:user.id

                }),
            })
                .then((res) => {
                    res.json().then((result) => {
                        setTask((prevstate) => [result, ...prevstate])
                    })
                })
                .finally(() => {
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
            isLoading,
            isAuth,
            fetchLogin,
            fetchLogout,
            setIsAuth,
            user,
            setUser,
            users,
            filter,setFilter
        }
    }
    return (
        <TaskManagerContext.Provider value={getProviderData()}>
            {children}
        </TaskManagerContext.Provider>
    )
}
