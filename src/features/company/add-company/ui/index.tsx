import {useAppDispatch} from "@/app/store";

import {createCompany} from "@/entities/companies";

import './styles.css'

export const AddCompany = () => {
    const dispatch = useAppDispatch()
    const onCreateCompany = () => {
        dispatch(createCompany())
    }

    return (
        <div className='add-company' onClick={onCreateCompany}>
            <span className="add-company__icon">&#65291;</span>
            <span className='add-company__title'>Добавить компанию</span>
        </div>
    );
};