import {Request, RequestStatus} from "../model";
import clsx, {ClassValue} from "clsx";
import {useNavigate} from "react-router-dom";
import Pageable from "../../../../ui/table/Pageable.tsx";
import {Popover} from "@headlessui/react";
import React from "react";
import {ComboboxField} from "../../../../ui/form/ComboboxField.tsx";
import {useLecturers} from "../../../admin/lecturers/api";
import {FormContextConsumer} from "../../../../ui/form/Form.tsx";
import {RequestsTableFilter, statuses} from "./RequestsTable.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useCurrentUser} from "../../../auth/authModel.ts";
import {useInstitutes} from "../../institutes/api";
import {Department} from "../../institutes/model";
import {m1u} from "../../../../utils/numbers.ts";
import {useFormContext} from "react-hook-form";
import {Page} from "../../model";
import {PaginationController} from "../../../../ui/table/PaginationController.tsx";

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

type RequestTableHeadItemProps = {
    title: string;
    field: string;
    className?: ClassValue;
} & ({
    filterInput?: React.ReactNode;
    filterName?: keyof RequestsTableFilter;
} | {
    filterInput: React.ReactNode;
    filterName: keyof RequestsTableFilter;
})

const RequestTableHeadItem = ({title, field, filterInput, filterName, className}: RequestTableHeadItemProps) => {
    const {watch} = useFormContext<RequestsTableFilter>()

    return <th className={clsx(
        "px-4 py-2 border-2 border-gray-100",
        className
    )}>
        <div className="flex justify-between items-center">
            {filterInput ?
                <Popover className="relative w-full">
                    <Popover.Button as="div" className={clsx(
                        "cursor-pointer",
                        m1u(watch(filterName!)) ? "text-green-400" : ""
                    )}
                    >
                        {title}
                    </Popover.Button>

                    <Popover.Panel>
                        <div className="absolute z-10 bg-gray-600 opacity-95 w-max rounded shadow shadow-gray-900 p-4">
                            {filterInput}
                        </div>
                    </Popover.Panel>
                </Popover>
                : title}
            <Pageable.SortButton field={field}/>
        </div>
    </th>
}

type ComboboxFilterProps = {
    name: keyof RequestsTableFilter;
    options: { value: number, label: string }[]
}

const ComboboxFilter = ({name, options}: ComboboxFilterProps) => {
    return <FormContextConsumer<RequestsTableFilter> >
        {({formState, control, watch, resetField}) =>
            <div className="flex items-center">
                <ComboboxField name={name}
                               defaultValue={-1}
                               className="-mt-3"
                               options={options}
                               error={formState.errors[name]}
                               control={control}/>
                <Popover.Button as="div">
                    <FontAwesomeIcon icon={regular("circle-xmark")} className={clsx(
                        "ml-2 text-xl text-gray-200 cursor-pointer",
                        watch(name) ? "text-gray-200" : "cursor-block"
                    )} onClick={() => {
                        resetField(name, {
                            defaultValue: -1,
                        })
                    }}/>
                </Popover.Button>
            </div>
        }
    </FormContextConsumer>
}

const RequestTableHead = () => {
    const user = useCurrentUser()
    const {data: lecturers} = useLecturers();
    const {data: institutes} = useInstitutes()

    const selectDepartments = (instituteId?: number): Department[] => {
        if (!institutes) return []
        if (!m1u(instituteId)) return institutes.flatMap(value => value.departments)
        return institutes.find(value => value.id === instituteId)?.departments || []
    }

    return <thead className="text-left text-white">
    <tr className="bg-gray-700">
        <RequestTableHeadItem title={"#"} field={"id"} className="rounded-tl-lg w-16"/>
        <RequestTableHeadItem title={"Название"} field={"name"} className="w-[22.5rem]"/>
        <RequestTableHeadItem title={"Преподаватель"} field={"lecturer"} className="w-[22.5rem]"
                              filterInput={
                                  user?.role === "ROLE_ADMIN" &&
                                  <ComboboxFilter name="user" options={lecturers?.map(value => ({
                                      value: value.id,
                                      label: value.fullName
                                  })) || []}/>
                              }
                              filterName={"user"}
        />
        <RequestTableHeadItem title={"Институт"} field={"institute"} className="w-36"
                              filterInput={<ComboboxFilter
                                  name="institute"
                                  options={institutes?.map(value => ({
                                      value: value.id,
                                      label: value.name
                                  })) || []}
                              />}
                              filterName={"institute"}
        />
        <RequestTableHeadItem title={"Кафедра"} field={"department"} className="w-36"
                              filterInput={
                                  <FormContextConsumer<RequestsTableFilter>>
                                      {({watch}) =>
                                          <ComboboxFilter
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
        <RequestTableHeadItem title={"Статус"} field={"status"} className="rounded-tr-lg w-36"
                              filterInput={
                                  <ComboboxFilter
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
                        <FontAwesomeIcon icon={regular("circle-xmark")} onClick={reset}/>
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