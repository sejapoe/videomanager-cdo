import {Link, useParams} from "react-router-dom";
import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {ArchiveEntry} from "../model";
import {ErrorLoadLayout} from "../../../../ui/layout/ErrorLoadLayout.tsx";
import clsx from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {PATH_PAGE} from "../../../../lib/react-router";
import {useArchiveEntry} from "../api";
import {DepartmentName} from "../../../common/institutes/components/DepartmentName.tsx";
import {ArchiveEntryActions} from "./ArchiveEntryActions.tsx";


type ArchiveEntryContentProps = {
    entry: ArchiveEntry
}

const ArchiveEntryContent = ({entry}: ArchiveEntryContentProps) => {
    return <ContentLayout title={entry.name}
                          titleElement={
                              <div className="w-full md:flex justify-between items-center">
                                  <h1 className="text-2xl font-semibold text-gray-900">
                                      {entry.name}
                                  </h1>
                                  <span
                                      className="bg-gray-200 text-lg px-2 py-1 rounded border border-gray-800 text-gray-800">
                                          {entry.institute.name} / <DepartmentName size="lg"
                                                                                   departmentName={entry.department}/>
                                      </span>
                              </div>
                          }>
        <div className="w-full mt-2 grid md:grid-cols-2">
            <div className="text-gray-700 text-lg">
                <p>Преподаватель: {entry.lecturer.fullName}</p>
                <p>
                    <Link to={entry.linkToMoodle}>Ссылка на СДО</Link>
                </p>
                {entry.request && <p>
                    <Link to={`${PATH_PAGE.app.requests}/${entry.request.id}`}>Ссылка на запрос</Link>
                </p>}
                {entry.description &&
                    <p>
                        Описание:
                        <p className="whitespace-pre">
                            {entry.description}
                        </p>
                    </p>}
                <div className="flex">
                    <ArchiveEntryActions entry={entry}/>
                </div>
            </div>
            <div className="flex justify-end">
                <a className={clsx(
                    "w-full md:w-3/4 lg:w-3/5 aspect-video rounded-xl flex items-center justify-center",
                    "bg-[url('/blurred.jpg')] bg-contain",
                    "text-gray-500/80 hover:text-red-500/80 hover:scale-105 cursor-pointer transition-all"
                )} href={entry.linkToVideo} target="_blank">
                    <div
                        className="rounded-full bg-black/80 border-black w-16 aspect-square flex justify-center items-center">
                        <FontAwesomeIcon className="ml-1 text-4xl" icon={solid("play")}/>
                    </div>
                </a>
            </div>
        </div>
    </ContentLayout>
}

export const ArchiveEntryView = () => {
    const {id} = useParams();

    const {data: entry, error, isLoading} = useArchiveEntry(parseInt(id || ""))

    return <ErrorLoadLayout error={error} isLoading={isLoading}>
        <ArchiveEntryContent entry={entry!}/>
    </ErrorLoadLayout>
}