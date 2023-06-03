import {getTasks} from "../data";
import {useContext, useState} from "react";
import styles from "./Body.module.css"
import {TaskManagerContext} from "../App";

export const Body = () => {
const {tasks}=useContext(TaskManagerContext)
    return <div className={styles.container}>
        <div>Tasks</div>
        <div>
            {tasks.map(task => <div className={styles.task} key={task.id} style={{background:task.color}}>{task.text}</div>)}
        </div>
    </div>
}