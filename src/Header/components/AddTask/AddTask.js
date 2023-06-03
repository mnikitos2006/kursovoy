import styles from "./AddTask.module.css"
import {GetLable} from "../../../GetLable/GetLable";
import {getColorTask} from "../../../data";
import cls from "classnames";
import {useContext} from "react";
import {TaskManagerContext} from "../../../App";

export const AddTask = () => {
    const {data,text,setText,color,setColor,addTask}=useContext(TaskManagerContext)
    console.log(data)

    return <div className={styles.oknoGlavnoe}>
        <GetLable title={"Name"}><input className={styles.name} placeholder={"Введите название"}
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}/>
        </GetLable>
        <GetLable title={"Date"}><input className={styles.date} placeholder={"Введите дату"}/>
        </GetLable>

        <GetLable title={"Category"}>
            <select className={styles.category}>
                <option>Work</option>
                <option>Hobby</option>
                <option>Home</option>
                <option>Eat</option>
            </select>
        </GetLable>
        <GetLable title={"Level Importance"}>
            <select className={styles.level}>
                <option>Уровни сложности</option>
                <option>Hobby</option>
                <option>Home</option>
                <option>Eat</option>
                <option>Eat</option>
                <option>Eat</option>
            </select>

        </GetLable>
        <GetLable title={"Color"}>

            <div className={styles.colorContainer}>
                {getColorTask().map(el => <div className={cls(styles.colorBlock,{[styles.colorBlockBorder]:el===color}) }onClick={() => {
                    console.log(el)
                    console.log(color)
                    setColor(el)
                }
                }
                                               style={{
                                                   background: el,
                                                   // border: el ? '2px solid blue' : 'none',
                                               }}></div>)}

            </div>


        </GetLable>

        <GetLable title={"Set Alarm"}>
            <select className={styles.alarm}>
                <option>time</option>
                <option>time</option>
            </select>
        </GetLable>
        <GetLable title={"Time During"}>
            <select className={styles.during}>
                <option>time</option>
                <option>time</option>
            </select>
        </GetLable>
        <div className={styles.dobavit}>
            <button onClick={addTask}>Добавить</button>
        </div>
    </div>
}