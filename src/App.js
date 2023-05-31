import {useState} from "react";
import Square, {getTasks} from "./data";
import {Header} from "./Header/Header";
import {Body} from "./Body/Body";
import styles from "./App.module.css"
import {ModalWindow} from "./ModalWindow/ModalWindow";

function App() {
    const [tasks, setTask] = useState(getTasks)
    return <div className={styles.app}>
        <Header setTask={setTask}/>
        <Body tasks={tasks}/>
    </div>

}

export default App;
