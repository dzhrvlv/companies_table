import {ReactNode} from "react";
import dataTableHead from "./data-table-head.tsx";
import dataTableBody from "./data-table-body.tsx";
import dataTableRow from "./data-table-row.tsx";
import dataTableCell from "./data-table-cell.tsx";
import dataTableCol from "./data-table-col.tsx";

import './styles.css'
import dataTableField from "@/shared/components/data-table/ui/data-table-field.tsx";

type PropsType = {
    children: ReactNode
}
const DataTable = ({children}: PropsType) => {
    return (
        <table>
            {children}
        </table>
    );
};

DataTable.Head = dataTableHead
DataTable.Body = dataTableBody
DataTable.Row = dataTableRow
DataTable.Cell = dataTableCell
DataTable.Col = dataTableCol
DataTable.Field = dataTableField

export default DataTable