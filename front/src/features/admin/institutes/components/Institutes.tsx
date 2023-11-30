import {useInstitutes} from "../../../common/institutes/api";
import {ErrorLoadLayout} from "../../../../ui/layout/ErrorLoadLayout.tsx";
import {Department, InstituteWithDepartments} from "../../../common/institutes/model";
import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {NewDepartmentForm} from "./forms/NewDepartmentForm.tsx";
import {UploadFileForm} from "./forms/UploadFileForm.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {DeleteInstituteForm} from "./forms/DeleteInstituteForm.tsx";
import {DeleteDepartmentForm} from "./forms/DeleteDepartmentForm.tsx";
import {RenameDepartmentForm} from "./forms/RenameDepartmentForm.tsx";
import {RenameInstituteForm} from "./forms/RenameInstituteForm.tsx";
import {useDialog} from "../../../../providers/DialogProvider.tsx";
import {NewInstituteForm} from "./forms/NewInstituteForm.tsx";
import clsx from "clsx";

type SingleDepartmentProps = {
    department: Department
}

const SingleDepartment = ({department}: SingleDepartmentProps) => {
    const openRenameDepartment = useDialog({
        title: `Изменение кафедры ${department.name}`,
        children: (close) => <RenameDepartmentForm department={department} onSubmit={close}/>
    })

    const openDeleteDepartment = useDialog({
        title: `Удаление кафедры ${department.name}`,
        children: (close) => <DeleteDepartmentForm department={department} onSubmit={close}/>
    })

    return <div className="relative w-full text-gray-900 group hover:bg-gray-300 rounded py-1 transition-colors">
        {department.name}
        <div className="absolute top-1 right-2 space-x-2 hidden group-hover:block">
            <FontAwesomeIcon icon={solid("pen")}
                             className="text-gray-400 transition-colors hover:text-blue-600 cursor-pointer"
                             onClick={() => openRenameDepartment({})}
            />
            <FontAwesomeIcon icon={solid("trash")}
                             className="text-gray-400 transition-colors hover:text-red-600 cursor-pointer"
                             onClick={() => openDeleteDepartment({})}
            />
        </div>
    </div>
}

type SingleInstituteProps = {
    institute: InstituteWithDepartments
}

const SingleInstitute = ({institute}: SingleInstituteProps) => {
    const openCreateDepartment = useDialog({
        title: "Создание кафедры",
        children: (close) => <NewDepartmentForm instituteId={institute.id} onSubmit={close}/>
    })

    const openRenameInstitute = useDialog({
        title: `Изменение института ${institute.name}`,
        children: (close) => <RenameInstituteForm institute={institute} onSubmit={close}/>
    })


    const openDeleteInstitute = useDialog({
        title: "Удаление института",
        children: (close) => <DeleteInstituteForm onSubmit={close} institute={institute}/>
    })

    return <div
        className={clsx(
            "shadow bg-gray-200 border border-gray-300 flex flex-col items-center p-2 rounded-xl justify-between",
            "mx-12 min-[400px]:mx-0"
        )}>
        <div className="w-full text-center">
            <div className="w-full border-b-2 border-b-gray-600 pb-1 mb-1 relative">
                <h1 className="text-lg md:text-2xl text-gray-900">{institute.name}</h1>
                <div className="absolute top-0 right-0 space-x-2">
                    <FontAwesomeIcon icon={solid("pen")}
                                     className="text-gray-400 transition-colors hover:text-blue-600 cursor-pointer"
                                     onClick={() => openRenameInstitute()}
                    />
                    <FontAwesomeIcon icon={solid("trash")}
                                     className="text-gray-400 transition-colors hover:text-red-600 cursor-pointer"
                                     onClick={() => openDeleteInstitute()}
                    />
                </div>
            </div>

            {institute.departments.map(department => (
                <SingleDepartment key={`department-${department.id}`} department={department}/>
            ))}
        </div>

        <Button
            className="mt-2"
            size="sm"
            variant="inverse"
            startIcon={solid("plus")}
            onClick={() => openCreateDepartment()}
        >
            Создать
        </Button>
    </div>
}

type InstitutesContentProps = {
    institutes: InstituteWithDepartments[]
}


const InstitutesContent = ({institutes}: InstitutesContentProps) => {
    const openCreateInstitute = useDialog({
        title: "Создание института",
        children: (close) => <NewInstituteForm onSubmit={close}/>
    })

    const openUploadFile = useDialog({
        title: "Загрузка конфигурации институтов",
        children: (close) => <UploadFileForm onSubmit={close}/>
    })

    return <>
        <ContentLayout title="Институты" titleElement={<div className="flex justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">{"Институты"}</h1>
            <div className="flex space-x-4">
                <Button
                    startIcon={solid("upload")}
                    onClick={() => openUploadFile()}
                    className={"pr-2.5 md:px-6"}
                >
                    <span className="hidden md:block">Загрузить файл</span>
                </Button>
                <Button
                    startIcon={solid("plus")}
                    onClick={() => openCreateInstitute()}
                    className={"pr-2.5 md:px-6"}
                >
                    <span className="hidden md:block">Создать</span>
                </Button>
            </div>
        </div>}>
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
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