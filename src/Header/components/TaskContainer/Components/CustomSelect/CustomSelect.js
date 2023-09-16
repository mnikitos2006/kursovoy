import {Select} from "antd";

export const CustomSelect=(props)=>{
    console.log(props)
    const {options,defaultValue,onChange}=props
    return <Select
        onChange={onChange}
        defaultValue={defaultValue}
        style={{ width: 120 }}
        options={options}
    />
}