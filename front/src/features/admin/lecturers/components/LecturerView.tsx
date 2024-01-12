import {lecturerKeys, useLecturer, useResetPasswordLecturer} from "../api";
import {ErrorLoadLayout} from "../../../../ui/layout/ErrorLoadLayout.tsx";
import {Lecturer} from "../model";
import clsx from "clsx";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {useParams} from "react-router-dom";
import {queryClient} from "../../../../lib/react-query";
import {useDialog} from "../../../../providers/DialogProvider.tsx";
import {RenameLecturerForm} from "./RenameLecturerForm.tsx";

type LecturerViewContentProps = {
    lecturer: Lecturer
};

export const LecturerViewContent = ({lecturer}: LecturerViewContentProps) => {
    const {mutate, isLoading} = useResetPasswordLecturer()
    const openRenameLecturer = useDialog({
        title: "Изменение преподавателя",
        children: (close) => <RenameLecturerForm lecturer={lecturer} onSubmit={async () => {
            await queryClient.invalidateQueries({queryKey: lecturerKeys.lecturers.byId(lecturer.id)})
            close()
        }}/>
    })

    return <ContentLayout title={lecturer.fullName}
                          titleElement={
                              <div className="w-full md:flex justify-between items-center">
                                  <h1 className="text-2xl font-semibold text-gray-900">
                                      {lecturer.fullName}
                                  </h1>
                                  <div className="space-x-4">
                                      <span className={clsx(
                                          lecturer.enabled ? "bg-green-500" : "bg-red-500",
                                          "border px-2 py-1 rounded text-white text-lg"
                                      )}>{lecturer.enabled ? "Активен" : "Неактивен"}</span>
                                  </div>
                              </div>
                          }>
        <div className="w-full mt-2 grid md:grid-cols-2">
            <div className="text-gray-700 text-lg">
                <p>Электронная почта: {lecturer.email}</p>
                <div className="w-full flex flex-col flex-wrap gap-2 min-[480px]:flex-row py-2">
                    <Button
                        startIcon={solid("edit")}
                        variant="inverse"
                        onClick={() => openRenameLecturer()}
                    >
                        Изменить имя
                    </Button>

                    <Button
                        isLoading={isLoading}
                        startIcon={solid("edit")}
                        variant="danger"
                        disabled={!lecturer.enabled}
                        title={!lecturer.enabled ? "Пользователь не имеет пароля" : undefined}
                        onClick={() => {
                            mutate(lecturer.id, {
                                onSuccess: async () => {
                                    await queryClient.invalidateQueries(lecturerKeys.lecturers.root)
                                }
                            })
                        }}
                    >
                        Сбросить пароль
                    </Button>
                </div>
            </div>
        </div>
    </ContentLayout>
};

export const LecturerView = () => {
    const {id} = useParams()
    const {data: lecturer, isLoading, error} = useLecturer(Number(id || "-1"))

    return (
        <ErrorLoadLayout isLoading={isLoading} error={error}>
            <LecturerViewContent lecturer={lecturer!}/>
        </ErrorLoadLayout>
    );
};