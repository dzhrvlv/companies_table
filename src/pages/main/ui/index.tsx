import CompaniesTable from "@/widgets/companies-table/ui";
import EmployeesTable from "@/widgets/employees-table/ui";
import {useState} from "react";
import {UUID} from "@/shared/lib/types.ts";

import './styles.css'

const MainPage = () => {
    const [selectedCompanies, setSelectedCompanies] = useState<UUID[]>([])

    const onSelectCompanies = (ids: UUID[]) => {
        setSelectedCompanies(ids)
    }

    return (
        <div className='main-page'>
            <div className="main-page__column">
                <CompaniesTable
                    onSelectCompanies={onSelectCompanies}
                />
            </div>
            <div className="main-page__column">
                {selectedCompanies.length === 1 &&
                    <EmployeesTable selectedCompany={selectedCompanies[0]}/>
                }
            </div>
        </div>
    );
};

export default MainPage;