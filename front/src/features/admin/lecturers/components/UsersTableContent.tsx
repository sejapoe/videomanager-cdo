import {Lecturer} from "../model";
import clsx, {ClassValue} from "clsx";
import {Page} from "../../../common/model";
import {FormContextConsumer} from "../../../../ui/form/Form.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular} from "@fortawesome/fontawesome-svg-core/import.macro";
import {statuses, usersFilterDefaultValues} from "./UsersTable.tsx";
import {TableHeadItem} from "../../../../ui/table/TableHeadItem.tsx";
import {ComboboxFilter} from "../../../../ui/table/ComboboxFilter.tsx";
import {PaginationController} from "../../../../ui/table/PaginationController.tsx";

const statusL10n: Record<"false" | "true", string> = {
    "false": "Неактивен",
    "true": "Активен"
}

const statusColors: Record<"false" | "true", [ClassValue, ClassValue]> = {
    "false": ["bg-red-200", "bg-red-300"],
    "true": ["bg-green-200", "bg-green-300"]
}

const booleanToString = (b: boolean): "false" | "true" => b ? "true" : "false"

const UsersTableHead = () => {
    return <thead className="text-left text-white">
    <tr className="bg-gray-700">
        <TableHeadItem title={"#"} field={"id"} className="rounded-tl-lg w-16"/>
        <TableHeadItem title={"ФИО"} field={"fullName"} className="w-[31.5rem]"/>
        <TableHeadItem title={"Электронная почта"} field={"email"} className="w-[31.5rem]"/>
        <TableHeadItem field={"enabled"} className="rounded-tr-lg w-36"
                       customTitle={
                           <ComboboxFilter
                               name="status"
                               title="Статус"
                               options={Object.entries(statuses)
                                   .filter(value => value[0] != "-1")
                                   .map(value => ({
                                       value: parseInt(value[0]),
                                       label: statusL10n[booleanToString(value[1] as boolean)]
                                   })) || []}
                           />
                       }
        />
        <th className="bg-gray-100 w-12">
            <FormContextConsumer>
                {({formState, reset}) => (
                    formState.isDirty &&
                    <div className="flex justify-center items-center cursor-pointer text-2xl text-red-700">
                        <FontAwesomeIcon icon={regular("circle-xmark")}
                                         onClick={() => reset(usersFilterDefaultValues)}/>
                    </div>
                )}
            </FormContextConsumer>
        </th>
    </tr>
    </thead>
}


type UsersTableProps = {
    users: Page<Lecturer>
}

export const UsersTableContent = ({users}: UsersTableProps) => {
    return <div className="mt-2">
        <table className="text-gray-900 table-fixed w-full">
            <UsersTableHead/>
            <tbody>
            {
                users.content.map((value, index) => <tr className={clsx(
                        index % 2 == 0 ? "bg-gray-200" : "bg-gray-300",
                        "space-x-2 cursor-pointer relative"
                    )} key={index}>
                        <td className="px-4 py-2 border-2 border-gray-100">{value.id}</td>
                        <td className="px-4 py-2 border-2 border-gray-100">{value.fullName}</td>
                        <td className="px-4 py-2 border-2 border-gray-100">{value.email}</td>
                        <td className={clsx(
                            "px-4 py-2 border-2 border-gray-100",
                            statusColors[booleanToString(value.enabled)][index % 2]
                        )}>{statusL10n[booleanToString(value.enabled)]}</td>
                    </tr>
                )
            }
            </tbody>
        </table>
        <div className="w-full flex justify-center">
            <PaginationController totalPages={users.totalPages}/>
        </div>
    </div>
}

