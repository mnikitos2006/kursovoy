import {GetLable} from "../GetLable/GetLable";
import {Button, Input} from "antd";
import Password from "antd/es/input/Password";
import {useContext, useState} from "react";
import {TaskManagerContext} from "../Provider";

export const Autorization = () => {
  const [login,setLogin]=useState("")
  const [password,setPassword]=useState("")
  const {fetchLogin} = useContext(TaskManagerContext)

  const onLogin=()=>{
fetchLogin(login,password)
  }
  return <div>
    <GetLable title={"Введите своё имя"}>
      <Input value={login} onChange={(el)=>setLogin(el.target.value)}/>
    </GetLable>

    <GetLable title={"Введите пароль"}>
      <Password value={password} onChange={(el)=>setPassword(el.target.value)}/>
    </GetLable>

 <Button onClick={onLogin}>Войти</Button>
  </div>
}
