import {Status} from "../../../Provider/data";
import {TaskWrapper} from "../taskWrapper";
import {GetLable} from "../../../GetLable/GetLable";

export const FilterWrapper=(props)=>{
    const {tasks,status,setTask}=props
    return <GetLable title={status} >{tasks.filter(task=>task.status===status).map((task, index) => (
            <TaskWrapper key={index} task={task} setTask={setTask} />
        ))}</GetLable>
}