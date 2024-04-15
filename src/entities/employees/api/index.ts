import {v4 as uuidv4} from 'uuid'
import {initialEmployees} from "./data.ts";

import {CompaniesAPI} from "@/entities/companies";

import {UUID} from "@/shared/lib/types.ts";
import {IEmployee} from "@/entities/employees";

let employees = [...initialEmployees]

export class EmployeesAPI {
    static async getByCompanyId(id: UUID, page: number = 1, limit: number = 20) {
        try {
            const filteredEmployees = employees.filter(e => e.company_id === id)
            if (!filteredEmployees.length) return {status: 200, content: [], total: 0}

            const firstIndex = (page - 1) * limit
            const pageFilteredEmployees = filteredEmployees.slice(firstIndex, firstIndex + limit)

            return {status: 200, content: pageFilteredEmployees, total: employees.length}

        } catch (e) {
            return {status: 404, message: 'Ошибка'}
        }
    }

    static getCompanyEmployeesCount(companyId: UUID) {
        try {
            return employees.filter(e => e.company_id === companyId).length
        } catch (e) {
            return {status: 404, message: 'Ошибка'}
        }
    }

    static async create(company_id: UUID) {
        try {
            const {content: company} = await CompaniesAPI.getById(company_id)

            if (!company) return {status: 404, message: 'Компания не найдена'}

            const newEmployee: IEmployee = {
                id: uuidv4() as UUID,
                firstname: '',
                surname: '',
                company_id,
                salary: ''
            }

            employees.unshift(newEmployee)

            return {status: 200, content: newEmployee}

        } catch (e) {
            return {status: 404, message: 'Ошибка'}
        }
    }

    static async edit(id: UUID, body: Partial<IEmployee>) {
        try {
            const employee = employees.find(e => e.id === id)

            if (!employee) return {status: 404, message: 'Сотрудник не найден'}

            const updatedEmployee = {
                ...employee,
                ...body
            }

            employees = employees.map(c =>
                c.id === id
                    ? updatedEmployee
                    : c
            ) as IEmployee[]

            return {status: 200, content: updatedEmployee}

        } catch (e) {
            return {status: 404, message: 'Ошибка'}
        }
    }

    static async deleteEmployees(ids: UUID[]) {
        try {
            for (const id of ids) {
                const employee = employees.find(e => e.id === id)

                if (!employee) return {status: 404, message: `Сотрудник ${id} не найден`}

                employees = employees.filter(e => e.id !== employee.id)
            }

            return {status: 200, message: 'Сотрудники удалены'}
        } catch (e) {
            return {status: 404, message: 'Ошибка'}
        }
    }

    static async deleteByCompany(companyId: UUID) {
        try {
            employees = employees.filter(e => e.company_id !== companyId)
            return {status: 200, message: `Сотрудники компании ${companyId} удалены`}
        } catch (e) {
            return {status: 404, message: 'Ошибка'}
        }
    }
}