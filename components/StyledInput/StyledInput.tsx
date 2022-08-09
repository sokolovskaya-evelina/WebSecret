import React, {ChangeEvent} from 'react';
import styles from "./StyledInput.module.scss";

type PropsType = {
    id:string
    title: string
    value: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const StyledInput = ({id, title, value, onChange}: PropsType) => {
    return (
        <label className={styles.customCheckbox} htmlFor={id}>
            <input onChange={onChange} id={id} type="checkbox" name={title} value={value}/>
            <span>{title}</span>
        </label>
    );
};

export default StyledInput;
