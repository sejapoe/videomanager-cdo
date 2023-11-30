import {Page} from "../../../common/model";
import clsx, {ClassValue} from "clsx";
import {useNavigate} from "react-router-dom";
import {PATH_PAGE} from "../../../../lib/react-router";
import {PaginationController} from "../../../../ui/table/PaginationController.tsx";
import {Lecturer} from "../model";

type UsersTableContentMobileProps = {
    users: Page<Lecturer>;
}

const statusL10n: Record<"false" | "true", string> = {
    "false": "Неактивен",
    "true": "Активен"
}

const statusColor: Record<"true" | "false", { text: ClassValue, border: ClassValue }> = {
    "false": {text: "text-red-500", border: "border-l-red-500"},
    "true": {text: "text-green-500", border: "border-l-green-500"},
}

const booleanToString = (b: boolean): "false" | "true" => b ? "true" : "false"

export const UsersTableContentMobile = ({
                                            users
                                        }: UsersTableContentMobileProps) => {
    const nav = useNavigate();

    return <div className="flex justify-center">
        <div className="w-full lg:mx-0 lg:w-2/3">
            {users.content.map((value) => (
                <div className={clsx(
                    "text-gray-900 border-b-2 last:border-b-0 border-b-gray-200 flex justify-between cursor-pointer",
                    `px-2 border-l-4 min-[480px]:border-l-0`, statusColor[booleanToString(value.enabled)].border
                )}
                     key={value.id}
                     onClick={() => nav(`${PATH_PAGE.app.requests}/${value.id}`)}>
                    <div className="flex flex-col">
                        <span>{value.fullName}</span>
                        <span className="text-gray-500 text-sm">{value.email}</span>
                    </div>
                    <div className="hidden min-[480px]:flex flex-col items-end">
                        <span className={clsx("text-sm", `${statusColor[booleanToString(value.enabled)].text}`)}>
                            {statusL10n[booleanToString(value.enabled)]}
                        </span>
                    </div>
                </div>
            ))}
            <div className="w-full flex justify-center">
                <PaginationController totalPages={users.totalPages}/>
            </div>
        </div>
    </div>
}