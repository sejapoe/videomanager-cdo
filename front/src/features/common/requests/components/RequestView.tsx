import React from "react";
import {Link, useParams} from "react-router-dom";
import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {FullRequest, RequestStatus} from "../model";
import {useRequest} from "../api";
import {CorrectionsProps} from "../../corrections/components/CorrectionProps.ts";
import {ErrorLoadLayout} from "../../../../ui/layout/ErrorLoadLayout.tsx";
import {ActionProps} from "./ActionProps.ts";
import {statusL10n} from "./RequestsTable.tsx";
import clsx, {ClassValue} from "clsx";


const statusColor: Record<RequestStatus, ClassValue> = {
    "DENIED": "bg-red-300 border-red-500",
    "CREATED": "bg-cyan-300 border-cyan-500",
    "WIP": "bg-yellow-300 border-yellow-500",
    "COMPLETE": "bg-green-300 border-green-500",
}


type RequestContentProps = RequestProps & {
    request: FullRequest
}

const RequestContent = ({request, correctionsSection, actionsSection}: RequestContentProps) => {
    return <ContentLayout title={request.name}>
        <div className="w-full grid grid-cols-2">
            <div className="text-gray-700">
                <div className="w-full flex justify-between items-center">
                    <h2 className="mt-4 mb-2 text-2xl">Основная информация: </h2>
                    <span className={clsx(
                        statusColor[request.status],
                        "h-fit border mr-4 px-2 py-1 rounded"
                    )}>
                        {statusL10n[request.status]}
                    </span>
                </div>
                <ul className="ml-2 space-y-2 text-xl">
                    <li>Институт: {request.institute.name}</li>
                    <li>Кафедра: {request.department.name}</li>
                    <li>Преподаватель: {request.lecturer.fullName}</li>
                    <li><Link to={request.linkToMoodle}>Ссылка на СДО</Link></li>
                </ul>
            </div>
            <div>
                {actionsSection({request})}
            </div>
        </div>
        {correctionsSection({
            request
        })}
    </ContentLayout>
}

type RequestProps = {
    correctionsSection: (props: CorrectionsProps) => React.ReactNode;
    actionsSection: (props: ActionProps) => React.ReactNode
}


export const RequestView = ({correctionsSection, actionsSection}: RequestProps) => {
    const {id} = useParams();

    const {data: request, error, isLoading} = useRequest(parseInt(id || ""))

    return <ErrorLoadLayout error={error} isLoading={isLoading}>
        <RequestContent correctionsSection={correctionsSection} request={request!} actionsSection={actionsSection}/>
    </ErrorLoadLayout>
}