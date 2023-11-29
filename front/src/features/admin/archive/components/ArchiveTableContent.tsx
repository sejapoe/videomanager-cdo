import clsx from "clsx";
import {useNavigate} from "react-router-dom";
import {useLecturers} from "../../lecturers/api";
import {FormContextConsumer} from "../../../../ui/form/Form.tsx";
import {ArchiveTableFilter, defaultValues} from "./ArchiveTable.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular} from "@fortawesome/fontawesome-svg-core/import.macro";
import {eIu} from "../../../../utils/undefineds.ts";
import {PaginationController} from "../../../../ui/table/PaginationController.tsx";
import {TableHeadItem} from "../../../../ui/table/TableHeadItem.tsx";
import {ComboboxFilter} from "../../../../ui/table/ComboboxFilter.tsx";
import {useInstitutes} from "../../../common/institutes/api";
import {Department} from "../../../common/institutes/model";
import {Page} from "../../../common/model";
import {ArchiveEntry} from "../model";
import {SearchFilter} from "../../../../ui/table/SearchFilter.tsx";


const ArchiveTableHead = () => {
    const {data: institutes} = useInstitutes()
    const {data: lecturers} = useLecturers({});

    const selectDepartments = (instituteIds: number[]): Department[] => {
        if (!institutes) return []
        if (!eIu(instituteIds)) return institutes.flatMap(value => value.departments)
        return institutes.find(value => instituteIds?.includes(value.id))?.departments || []
    }

    return <thead className="text-left text-white">
    <tr className="bg-gray-700">
        <TableHeadItem title={"#"} field={"id"} className="rounded-tl-lg w-16"/>
        <TableHeadItem field={"name"} className="w-[27rem]"
                       customTitle={
                           <SearchFilter title={"Название"} name={"name"}/>
                       }
        />
        <TableHeadItem field={"lecturer"} className="w-[27rem]"
                       customTitle={
                           <ComboboxFilter<ArchiveTableFilter> name="user"
                                                               title="Преподаватель"
                                                               options={lecturers?.content?.map(value => ({
                                                                   value: value.id,
                                                                   label: value.fullName
                                                               })) || []}/>
                       }
        />
        <TableHeadItem field={"institute"} className="w-36"
                       customTitle={<ComboboxFilter<ArchiveTableFilter>
                           name="institute"
                           title="Институт"
                           options={institutes?.map(value => ({
                               value: value.id,
                               label: value.name
                           })) || []}
                       />}
        />
        <TableHeadItem field={"department"} className="rounded-tr-lg w-36"
                       customTitle={
                           <FormContextConsumer<ArchiveTableFilter>>
                               {({watch}) =>
                                   <ComboboxFilter<ArchiveTableFilter>
                                       name="department"
                                       title="Кафедра"
                                       options={selectDepartments(watch("institute")).map(value => ({
                                           value: value.id,
                                           label: value.name
                                       })) || []}
                                   />
                               }
                           </FormContextConsumer>
                       }
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

type ArchiveTableContentProps = {
    entries: Page<ArchiveEntry>;
}

export const ArchiveTableContent = ({entries}: ArchiveTableContentProps) => {
    const nav = useNavigate();

    return <div>
        <table className="mt-2 text-gray-800 w-full table-fixed">
            <ArchiveTableHead/>
            <tbody className="space-y-1">
            {entries.content.map((value, index) => (
                <tr className={clsx(
                    index % 2 == 0 ? "bg-gray-200" : "bg-gray-300",
                    "space-x-2 cursor-pointer relative"
                )} onClick={() => nav(`./${value.id}`)} key={value.id}>
                    <td className="px-4 py-2 border-2 border-transparent">{value.id}</td>
                    <td className="px-4 py-2 border-2 border-transparent">{value.name}</td>
                    <td className="px-4 py-2 border-2 border-transparent">{value.lecturer.fullName}</td>
                    <td className="px-4 py-2 border-2 border-transparent">{value.institute.name}</td>
                    <td className="px-4 py-2 border-2 border-transparent">{value.department.name}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <div className="w-full flex justify-center">
            <PaginationController totalPages={entries.totalPages}/>
        </div>
    </div>
}