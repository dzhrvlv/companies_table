import {createEmployee} from "@/entities/employees";
import {UUID} from "@/shared/lib/types.ts";
import {useAppDispatch} from "@/app/store";
import './styles.css'

type PropsType = {
    companyId: UUID
}

export const AddEmployee = ({companyId}: PropsType) => {
    const dispatch = useAppDispatch()

    const onAddEmployeeToCompany = () => {
        dispatch(createEmployee(companyId))
    }

    return (
        <div className='add-employee' onClick={onAddEmployeeToCompany}>
            <span className="add-employee__icon">&#65291;</span>
            <span className='add-employee__title'>Добавить сотрудника</span>
        </div>
    );
};

