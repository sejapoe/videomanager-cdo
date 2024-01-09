import {Department} from "../model";
import {CroppedText} from "../../../../ui/text/CroppedText.tsx";


const sizeToChars = {
    "sm": 10,
    "md": 20,
    "lg": 40,
    "xl": 80
}

type DepartmentProps = {
    size: "sm" | "md" | "lg" | "xl";
    departmentName: Department;
};

export const DepartmentName = ({size, departmentName}: DepartmentProps) => {
    return (
        departmentName.shortName ? <span title={departmentName.name}>{departmentName.shortName}</span>
            : <CroppedText chars={sizeToChars[size]}>{departmentName.name}</CroppedText>
    );
};