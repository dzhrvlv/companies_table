import {createAsyncThunk} from "@reduxjs/toolkit";
import {EmployeesAPI, IEmployee} from "@/entities/employees";
import {UUID} from "@/shared/lib/types.ts";

interface IGetEmployees {
    employees: IEmployee[],
    total: number,
    page: number,
    companyId: UUID
}

export const getEmployees = createAsyncThunk(
    'employees/get',
    async ({companyId, page, limit = 20}: {
        companyId: UUID,
        page: number,
        limit: number
    }): Promise<IGetEmployees> => {
        const response = await EmployeesAPI.getByCompanyId(companyId, page, limit)

        return {
            employees: response.content as IEmployee[],
            total: response.total as number,
            page,
            companyId
        }
    }
)

export const createEmployee = createAsyncThunk(
    'employees/create',
    async (companyId: UUID) => {
        const response = await EmployeesAPI.create(companyId)

        return {
            content: response.content,
            companyId
        }
    }
)

export const editEmployee = createAsyncThunk(
    'employees/edit',
    async ({id, ...body}: { id: UUID }) => {
        const response = await EmployeesAPI.edit(id, body)

        return response.content
    }
)

export const deleteEmployees = createAsyncThunk(
    'employees/delete',
    async ({ids, companyId}: { ids: UUID[], companyId: UUID }) => {
        const response = await EmployeesAPI.deleteEmployees(ids)

        return {
            message: response?.message,
            content: ids,
            companyId
        }
    }
)