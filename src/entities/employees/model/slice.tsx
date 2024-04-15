import {createSlice} from '@reduxjs/toolkit'

import {IEmployee} from "../lib/types";
import {createEmployee, deleteEmployees, editEmployee, getEmployees} from "../model/actions";
import {UUID} from "@/shared/lib/types.ts";

export interface IEmployeesState {
    employees: IEmployee[],
    companyId?: UUID,
    total: number,
    currentPage: number
}

const initialState: IEmployeesState = {
    employees: [],
    companyId: undefined,
    total: 0,
    currentPage: 0
}

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        resetEmployees: (state) => {
            state.employees = []
            state.companyId = undefined
            state.total = 0
            state.currentPage = 0
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            getEmployees.fulfilled,
            (state, action
            ) => {
                const {page, companyId} = action.payload

                if (state.currentPage < page || state.companyId !== companyId) {
                    const {employees, total} = action.payload

                    state.employees = [...state.employees, ...employees]
                    state.total = total
                    state.currentPage = page
                    state.companyId = companyId
                }
            },
        )

        builder.addCase(
            createEmployee.fulfilled,
            (state, {payload}
            ) => {
                state.employees = [payload.content as IEmployee, ...state.employees]
                state.total += 1
            },
        )

        builder.addCase(
            editEmployee.fulfilled,
            (state, action
            ) => {
                const {
                    id,
                    ...body
                } = action.payload as IEmployee

                state.employees = [...state.employees]
                    .map(prev =>
                        prev.id === id
                            ? {...prev, ...body}
                            : prev
                    )
            },
        )

        builder.addCase(
            deleteEmployees.fulfilled,
            (state, action
            ) => {
                const {content} = action.payload

                state.employees = [...state.employees]
                    .filter(prev =>
                        !content.includes(prev.id)
                    )
                state.total -= 1
            },
        )
    },
    selectors: {
        selectEmployees: (state) => state.employees,
        selectTotalEmployees: (state) => state.total
    }
})

export const {
    selectEmployees,
    selectTotalEmployees,
} = employeesSlice.selectors

export const {
    resetEmployees,
} = employeesSlice.actions