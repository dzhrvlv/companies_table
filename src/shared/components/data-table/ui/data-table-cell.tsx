import {ReactNode} from "react";

type PropsType = {
    children: ReactNode,
}
const DataTableCell = ({
                           children
                       }: PropsType) => {
    return (
        <td>
            {children}
        </td>
    );
};

export default DataTableCell;