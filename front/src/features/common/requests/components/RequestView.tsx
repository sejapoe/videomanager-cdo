import React from "react";
import {Link, useParams} from "react-router-dom";
import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {FullRequest, RequestStatus} from "../model";
import {useRequest} from "../api";
import {CorrectionsProps} from "../../corrections/components/CorrectionProps.ts";
import {ErrorLoadLayout} from "../../../../ui/layout/ErrorLoadLayout.tsx";
import {ActionProps} from "./ActionProps.ts";
import {statusL10n} from "./RequestsTableContent.tsx";
import clsx, {ClassValue} from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";


const statusColor: Record<RequestStatus, ClassValue> = {
    "CREATED": "bg-cyan-300 border-cyan-700",
    "WIP": "bg-yellow-300 border-yellow-700",
    "COMPLETED": "bg-green-300 border-green-700",
    "ARCHIVED": "bg-gray-500 border-gray-700 text-white"
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
        <div className="w-full mt-2 grid md:grid-cols-2">
            <div className="text-gray-700 text-lg">
                <p>Преподаватель: {request.lecturer.fullName}</p>
                <Link to={request.linkToMoodle}>Ссылка на СДО</Link>
                <div className="w-full flex flex-col gap-2 min-[480px]:flex-row py-2">
                    {actionsSection({request})}
                </div>
            </div>
            <div className="flex justify-end">
                <a className={clsx(
                    "w-full md:w-3/5 aspect-video rounded-xl flex items-center justify-center",
                    "bg-[url('/blurred.jpg')] bg-contain",
                    "text-gray-500/80 hover:text-red-500/80 hover:scale-105 cursor-pointer transition-all"
                )} href={request.linkToVideo} target="_blank">
                    <div
                        className="rounded-full bg-black/80 border-black w-16 aspect-square flex justify-center items-center">
                        <FontAwesomeIcon className="ml-1 text-4xl" icon={solid("play")}/>
                    </div>
                </a>
            </div>
        </div>
        <div className="mt-4">
            {correctionsSection({
                request
            })}
        </div>
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