import {ChangeEventHandler} from "react";

type PropsType = {
    value: string | number,
    isEditable: boolean,
    onChange?: (value: string) => void
}

const DataTableField = ({value, isEditable = false, onChange}: PropsType) => {
    const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (onChange) onChange(e.target.value)
    }

    return (
        <div className='data-table-field'>
            {isEditable ?
                <input
                    type="text"
                    value={value}
                    onChange={changeHandler}
                />
                : <span>{value}</span>
            }
        </div>
    );
};

export default DataTableField;