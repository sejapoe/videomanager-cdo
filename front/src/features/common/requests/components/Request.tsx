import React from "react";
import {useParams} from "react-router-dom";
import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";

type RequestProps = {
    commentSection: React.ReactNode;
}

export const Request = ({commentSection}: RequestProps) => {
    const {id} = useParams();

    return <ContentLayout title={`Пу-пу-пу ${id}`}>
        {commentSection}
    </ContentLayout>
}