import {useInstitutes} from "../../../common/institutes/api";
import {ErrorLoadLayout} from "../../../../ui/layout/ErrorLoadLayout.tsx";
import {Institute, InstituteWithDepartments} from "../../../common/institutes/model";
import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {useDialog} from "../../../../hooks/useDialog.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {NewInstituteForm} from "./NewInstituteForm.tsx";
import {NewDepartmentForm} from "./NewDepartmentForm.tsx";
import {UploadFileForm} from "./UploadFileForm.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {DeleteInstituteDialog} from "./DeleteInstituteDialog.tsx";

type SingleInstituteProps = {
    institute: InstituteWithDepartments
    onClickNew: () => void
}


const SingleInstitute = ({institute, onClickNew}: SingleInstituteProps) => {
    const {Dialog, open} = useDialog<{ institute: Institute }, void>({title: "Удаление института"})

    return <div
        className="shadow bg-gray-200 border border-gray-300 flex flex-col items-center p-2 rounded-xl justify-between">
        <Dialog>
            {({ok, close}) =>
                <DeleteInstituteDialog onSubmit={ok} close={close} institute={institute}/>
            }
        </Dialog>

        <div className="w-full text-center">
            <div className="w-full border-b-2 border-b-gray-600 pb-1 mb-1 relative">
                <h1 className="text-3xl text-gray-900">{institute.name}</h1>
                <div className="absolute top-0 right-0 space-x-2">
                    <FontAwesomeIcon icon={solid("pen")}
                                     className="text-gray-400 transition-colors hover:text-blue-600 cursor-pointer"/>
                    <FontAwesomeIcon icon={solid("trash")}
                                     className="text-gray-400 transition-colors hover:text-red-600 cursor-pointer"
                                     onClick={() => open({institute})}
                    />
                </div>
            </div>

            {institute.departments.map(department => (
                <p className="text-gray-900" key={`department-${department.id}`}>{department.name}</p>
            ))}
        </div>

        <Button
            className="mt-2"
            size="sm"
            variant="inverse"
            startIcon={solid("plus")}
            onClick={onClickNew}
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
        Dialog: CreateDepartmentDialog,
        open: openCreateDepartment
    } = useDialog<number, void>({title: "Создание института"})

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
        <CreateDepartmentDialog>
            {({ok, close, args: id}) =>
                <NewDepartmentForm instituteId={id} onSubmit={ok} close={close}/>
            }
        </CreateDepartmentDialog>

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
                    <SingleInstitute key={`institute-${institute.id}`} institute={institute} onClickNew={() => {
                        openCreateDepartment(institute.id)
                    }}/>
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