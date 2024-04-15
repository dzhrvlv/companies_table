import {ReactNode} from "react";

import './styles.css'

type PropsType = {
    title: string,
    actions: ReactNode
}
const TableToolbar = ({title, actions}: PropsType) => {
    return (
        <div className='table-toolbar'>
            <div className='table-toolbar__title'>{title}</div>
            <div className="table-toolbar__actions">{actions}</div>
        </div>
    );
};

export default TableToolbar;