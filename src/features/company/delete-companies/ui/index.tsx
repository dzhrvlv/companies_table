import {useAppDispatch} from "@/app/store";
import {deleteCompanies} from "@/entities/companies";
import {UUID} from "@/shared/lib/types.ts";

import './styles.css'

type PropsType = {
    selectedCompanies: UUID[],
}

export const DeleteCompanies = ({selectedCompanies}: PropsType) => {
    const dispatch = useAppDispatch()

    const onDeleteCompanies = () => {
        dispatch(deleteCompanies(selectedCompanies))
    }

    return (
        <div className='delete-companies' onClick={onDeleteCompanies}>
            <span className='delete-companies__title'>Удалить компании</span>
        </div>
    );
};