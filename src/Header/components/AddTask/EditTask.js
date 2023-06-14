import {TaskContainer} from "../TaskContainer/TaskContainer";
import {useContext} from "react";
import {TaskManagerContext} from "../../../Provider";

export const AddTask = () => {
    const {text,setText,color,setColor,addTask}=useContext(TaskManagerContext)
    return <TaskContainer {...{text,setText,color,setColor,addTask}}/>
}