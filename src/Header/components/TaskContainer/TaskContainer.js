import styles from "./TaskContainer.module.css"
import {GetLable} from "../../../GetLable/GetLable";
import {category, getColorTask} from "../../../Provider/data";
import cls from "classnames";
import {useContext, useEffect, useState} from "react";
import {TaskManagerContext} from "../../../Provider";
import isEmpty from "lodash/isEmpty";
import {CustomSelect} from "./Components/CustomSelect/CustomSelect";
import {value} from "lodash/seq";

export const TaskContainer = (props) => {
    console.log(props)
    const [text, setText] = useState(props.task?.text)
    const [color, setColor] = useState(props.task?.color)
    const [categorySelect, setCategorySelect] = useState(props.task?.category)
    const {editTask:editGlobalTask} = useContext(TaskManagerContext)
    const onClick=()=>{
       if(!isEmpty(props)){
          editGlobalTask(text,color,categorySelect,props.task.id)
       }else{
           editGlobalTask(text,color,categorySelect)
       }
    }
const onChangeCategory=(value)=>{
setCategorySelect(value)
    }
    return <div className={styles.oknoGlavnoe}>
        <GetLable title={"Name"}><input className={styles.name} placeholder={"Введите название"}
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}/>
        </GetLable>
        <GetLable title={"Date"}><input className={styles.date} placeholder={"Введите дату"}/>
        </GetLable>

        <GetLable title={"Category"}>
            <CustomSelect defaultValue={categorySelect} onChange={onChangeCategory} options={[
                { value: category.work, label: 'Work' },
                { value: category.hobby, label: 'Hobby' },
                { value: category.home, label: 'Home' },
                { value: category.eat, label: 'Eat' },
            ]}/>
            {/*<select className={styles.category}>*/}
            {/*    <option>Work</option>*/}
            {/*    <option>Hobby</option>*/}
            {/*    <option>Home</option>*/}
            {/*    <option>Eat</option>*/}
            {/*</select>*/}
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
                {getColorTask().map((el, idx) => <div key={idx}
                                                      className={cls(styles.colorBlock, {[styles.colorBlockBorder]: el === color})}
                                                      onClick={() => {
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
            <button onClick={onClick}>{isEmpty(props)?"Добавить":"Редактировать"}</button>
        </div>
    </div>
}