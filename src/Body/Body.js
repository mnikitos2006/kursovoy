import {getTasks} from "../data";
import {useState} from "react";
import styles from "./Body.module.css"

export const Body = (props) => {

    return <div className={styles.container}>
        <div>Tasks</div>
        <div>
            {props.tasks.map(task => <div className={styles.task} key={task.id} style={{background:task.color}}>{task.text}</div>)}
        </div>
    </div>
}