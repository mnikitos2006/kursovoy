import {useContext, useState} from "react";
import styles from "./Body.module.css"
import {TaskManagerContext} from "../Provider";
import {ModalWindow} from "../ModalWindow/ModalWindow";
import {TaskContainer} from "../Header/components/TaskContainer/TaskContainer";
import {EditTask} from "../Header/components/EditTask/EditTask";
import {TaskWrapper} from "./component/taskWrapper";

export const Body = () => {
    const {tasks,setTask} = useContext(TaskManagerContext)

    console.log(tasks)
    return <div className={styles.container}>
        <div>Tasks</div>
        <div>
            {tasks.length===0&&<div>Нет задач</div>}
            {tasks.map((task,index) =><TaskWrapper key={index} task={task} setTask={setTask}/>)}
        </div>

    </div>
}