import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import {useAppDispatch} from "@/app/store";

import {AddCompany} from "@/features/company/add-company";
import {DeleteCompanies} from "@/features/company/delete-companies";

import {
    editCompany,
    getCompanies,
    selectCompanies,
    selectTotalCompanies
} from "@/entities/companies";

import {UUID} from "@/shared/lib/types.ts";
import {useSelectTableRows} from "@/shared/lib/hooks";
import ScrollWrapper from "@/shared/lib/hocs/scroll-wrapper";

import DataTable from "@/shared/components/data-table";
import TableContainer from "@/shared/components/table-container";
import TableToolbar from "@/shared/components/table-toolbar";

const columns = [
    {
        id: 1,
        key: 'name',
        title: 'Название компании',
        isEditable: true
    },
    {
        id: 2,
        key: 'num_employees',
        title: 'Кол-во сотрудников',
        isEditable: false
    },
    {
        id: 3,
        key: 'address',
        title: 'Адрес',
        isEditable: true
    },
]

type PropsType = {
    onSelectCompanies: (ids: UUID[]) => void
}

const CompaniesTable = ({onSelectCompanies}: PropsType) => {
    const dispatch = useAppDispatch()

    const companies = useSelector(selectCompanies)
    const totalCompanies = useSelector(selectTotalCompanies)
    const [currentPage, setCurrentPage] = useState<number>(1)

    const {
        selectedRows,
        onSelectRow,
        selectAllRows,
        isAllRowsSelected
    } = useSelectTableRows<UUID>(companies)

    const onScroll = () => {
        if (companies.length < totalCompanies) setCurrentPage(prev => prev + 1)
    }

    const onEditCell = (id: UUID, key: string, value: string | number) => {
        dispatch(editCompany({
            id,
            [key]: value
        }))
    }

    useEffect(() => {
        if (!selectedRows) return;

        onSelectCompanies(selectedRows)
    }, [selectedRows, onSelectCompanies]);

    useEffect(() => {
        dispatch(getCompanies({page: currentPage, limit: 15}))
    }, [currentPage, dispatch]);

    return (
        <TableContainer>
            <TableToolbar
                title={'Компании'}
                actions={selectedRows.length > 0
                    ? <DeleteCompanies selectedCompanies={selectedRows}/>
                    : <AddCompany/>
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
                        {companies.map(company =>
                            <DataTable.Row
                                key={company.id}
                                isSelected={selectedRows.includes(company.id)}
                                onSelectRow={(checked) => onSelectRow(checked, company.id)}
                            >
                                {columns.map(col =>
                                    <DataTable.Cell key={col.key}>
                                        <DataTable.Field
                                            value={company[col.key]}
                                            isEditable={col.isEditable}
                                            onChange={value =>
                                                onEditCell(company.id, col.key, value)
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
    );
}

export default CompaniesTable;