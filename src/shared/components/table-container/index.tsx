import {ReactNode} from "react";

import './styles.css'

type PropsType = {
    children: ReactNode
}

const TableContainer = ({children}: PropsType) => {
    return (
        <div className='table-container'>
            {children}
        </div>
    );
};

export default TableContainer;