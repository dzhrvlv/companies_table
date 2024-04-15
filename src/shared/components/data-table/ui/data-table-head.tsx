import {ChangeEventHandler, ReactNode} from "react";
import DataTableCol from "./data-table-col.tsx";

type PropsType = {
    children: ReactNode,
    isAllRowSelected: boolean,
    onSelectAllRows: (checked: boolean) => void
}
const DataTableHead = ({children, isAllRowSelected, onSelectAllRows}: PropsType) => {
    const onSelect: ChangeEventHandler<HTMLInputElement> = (e) => {
        onSelectAllRows(e.target.checked)
    }

    return (
        <thead>
        <tr>
            <DataTableCol>
                <input
                    type="checkbox"
                    checked={isAllRowSelected}
                    onChange={onSelect}
                />
            </DataTableCol>
            {children}
        </tr>
        </thead>
    );
};

export default DataTableHead;