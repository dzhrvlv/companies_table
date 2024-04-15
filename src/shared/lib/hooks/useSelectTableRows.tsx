import {useCallback, useEffect, useMemo, useState} from "react";

type TableRow<T> = {
    id: T
}

export const useSelectTableRows = <T, >(rows: TableRow<T>[]) => {
    const [selectedRows, setSelectedRows] = useState<T[]>([])

    const onSelectRow = (checked: boolean, id: T) => {
        if (checked) setSelectedRows(prev => [...prev, id])
        else setSelectedRows(prev => prev.filter(r => r !== id))
    }

    const selectAllRows = useCallback((checked: boolean) => {
        if (!checked) setSelectedRows([])
        else setSelectedRows(rows.map(c => c.id))
    }, [rows])

    const isAllRowsSelected = useMemo(() => {
        if (!rows.length) return false

        return selectedRows.length === rows.length
    }, [selectedRows, rows.length])

    useEffect(() => {
        selectAllRows(false)
    }, [selectAllRows]);

    return {
        selectedRows,
        onSelectRow,
        selectAllRows,
        isAllRowsSelected,
    }
}