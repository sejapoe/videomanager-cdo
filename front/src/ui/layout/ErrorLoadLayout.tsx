import {GenericErrorModel} from "../../api";
import React from "react";
import {ProblemDetailDto} from "../../api/Api.ts";
import {ContentLayout} from "./ContentLayout.tsx";
import {CenterSpinner} from "./CenterSpinner.tsx";

type ErrorContentLayoutProps = {
    error: ProblemDetailDto
};

const ErrorContentLayout = ({error}: ErrorContentLayoutProps) => {
    return <ContentLayout title={error.title || "Ошибка"}>
        <span className="text-gray-600">{error.detail}</span>
    </ContentLayout>
};

type ErrorLoadLayoutProps = {
    error?: GenericErrorModel | null;
    isLoading: boolean;
    children: React.ReactNode
    errorElement?: React.ReactNode
}

export const ErrorLoadLayout = ({error, isLoading, children, errorElement}: ErrorLoadLayoutProps) => {
    return isLoading ? <CenterSpinner/> :
        error ? errorElement || <ErrorContentLayout error={error.error}/>
            : children
}