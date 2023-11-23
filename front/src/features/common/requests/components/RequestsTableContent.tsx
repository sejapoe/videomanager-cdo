import {Request, RequestStatus} from "../model";
import clsx, {ClassValue} from "clsx";
import {useNavigate} from "react-router-dom";
import {useLecturers} from "../../../admin/lecturers/api";
import {FormContextConsumer} from "../../../../ui/form/Form.tsx";
import {defaultValues, RequestsTableFilter, statuses} from "./RequestsTable.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useCurrentUser} from "../../../auth/authModel.ts";
import {useInstitutes} from "../../institutes/api";
import {Department} from "../../institutes/model";
import {m1u} from "../../../../utils/undefineds.ts";
import {Page} from "../../model";
import {PaginationController} from "../../../../ui/table/PaginationController.tsx";
import {TableHeadItem} from "../../../../ui/table/TableHeadItem.tsx";
import {ComboboxFilter} from "../../../../ui/table/ComboboxFilter.tsx";

export const statusL10n: Record<RequestStatus, string> = {
    "DENIED": "Отклонена",
    "CREATED": "Создана",
    "WIP": "В работе",
    "COMPLETE": "Завершена"
}

const statusColor: Record<RequestStatus, [ClassValue, ClassValue]> = {
    "DENIED": ["bg-red-200", "bg-red-300"],
    "CREATED": ["bg-cyan-200", "bg-cyan-300"],
    "WIP": ["bg-yellow-200", "bg-yellow-300"],
    "COMPLETE": ["bg-green-200", "bg-green-300"],
}

const RequestTableHead = () => {
    const user = useCurrentUser()
    const {data: lecturers} = useLecturers({});
    const {data: institutes} = useInstitutes()

    const selectDepartments = (instituteId?: number): Department[] => {
        if (!institutes) return []
        if (!m1u(instituteId)) return institutes.flatMap(value => value.departments)
        return institutes.find(value => value.id === instituteId)?.departments || []
    }

    return <thead className="text-left text-white">
    <tr className="bg-gray-700">
        <TableHeadItem<RequestsTableFilter> title={"#"} field={"id"} className="rounded-tl-lg w-16"/>
        <TableHeadItem<RequestsTableFilter> title={"Название"} field={"name"} className="w-[22.5rem]"/>
        <TableHeadItem<RequestsTableFilter> title={"Преподаватель"} field={"lecturer"} className="w-[22.5rem]"
                                            filterInput={
                                                user?.role === "ROLE_ADMIN" &&
                                                <ComboboxFilter<RequestsTableFilter> name="user"
                                                                                     options={lecturers?.content?.map(value => ({
                                                                                         value: value.id,
                                                                                         label: value.fullName
                                                                                     })) || []}/>
                                            }
                                            filterName={"user"}
        />
        <TableHeadItem<RequestsTableFilter> title={"Институт"} field={"institute"} className="w-36"
                                            filterInput={<ComboboxFilter<RequestsTableFilter>
                                                name="institute"
                                                options={institutes?.map(value => ({
                                                    value: value.id,
                                                    label: value.name
                                                })) || []}
                                            />}
                                            filterName={"institute"}
        />
        <TableHeadItem<RequestsTableFilter> title={"Кафедра"} field={"department"} className="w-36"
                                            filterInput={
                                                <FormContextConsumer<RequestsTableFilter>>
                                                    {({watch}) =>
                                                        <ComboboxFilter<RequestsTableFilter>
                                                            name="department"
                                                            options={selectDepartments(watch("institute")).map(value => ({
                                                                value: value.id,
                                                                label: value.name
                                                            })) || []}
                                                        />
                                                    }
                                                </FormContextConsumer>
                                            }
                                            filterName={"department"}
        />
        <TableHeadItem<RequestsTableFilter> title={"Статус"} field={"status"} className="rounded-tr-lg w-36"
                                            filterInput={
                                                <ComboboxFilter<RequestsTableFilter>
                                                    name="status"
                                                    options={Object.entries(statuses)
                                                        .filter(value => !!value[1])
                                                        .map(value => ({
                                                            value: parseInt(value[0]),
                                                            label: statusL10n[value[1] as RequestStatus]
                                                        })) || []}
                                                />
                                            }
                                            filterName={"status"}
        />
        <th className="bg-gray-100 w-12">
            <FormContextConsumer>
                {({formState, reset}) => (
                    formState.isDirty &&
                    <div className="flex justify-center items-center cursor-pointer text-2xl text-red-700">
                        <FontAwesomeIcon icon={regular("circle-xmark")} onClick={() => reset(defaultValues)}/>
                    </div>
                )}
            </FormContextConsumer>
        </th>
    </tr>
    </thead>
}

type RequestTableContentProps = {
    requests: Page<Request>;
}

export const RequestsTableContent = ({
                                         requests
                                     }: RequestTableContentProps) => {
    const nav = useNavigate();

    return <div>
        <table className="mt-2 text-gray-800 w-full table-fixed">
            <RequestTableHead/>
            <tbody className="space-y-1">
            {requests.content.map((value, index) => (
                <tr className={clsx(
                    index % 2 == 0 ? "bg-gray-200" : "bg-gray-300",
                    "space-x-2 cursor-pointer relative"
                )} onClick={() => nav(`./${value.id}`)} key={value.id}>
                    <td className="px-4 py-2 border-2 border-transparent">{value.id}</td>
                    <td className="px-4 py-2 border-2 border-transparent">{value.name}</td>
                    <td className="px-4 py-2 border-2 border-transparent">{value.lecturer.fullName}</td>
                    <td className="px-4 py-2 border-2 border-transparent">{value.institute.name}</td>
                    <td className="px-4 py-2 border-2 border-transparent">{value.department.name}</td>
                    <td className={clsx(
                        "px-4 py-2 border-2 border-transparent",
                        statusColor[value.status][index % 2],
                    )}>{statusL10n[value.status]}</td>
                    <td className={clsx(
                        value.unreadCount == 0
                            ? "hidden"
                            : "px-2 py-2 border-2 border-transparent bg-orange-500 text-white rounded-r-xl text-center text-lg"
                    )}>
                        {value.unreadCount}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        <div className="w-full flex justify-center">
            <PaginationController totalPages={requests.totalPages}/>
        </div>
    </div>
}