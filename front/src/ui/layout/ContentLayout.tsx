import React from "react";
import {Head} from "../head/Head.tsx";

type ContentLayoutProps = {
    children: React.ReactNode;
    title: string;
    titleElement?: React.ReactNode;
}

export const ContentLayout = ({children, title, titleElement}: ContentLayoutProps) => {
    return (
        <>
            <Head title={title}/>
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    {titleElement || <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>}
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
            </div>
        </>
    )
}