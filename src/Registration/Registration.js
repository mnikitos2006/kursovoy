import {GetLable} from '../GetLable/GetLable'
import {Button, Input} from 'antd'
import Password from 'antd/es/input/Password'
import {useContext, useState} from 'react'
import {TaskManagerContext} from '../Provider'
import styles from './Registration.module.css'

export const Registration = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const {fetchRegistration, isRegistered} = useContext(TaskManagerContext)


    const onRegistration = () => {
        if (password === password2) {
            fetchRegistration(login, password)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <GetLable title={'Введите своё имя'}>
                    <Input value={login} onChange={(el) => setLogin(el.target.value)}/>
                </GetLable>

                <GetLable title={'Введите пароль'}>
                    <Password
                        value={password}
                        onChange={(el) => setPassword(el.target.value)}
                    />
                </GetLable>
                <GetLable title={'Повторите пароль'}>
                    <Password
                        value={password2}
                        onChange={(el) => setPassword2(el.target.value)}
                    />
                </GetLable>
                {isRegistered && "Вы зарегестрирванны"}
                <Button onClick={onRegistration}>Зарегистрироваться</Button>
            </div>
        </div>
    )
}
