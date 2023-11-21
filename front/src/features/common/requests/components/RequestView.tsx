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
    "DENIED": "bg-red-300 border-red-700",
    "CREATED": "bg-cyan-300 border-cyan-700",
    "WIP": "bg-yellow-300 border-yellow-700",
    "COMPLETE": "bg-green-300 border-green-700",
}


type RequestContentProps = RequestProps & {
    request: FullRequest
}

const RequestContent = ({request, correctionsSection, actionsSection}: RequestContentProps) => {
    return <ContentLayout title={request.name}
                          titleElement={
                              <div className="w-full md:flex justify-between items-center">
                                  <h1 className="text-2xl font-semibold text-gray-900">
                                      {request.name}
                                  </h1>
                                  <div className="space-x-4">
                                      <span
                                          className="bg-gray-200 text-lg px-2 py-1 rounded border border-gray-800 text-gray-800">
                                          {request.institute.name} / {request.department.name}
                                      </span>
                                      <span className={clsx(
                                          statusColor[request.status],
                                          "border px-2 py-1 rounded text-gray-800 text-lg"
                                      )}>{statusL10n[request.status]}</span>
                                  </div>
                              </div>
                          }>
        <div className="w-full grid grid-rows-2 md:grid-cols-2">
            <div className="text-gray-700 text-lg">
                <p>Преподаватель: {request.lecturer.fullName}</p>
                <Link to={request.linkToMoodle}>Ссылка на СДО</Link>
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