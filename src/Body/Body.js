import {useContext} from "react";
import styles from "./Body.module.css"
import {TaskManagerContext} from "../Provider";
import {ModalWindow} from "../ModalWindow/ModalWindow";
import {TaskContainer} from "../Header/components/TaskContainer/TaskContainer";
import {EditTask} from "../Header/components/EditTask/EditTask";

export const Body = () => {
const {tasks,setIsVisible,isVisible}=useContext(TaskManagerContext)
    const onClick=(task)=>{
        setIsVisible(true)
    }
    return <div className={styles.container}>
        <div>Tasks</div>
        <div>
            {tasks.map(task => <div onClick={()=>onClick(task)} className={styles.task} key={task.id} style={{background:task.color}}>{task.text}</div>)}
        </div>
        {isVisible && <ModalWindow setIsVisible={setIsVisible}>
            <EditTask/>
        </ModalWindow>}
    </div>
}