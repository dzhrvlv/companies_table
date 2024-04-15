import {useAppDispatch} from "@/app/store";
import {UUID} from "@/shared/lib/types.ts";
import {deleteEmployees} from "@/entities/employees";

import './styles.css'

type PropsType = {
    selectedEmployees: UUID[],
    companyId: UUID
}
export const DeleteEmployees = ({selectedEmployees, companyId}: PropsType) => {
    const dispatch = useAppDispatch()

    const onDeleteEmployees = () => {
        dispatch(deleteEmployees({
            ids: selectedEmployees,
            companyId
        }))
    }

    return (
        <div className='delete-employees' onClick={onDeleteEmployees}>
            <span className='delete-employees__title'>Удалить сотрудников</span>
        </div>
    );
};

