import {UUID} from "@/shared/lib/types.ts";

export interface IEmployee {
    [key: string]: UUID | string,

    id: UUID
    firstname: string
    surname: string
    company_id: UUID
    salary: string
}