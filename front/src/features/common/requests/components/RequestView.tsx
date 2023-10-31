import React from "react";
import {Link, useParams} from "react-router-dom";
import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {FullRequest} from "../model";
import {useRequest} from "../api/requestsApi.ts";
import Spinner from "../../../../ui/spinner";
import {CorrectionsProps} from "../../corrections/components/CorrectionProps.ts";

type RequestContentProps = RequestProps & {
    request: FullRequest
}

const RequestContent = ({request, correctionsSection}: RequestContentProps) => {
    return <ContentLayout title={`Пу-пу-пу ${request.name}`}>
        <div className="text-gray-700">
            <h2 className="mt-4 mb-2 text-2xl">Основная информация: </h2>
            <ul className="ml-2 space-y-2 text-xl">
                <li>Институт: {request.institute.name}</li>
                <li>Кафедра: {request.department.name}</li>
                <li>Преподаватель: {request.lecturer.fullName}</li>
                <li><Link to={request.linkToMoodle}>Ссылка на СДО</Link></li>
            </ul>
        </div>
        {correctionsSection({
            parentRequestId: request.id,
            corrections: request.corrections
        })}
    </ContentLayout>
}

type RequestProps = {
    correctionsSection: (props: CorrectionsProps) => React.ReactNode;
}


export const RequestView = ({correctionsSection}: RequestProps) => {
    const {id} = useParams();

    const {data: request} = useRequest(parseInt(id || ""))

    return request ? <RequestContent correctionsSection={correctionsSection} request={request}/> : <Spinner/>
}