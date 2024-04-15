import {createAsyncThunk} from "@reduxjs/toolkit";

import {CompaniesAPI, ICompany} from "@/entities/companies";
import {UUID} from "@/shared/lib/types.ts";

interface IGetCompanies {
    companies: ICompany[],
    total: number,
    page: number
}

export const getCompanies = createAsyncThunk(
    'companies/getAll',
    async ({page, limit = 20}: { page: number, limit?: number }): Promise<IGetCompanies> => {
        const response = await CompaniesAPI.get(page, limit)

        return {
            companies: response.content as ICompany[],
            total: response.total ?? 0,
            page
        }
    }
)

export const createCompany = createAsyncThunk(
    'companies/create',
    async () => {
        const response = await CompaniesAPI.create()

        return response.content
    }
)

export const editCompany = createAsyncThunk(
    'companies/edit',
    async ({id, ...body}: { id: UUID }) => {
        console.log('BODY', body)
        const response = await CompaniesAPI.edit(id, body)

        return response.content
    }
)

export const deleteCompanies = createAsyncThunk(
    'companies/delete',
    async (ids: UUID[]) => {
        const response = await CompaniesAPI.delete(ids)

        return {
            message: response?.message,
            content: ids
        }
    }
)

