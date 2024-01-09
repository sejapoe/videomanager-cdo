import {Page} from "../../model";
import {Request, RequestStatus} from "../model";
import {useNavigate} from "react-router-dom";
import clsx, {ClassValue} from "clsx";
import {PaginationController} from "../../../../ui/table/PaginationController.tsx";
import {statusL10n} from "./RequestsTableContent.tsx";
import {PATH_PAGE} from "../../../../lib/react-router";
import {DepartmentName} from "../../institutes/components/DepartmentName.tsx";

type RequestTableContentMobileProps = {
    requests: Page<Request>;
}

const statusColor: Record<RequestStatus, { text: ClassValue, border: ClassValue }> = {
    "CREATED": {text: "text-cyan-500", border: "border-l-cyan-500"},
    "WIP": {text: "text-yellow-500", border: "border-l-yellow-500"},
    "COMPLETED": {text: "text-green-500", border: "border-l-green-500"},
    "ARCHIVED": {text: "text-gray-500", border: "border-l-gray-500"}
}

export const RequestsTableContentMobile = ({
                                               requests
                                           }: RequestTableContentMobileProps) => {
    const nav = useNavigate();

    return <div className="flex justify-center">
        <div className="w-full lg:mx-0 lg:w-2/3">
            {requests.content.map((value) => (
                <div className={clsx(
                    "text-gray-900 border-b-2 last:border-b-0 border-b-gray-200 flex justify-between cursor-pointer",
                    `px-2 border-l-4 min-[480px]:border-l-0`, statusColor[value.status].border
                )}
                     key={value.id}
                     onClick={() => nav(`${PATH_PAGE.app.requests}/${value.id}`)}>
                    <div className="flex flex-col">
                        <span>{value.name}</span>
                        <span className="text-gray-500 text-sm">{value.lecturer.fullName}</span>
                    </div>
                    <div className="hidden min-[480px]:flex flex-col items-end">
                        <span>{value.institute.name} / <DepartmentName size="md"
                                                                       departmentName={value.department}/></span>
                        <span
                            className={clsx("text-sm", `${statusColor[value.status].text}`)}>{statusL10n[value.status]}</span>
                    </div>
                </div>
            ))}
            <div className="w-full flex justify-center">
                <PaginationController totalPages={requests.totalPages}/>
            </div>
        </div>
    </div>
}