import {ReactNode} from "react";

type PropsType = {
    children: ReactNode
}
const DataTableCol = ({children}: PropsType) => {
    return (
        <th>
            {children}
        </th>
    );
};

export default DataTableCol;