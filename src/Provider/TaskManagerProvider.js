import {createContext, useState} from 'react'
import {getColorTask, Status} from './data'
import {BASE_URL} from '../constants/constants'

export const TaskManagerContext = createContext({})

export const TaskManagerProvider = ({children}) => {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState({})
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [isVisibleAddTask, setIsVisibleAddTask] = useState(false)
    const [isVisibleEditTask, setIsVisibleEditTask] = useState(false)
    const [tasks, setTask] = useState([])
    const [text, setText] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [color, setColor] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)

    const fetchLogin = async (login, password) => {

        setIsLoading(true)
        const url = new URL(`${BASE_URL}/auth?name=${login}`)
        let response = await fetch(url, {
            method: 'GET',
            headers: {'content-type': 'application/json'},

        }).then(el => {
            el.json().then(res => {
                const client = res.find(el => el.name)


                if (client && client.password === password) {
                    setIsAuth(true)
                    localStorage.setItem('isAuth', 'true')
                    setUser(client)
                    localStorage.setItem('client', JSON.stringify(client))
                }
            })
        })

        setIsLoading(false)


    }
    const fetchRegistration = async (login, password) => {
        setIsLoading(true)
        const url = new URL(`${BASE_URL}/auth/`)
        let response = await fetch(url, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                name: login, password
            })
        })

        setIsLoading(false)
        setIsRegistered(true)
        setTimeout(() => setIsRegistered(false), 5000)

        return await response.json()
    }
    const fetchLogout = () => {
        setIsAuth(false)
        localStorage.removeItem('isAuth')
        localStorage.removeItem('client')
        setTask([])
        setUser(null)
    }
    const fetchTasks = async () => {
        setIsLoading(true)
        const url = new URL(`${BASE_URL}/tasks`)
        url.searchParams.append('userId', user.id)
        let response = await fetch(url)

        setIsLoading(false)

        return await response.json()
    }
    const deleteTask = (id) => {
        setIsLoading(true)
        fetch(`${BASE_URL}/tasks/${id}`, {
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
    const doneTask = (id) => {
        if (id) {
            setIsLoading(true)
            fetch(`${BASE_URL}/tasks/${id}`, {
                method: 'PUT',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    text: tasks.text,
                    color: tasks.color,
                    category: tasks.category,
                    levelImportance: tasks.levelImportance,
                    date: tasks.date,
                    status: Status.done,
                    userId: user.id,
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

        }
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
            fetch(`${BASE_URL}/tasks/${id}`, {
                method: 'PUT',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    text: newText,
                    color: newColor,
                    category: newCategory,
                    levelImportance: newPriority,
                    date: newDate,
                    status: newCheckedStatus,
                    userId: user.id,
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
            fetch(`${BASE_URL}/tasks`, {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    text: newText,
                    color: newColor,
                    category: newCategory,
                    levelImportance: newPriority,
                    date: newDate,
                    status: newCheckedStatus,
                    userId: user.id,
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
            filter,
            setFilter,
            search,
            setSearch,
            doneTask,
            fetchRegistration,
            setIsRegistered,
            isRegistered
        }
    }
    return (
        <TaskManagerContext.Provider value={getProviderData()}>
            {children}
        </TaskManagerContext.Provider>
    )
}
