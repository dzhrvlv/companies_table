import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import {useAppDispatch} from "@/app/store";

import {AddEmployee} from "@/features/employee/add-employee";
import {DeleteEmployees} from "@/features/employee/delete-employees";

import {selectCompanyName} from "@/entities/companies";
import {editEmployee, getEmployees, resetEmployees, selectEmployees, selectTotalEmployees} from "@/entities/employees";

import {UUID} from "@/shared/lib/types.ts";
import {useSelectTableRows} from "@/shared/lib/hooks";
import TableToolbar from "@/shared/components/table-toolbar";
import TableContainer from "@/shared/components/table-container";
import DataTable from "@/shared/components/data-table";
import ScrollWrapper from "@/shared/lib/hocs/scroll-wrapper";

const columns = [

    {
        id: 1,
        key: 'surname',
        title: 'Фамилия',
        isEditable: true
    },
    {
        id: 2,
        key: 'firstname',
        title: 'Имя',
        isEditable: true
    },
    {
        id: 3,
        key: 'salary',
        title: 'Должность',
        isEditable: true
    }
]

type PropsType = {
    selectedCompany: UUID
}

const EmployeesTable = ({selectedCompany}: PropsType) => {
    const dispatch = useAppDispatch()

    const companyName = useSelector(selectCompanyName(selectedCompany))

    const employees = useSelector(selectEmployees)
    const totalEmployees = useSelector(selectTotalEmployees)
    const [currentPage, setCurrentPage] = useState<number>(1)

    const {
        selectedRows,
        onSelectRow,
        selectAllRows,
        isAllRowsSelected
    } = useSelectTableRows<UUID>(employees)

    const onEditCell = (id: UUID, key: string, value: string | number) => {
        dispatch(editEmployee({
            id,
            [key]: value
        }))
    }

    const onScroll = () => {
        if (employees.length < totalEmployees) setCurrentPage(prev => prev + 1)
    }

    useEffect(() => {
        dispatch(getEmployees({
                    companyId: selectedCompany,
                    page: currentPage,
                    limit: 15
                }))
    }, [currentPage, selectedCompany, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(resetEmployees())
        }
    }, [dispatch]);

    return (
        <TableContainer>
            <TableToolbar
                title={`Сотрудники компании "${companyName}"`}
                actions={selectedRows.length > 0
                    ? <DeleteEmployees selectedEmployees={selectedRows} companyId={selectedCompany}/>
                    : <AddEmployee companyId={selectedCompany}/>
                }
            />
            <ScrollWrapper
                onScroll={onScroll}
            >
            <DataTable>
                <DataTable.Head
                    isAllRowSelected={isAllRowsSelected}
                    onSelectAllRows={(checked) => selectAllRows(checked)}
                >
                    {columns.map(col =>
                        <DataTable.Col key={col.key}>{col.title}</DataTable.Col>
                    )}
                </DataTable.Head>
                <DataTable.Body>
                    {employees.map(employee =>
                        <DataTable.Row
                            key={employee.id}
                            isSelected={selectedRows.includes(employee.id)}
                            onSelectRow={(checked) => onSelectRow(checked, employee.id)}
                        >
                            {columns.map(col =>
                                <DataTable.Cell key={col.key}>
                                    <DataTable.Field
                                        value={employee[col.key]}
                                        isEditable={col.isEditable}
                                        onChange={value =>
                                            onEditCell(employee.id, col.key, value)
                                        }
                                    />
                                </DataTable.Cell>
                            )}
                        </DataTable.Row>
                    )}
                </DataTable.Body>
            </DataTable>
            </ScrollWrapper>
        </TableContainer>
    )
}

export default EmployeesTable;