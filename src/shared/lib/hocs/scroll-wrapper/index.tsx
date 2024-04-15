import {ReactNode, UIEventHandler} from "react";
import './styles.css'

type PropsType = {
    children: ReactNode,
    onScroll: () => void
}

const ScrollWrapper = ({children, onScroll}: PropsType) => {
    const scrollHandler: UIEventHandler<HTMLDivElement> = (e) => {
        const {
            scrollHeight,
            scrollTop,
            offsetHeight
        } = e.target as HTMLDivElement

        if (scrollHeight - (scrollTop + offsetHeight) === 0) onScroll()

    }

    return (
        <div className='scroll-wrapper' onScroll={scrollHandler}>
            {children}
        </div>
    );
};

export default ScrollWrapper;