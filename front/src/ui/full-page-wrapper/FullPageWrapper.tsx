import {ReactNode} from "react";

type FullPageWrapperProps = {
    children: ReactNode;
};

export const FullPageWrapper = ({children}: FullPageWrapperProps) => {
    return <div
        className="w-screen h-screen absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-white"
    >
        {children}
    </div>
}