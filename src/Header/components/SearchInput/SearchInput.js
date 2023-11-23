import styles from "./searchinput.module.css"
import {Input} from "antd";
import {useContext} from "react";
import {TaskManagerContext} from "../../../Provider";
export const SearchInput=()=>{
    const { search, setSearch } = useContext(TaskManagerContext)

    return <div className={styles.container}>
        <Input value={search} onChange={(event)=>setSearch(event.target.value)} className={styles.input} placeholder="Поиск"/>
    </div>
}
