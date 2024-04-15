import {ReactNode, ChangeEventHandler} from "react";
import DataTableCell from "./data-table-cell.tsx";

type PropsType = {
    children: ReactNode,
    isSelected: boolean,
    onSelectRow: (checked: boolean) => void
}
const DataTableRow = ({children, isSelected, onSelectRow}: PropsType) => {
    const onSelect: ChangeEventHandler<HTMLInputElement> = (e) => {
        onSelectRow(e.target.checked)
    }

    return (
        <tr className={isSelected ? 'data-table-row-selected' : undefined}>
            <DataTableCell>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={onSelect}
                />
            </DataTableCell>
            {children}
        </tr>
    );
};

export default DataTableRow;