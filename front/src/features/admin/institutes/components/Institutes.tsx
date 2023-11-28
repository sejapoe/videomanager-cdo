import {useInstitutes} from "../../../common/institutes/api";
import {ErrorLoadLayout} from "../../../../ui/layout/ErrorLoadLayout.tsx";
import {Department, Institute, InstituteWithDepartments} from "../../../common/institutes/model";
import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {useDialog} from "../../../../hooks/useDialog.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {NewInstituteForm} from "./NewInstituteForm.tsx";
import {NewDepartmentForm} from "./NewDepartmentForm.tsx";
import {UploadFileForm} from "./UploadFileForm.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {DeleteInstituteForm} from "./DeleteInstituteForm.tsx";
import {DeleteDepartmentForm} from "./DeleteDepartmentForm.tsx";

type SingleDepartmentProps = {
    department: Department
}

const SingleDepartment = ({department}: SingleDepartmentProps) => {
    const {
        Dialog: DeleteDepartmentDialog,
        open: openDeleteDepartment
    } = useDialog<{}, void>({title: "Удаление кафедры"})

    return <p className="relative w-full text-gray-900 group hover:bg-gray-300 rounded py-1 transition-colors"
              key={`department-${department.id}`}>
        <DeleteDepartmentDialog>
            {({ok, close}) => (
                <DeleteDepartmentForm department={department} onSubmit={ok} close={close}/>
            )}
        </DeleteDepartmentDialog>

        {department.name}
        <div className="absolute top-1 right-2 space-x-2 hidden group-hover:block">
            <FontAwesomeIcon icon={solid("pen")}
                             className="text-gray-400 transition-colors hover:text-blue-600 cursor-pointer"/>
            <FontAwesomeIcon icon={solid("trash")}
                             className="text-gray-400 transition-colors hover:text-red-600 cursor-pointer"
                             onClick={() => openDeleteDepartment({})}
            />
        </div>
    </p>
}

type SingleInstituteProps = {
    institute: InstituteWithDepartments
}

const SingleInstitute = ({institute}: SingleInstituteProps) => {
    const {
        Dialog: CreateDepartmentDialog,
        open: openCreateDepartment
    } = useDialog<number, void>({title: "Создание института"})

    const {Dialog: DeleteInstituteDialog, open: openDeleteInstitute} = useDialog<{
        institute: Institute
    }, void>({title: "Удаление института"})

    return <div
        className="shadow bg-gray-200 border border-gray-300 flex flex-col items-center p-2 rounded-xl justify-between">
        <CreateDepartmentDialog>
            {({ok, close, args: id}) =>
                <NewDepartmentForm instituteId={id} onSubmit={ok} close={close}/>
            }
        </CreateDepartmentDialog>
        <DeleteInstituteDialog>
            {({ok, close}) =>
                <DeleteInstituteForm onSubmit={ok} close={close} institute={institute}/>
            }
        </DeleteInstituteDialog>

        <div className="w-full text-center">
            <div className="w-full border-b-2 border-b-gray-600 pb-1 mb-1 relative">
                <h1 className="text-3xl text-gray-900">{institute.name}</h1>
                <div className="absolute top-0 right-0 space-x-2">
                    <FontAwesomeIcon icon={solid("pen")}
                                     className="text-gray-400 transition-colors hover:text-blue-600 cursor-pointer"/>
                    <FontAwesomeIcon icon={solid("trash")}
                                     className="text-gray-400 transition-colors hover:text-red-600 cursor-pointer"
                                     onClick={() => openDeleteInstitute({institute})}
                    />
                </div>
            </div>

            {institute.departments.map(department => (
                <SingleDepartment department={department}/>
            ))}
        </div>

        <Button
            className="mt-2"
            size="sm"
            variant="inverse"
            startIcon={solid("plus")}
            onClick={() => {
                openCreateDepartment(institute.id)
            }}
        >
            Создать
        </Button>
    </div>
}

type InstitutesContentProps = {
    institutes: InstituteWithDepartments[]
}


const InstitutesContent = ({institutes}: InstitutesContentProps) => {
    const {
        Dialog: CreateInstituteDialog,
        open: openCreateInstitute
    } = useDialog<{}, void>({title: "Создание института"})


    const {
        Dialog: UploadFileDialog,
        open: openUploadFile
    } = useDialog<{}, void>({title: "Загрузка конфигурации институтов"})

    return <>
        <CreateInstituteDialog>
            {({ok, close}) =>
                <NewInstituteForm onSubmit={ok} close={close}/>
            }
        </CreateInstituteDialog>

        <UploadFileDialog>
            {({ok, close}) => <UploadFileForm onSubmit={ok} close={close}/>}
        </UploadFileDialog>

        <ContentLayout title="Институты" titleElement={<div className="flex justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">{"Институты"}</h1>
            <div className="flex space-x-4">
                <Button
                    startIcon={solid("upload")}
                    onClick={() => openUploadFile({}, () => {
                    })}>
                    Загрузить файл
                </Button>
                <Button
                    startIcon={solid("plus")}
                    onClick={() => openCreateInstitute({})}>
                    Создать
                </Button>
            </div>
        </div>}>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                {institutes.map(institute => (
                    <SingleInstitute key={`institute-${institute.id}`} institute={institute}/>
                ))}
            </div>
        </ContentLayout>
    </>
}

export const Institutes = () => {
    const {data: institutes, isLoading, error} = useInstitutes()

    return <ErrorLoadLayout isLoading={isLoading} error={error}>
        <InstitutesContent institutes={institutes!}/>
    </ErrorLoadLayout>
};