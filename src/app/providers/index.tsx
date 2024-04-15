import {ReactNode} from "react";
import {Provider as StoreProvider} from "react-redux";

import {store} from "../store";

type PropsType = {
    children: ReactNode
}

const Providers = ({children}: PropsType) => {
    return (
        <>
            <StoreProvider store={store}>
                {children}
            </StoreProvider>
        </>
    );
};

export default Providers;