import {ArchiveEntry} from "../model";
import {useNavigate} from "react-router-dom";
import clsx from "clsx";
import {PaginationController} from "../../../../ui/table/PaginationController.tsx";
import {PATH_PAGE} from "../../../../lib/react-router";
import {Page} from "../../../common/model";

type RequestTableContentMobileProps = {
    entries: Page<ArchiveEntry>;
}

export const ArchiveTableContentMobile = ({
                                              entries
                                          }: RequestTableContentMobileProps) => {
    const nav = useNavigate();

    return <div className="flex justify-center">
        <div className="w-full lg:mx-0 lg:w-2/3">{/*<RequestTableHead/>*/}
            {entries.content.map((value) => (
                <div className={clsx(
                    "text-gray-900 border-b-2 last:border-b-0 border-b-gray-200 flex justify-between cursor-pointer",
                    `px-2`
                )}
                     key={value.id}
                     onClick={() => nav(`${PATH_PAGE.app.archive}/${value.id}`)}>
                    <div className="flex flex-col">
                        <span>{value.name}</span>
                        <span className="text-gray-500 text-sm">{value.lecturer.fullName}</span>
                    </div>
                    <div className="hidden min-[480px]:flex flex-col items-end">
                        <span>{value.institute.name} / {value.department.name}</span>
                    </div>
                </div>
            ))}
            <div className="w-full flex justify-center">
                <PaginationController totalPages={entries.totalPages}/>
            </div>
        </div>
    </div>
}