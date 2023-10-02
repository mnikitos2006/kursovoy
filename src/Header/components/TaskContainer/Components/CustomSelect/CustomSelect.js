import {Select} from "antd";

export const CustomSelect=(props)=>{
    const {options,defaultValue,onChange}=props
    return <Select
        onChange={onChange}
        defaultValue={defaultValue}
        style={{ width: 120 }}
        options={options}
    />
}