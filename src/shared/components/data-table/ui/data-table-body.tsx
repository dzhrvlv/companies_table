import {ReactNode} from "react";

type PropsType = {
    children: ReactNode
}
const DataTableBody = ({children}: PropsType) => {
    return (
        <tbody>
            {children}
        </tbody>
    );
};

export default DataTableBody;