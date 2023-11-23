import styles from './TaskContainer.module.css'
import { GetLable } from '../../../GetLable/GetLable'
import {
  category,
  levelImportance,
  getColorTask,
  Status,
} from '../../../Provider/data'
import cls from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { TaskManagerContext } from '../../../Provider'
import isEmpty from 'lodash/isEmpty'
import { CustomSelect } from './Components/CustomSelect/CustomSelect'
import { value } from 'lodash/seq'
import {DatePicker, Input} from 'antd'
import dayjs from 'dayjs'
import { Radio } from 'antd'
import {
    HomeOutlined,
    LoadingOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
    EditOutlined
} from '@ant-design/icons';

const plainOptions = [Status.new, Status.inWork, Status.done]
const defaultCheckedStatus = Status.new
export const TaskContainer = (props) => {
  const [text, setText] = useState(props.task?.text)
  const [color, setColor] = useState(props.task?.color)
  const [categorySelect, setCategorySelect] = useState(props.task?.category)
  const [prioritySelect, setPrioritySelect] = useState(
    props.task?.levelImportance
  )
  const [date, setDate] = useState(props.task?.date)
  const { editTask: editGlobalTask } = useContext(TaskManagerContext)
  const [checkedStatus, setCheckedStatus] = useState(props.task?.status||defaultCheckedStatus)
  console.log(checkedStatus)
  const onClick = () => {
    if (!isEmpty(props)) {
      editGlobalTask(
        text,
        color,
        categorySelect,
        prioritySelect,
        date,
        checkedStatus,
        props.task.id
      )
    } else {
      editGlobalTask(
        text,
        color,
        categorySelect,
        prioritySelect,
        date,
        checkedStatus
      )
    }
  }
  const onChangeCategory = (value) => {
    setCategorySelect(value)
  }

  const onChangePriority = (value) => {
    setPrioritySelect(value)
  }
  const onChangeDate = (dateGood, dateString) => {
    const dateGooda = dayjs(dateGood).format()
    setDate(dateGooda)
  }

  const onChangeStatus = (value) => {
    setCheckedStatus(value.target.value)
  }

  return (
    <div className={styles.oknoGlavnoe}>
      <GetLable title={'Name'}>
        <Input

          placeholder={'Введите название'}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </GetLable>
      <GetLable title={'Date'}>
        <DatePicker style={{width:"100%"}} defaultValue={dayjs(date)} onChange={onChangeDate} />
      </GetLable>

      <GetLable title={'Category'}>
        <CustomSelect
          defaultValue={categorySelect}
          onChange={onChangeCategory}
          options={[
            { value: category.work, label: 'Work' },
            { value: category.hobby, label: 'Hobby' },
            { value: category.home, label: 'Home' },
            { value: category.eat, label: 'Eat' },
          ]}
        />
        {/*<select className={styles.category}>*/}
        {/*    <option>Work</option>*/}
        {/*    <option>Hobby</option>*/}
        {/*    <option>Home</option>*/}
        {/*    <option>Eat</option>*/}
        {/*</select>*/}
      </GetLable>
      <GetLable title={'Приоритет'}>
        <CustomSelect
          className={styles.level}
          defaultValue={prioritySelect}
          onChange={onChangePriority}
          options={[
            { value: levelImportance.hard, label: 'Важно' },
            { value: levelImportance.normal, label: 'Не особо важно' },
            { value: levelImportance.easy, label: 'Не важно' },
          ]}
        />
        {/*<select className={styles.level}> <option>Приоритет</option>*/}
        {/*    <option>Важно</option>*/}
        {/*    <option>Не особо важно</option>*/}
        {/*    <option>Не важно</option>*/}
        {/*<option>Eat</option>*/}
        {/*<option>Eat</option></select>*/}

        {/*</select>*/}
      </GetLable>
      <GetLable title={'Цвет'}>
        <div className={styles.colorContainer}>
          {getColorTask().map((el, idx) => (
            <div
              key={idx}
              className={cls(styles.colorBlock, {
                [styles.colorBlockBorder]: el === color,
              })}
              onClick={() => {
                setColor(el)
              }}
              style={{
                background: el,
                // border: el ? '2px solid blue' : 'none',
              }}
            ></div>
          ))}
        </div>
      </GetLable>
        {props.task?.id&&<GetLable title="Статус">
        <Radio.Group onChange={onChangeStatus} value={checkedStatus}>
          {plainOptions.map((el) => (
            <Radio value={el}>{el}</Radio>
          ))}
        </Radio.Group>
      </GetLable>}

      <div className={styles.dobavit}>
        <button onClick={onClick}>
          {isEmpty(props) ? 'Добавить' : 'Редактировать'}
        </button>
      </div>
    </div>
  )
}
