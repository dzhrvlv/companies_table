import {UUID} from "@/shared/lib/types.ts";

export interface ICompany {
    [key: string]: UUID | string | number,

    id: UUID
    name: string
    address: string
    num_employees: number
}