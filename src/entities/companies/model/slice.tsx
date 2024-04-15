import {createSelector, createSlice} from '@reduxjs/toolkit'

import {ICompany} from "../lib/types";
import {createCompany, deleteCompanies, editCompany, getCompanies} from "../model/actions";
import {createEmployee, deleteEmployees} from "@/entities/employees";
import {UUID} from "@/shared/lib/types.ts";

export interface ICompaniesState {
    companies: ICompany[],
    total: number,
    currentPage: number
}

const initialState: ICompaniesState = {
    companies: [],
    total: 0,
    currentPage: 0
}
export const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getCompanies.fulfilled,
            (state, {payload}) => {
                if (state.currentPage < payload.page) {
                    state.companies = [...state.companies, ...payload.companies]
                    state.total = payload.total
                    state.currentPage = payload.page
                }
            },
        )

        builder.addCase(
            createCompany.fulfilled,
            (state, action) => {
                state.companies = [action.payload as ICompany, ...state.companies]
                state.total += 1
            },
        )

        builder.addCase(
            editCompany.fulfilled,
            (state, action) => {
                const {
                    id,
                    ...body
                } = action.payload as ICompany

                state.companies = [...state.companies]
                    .map(prev =>
                        prev.id === id
                            ? {...prev, ...body}
                            : prev
                    )
            },
        )

        builder.addCase(
            deleteCompanies.fulfilled,
            (state, action) => {
                const {content} = action.payload

                state.companies = [...state.companies]
                    .filter(prev =>
                        !content.includes(prev.id)
                    )
                state.total -= 1
            },
        )

        builder.addCase(
            createEmployee.fulfilled,
            (state, {payload}) => {
                state.companies = [...state.companies]
                    .map(c =>
                        c.id === payload.companyId
                            ? {
                                ...c,
                                num_employees: c.num_employees + 1
                            }
                            : c
                    )
            }
        )

        builder.addCase(
            deleteEmployees.fulfilled,
            (state, action) => {
                const {
                    companyId,
                    content
                } = action.payload

                state.companies = [...state.companies]
                    .map(c =>
                        c.id === companyId
                            ? {
                                ...c,
                                num_employees: c.num_employees - content.length
                            }
                            : c
                    )
            }
        )

    },
    selectors: {
        selectCompanies: (state) => state.companies,
        selectTotalCompanies: (state) => state.total,
    }
})

export const {
    selectCompanies,
    selectTotalCompanies,
} = companiesSlice.selectors

export const selectCompanyById = (companyId: UUID) => createSelector(
    selectCompanies,
    companies => companies.find(c => c.id === companyId),
)

export const selectCompanyName = (companyId: UUID) => createSelector(
    selectCompanyById(companyId),
    company => company ? company.name : ''
)