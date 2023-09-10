import styles from "../Body.module.css";
import {ModalWindow} from "../../ModalWindow/ModalWindow";
import {EditTask} from "../../Header/components/EditTask/EditTask";
import {useContext, useState} from "react";
import {TaskManagerContext} from "../../Provider";

export const TaskWrapper = (props) => {
    const {task}=props
    console.log(task)
    const [isVisible, setIsVisible] = useState(false)
    const onClick = () => {
        setIsVisible(true)
    }
    return <>
        <div onClick={onClick} className={styles.task} key={task.id}
             style={{background: task.color}}>{task.text}</div>
        {isVisible && <ModalWindow setIsVisible={setIsVisible}>
            <EditTask {...{task}}/>
        </ModalWindow>}</>
}