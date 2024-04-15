import {v4 as uuidv4} from 'uuid'
import {initialCompanies} from "./data.ts";

import {EmployeesAPI} from "@/entities/employees";

import {UUID} from "@/shared/lib/types.ts";
import {ICompany} from "@/entities/companies";

let companies = [...initialCompanies]

export class CompaniesAPI {
    static async get(page: number, limit: number = 20) {
        try {
            const firstIndex = (page - 1) * limit
            const pageCompanies = companies
                .slice(firstIndex, firstIndex + limit)
                .map(c => {
                    const num_employees = EmployeesAPI.getCompanyEmployeesCount(c.id as UUID)
                    return {
                        ...c,
                        num_employees
                    }
                })


            return {status: 200, content: pageCompanies, total: companies.length}
        } catch (e) {
            return {status: 404, message: 'Ошибка'}
        }
    }

    static async getById(id: UUID) {
        try {
            const company = companies.find(c => c.id === id)

            if (!company) return {status: 404, message: 'Компания не найдена'}

            return {status: 200, content: company}
        } catch (e) {
            return {status: 404, message: 'Ошибка'}
        }
    }

    static async create() {
        try {
            const newCompany: Omit<ICompany, 'num_employees'> = {
                id: uuidv4() as UUID,
                name: '',
                address: ''
            }

            companies.unshift(newCompany)

            return {
                status: 200,
                content: {
                    ...newCompany,
                    num_employees: 0
                }
            }
        } catch (e) {
            return {status: 404, message: 'Ошибка'}
        }
    }

    static async edit(id: UUID, body: Partial<ICompany>) {
        try {
            const company = companies.find(c => c.id === id)

            if (!company) return {status: 404, message: 'Компания не найдена'}

            const updatedCompany = {
                ...company,
                ...body
            }
            companies = companies.map(c =>
                c.id === id
                    ? updatedCompany
                    : c
            ) as ICompany[]

            return {status: 200, content: updatedCompany}
        } catch (e) {
            return {status: 404, message: 'Ошибка'}
        }
    }

    static async delete(ids: UUID[]) {
        try {
            ids.forEach(id => {
                EmployeesAPI.deleteByCompany(id)
            })
            companies.filter(c => !ids.includes(c.id as UUID))
        } catch (e) {
            return {status: 404, message: 'Ошибка'}
        }
    }
}