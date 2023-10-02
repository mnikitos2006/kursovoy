import {createContext, useState} from "react";
import {getColorTask, getTasks} from "./data";
import {BASE_URL} from "../constants/constants";

export const TaskManagerContext = createContext({})
export const TaskManagerProvider = ({children}) => {
    const [isVisibleAddTask, setIsVisibleAddTask] = useState(false)
    const [isVisibleEditTask, setIsVisibleEditTask] = useState(false)
    const [tasks, setTask] = useState(getTasks)
    const [text, setText] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [color, setColor] = useState(getColorTask()[0])
    const [isClicked, setIsClicked] = useState(false);
    // const addTask = (newText, newColor) => {
    //
    //
    //         setIsVisible(false)
    //         setText("")
    //         setColor((getColorTask()[0]))
    //     })
    // }
    const editTask = (newText, newColor, newCategory,newPriority,newDate, id) => {

        if (id) {
            // если есть ID тогда редактируем если нет то создаём новую
            setTask(prevState => {
                const newArr = [...prevState]
                newArr.find(el => el.id === id)
                const index = newArr.findIndex(el => el.id === id);
                newArr[index].text = newText
                newArr[index].color = newColor
                newArr[index].category = newCategory
                newArr[index].levelImportance=newPriority
                newArr[index].date=newDate
                return newArr
            })
        } else {
            setTask(prevstate => {
                const newArr = [...prevstate]
                newArr.push({id: newArr.length + 1, text: newText, color: newColor,category:newCategory,levelImportance:newPriority,date:newDate})

                return newArr
            })
            fetch(BASE_URL,{
                method:"POST",
                headers: {'content-type':'application/json'},
                body: JSON.stringify({ text: newText, color: newColor,category:newCategory,levelImportance:newPriority,date:newDate})
            })
            setIsVisibleAddTask(false)
        }


        setIsVisible(false)
        setText("")
        setColor((getColorTask()[0]))
    }
    const getProviderData = () => {
        return {
            data: 25,
            tasks,
            setTask,
            color,
            text,
            isVisible,
            setColor,
            setIsVisible,
            setText,
            editTask,
            isVisibleAddTask,
            setIsVisibleAddTask,
            isVisibleEditTask,
            setIsVisibleEditTask
        }
    }
    return <TaskManagerContext.Provider value={getProviderData()}>
        {children}
    </TaskManagerContext.Provider>
}