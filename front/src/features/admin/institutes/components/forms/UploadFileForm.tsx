import {Form} from "../../../../../ui/form/Form.tsx";
import {z} from "zod";
import {FileField} from "../../../../../ui/form/FileField.tsx";
import {useEffect, useState} from "react";
import {InstitutesConfiguration, parseFile} from "../../utils/configurationParser.ts";
import {Button} from "../../../../../ui/button/Button.tsx";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useCreateInstitutes} from "../../api";
import {useQueryClient} from "@tanstack/react-query";
import {institutesKeys} from "../../../../common/institutes/api";
import {FieldWrapper} from "../../../../../ui/form/FieldWrapper.tsx";

type PreviewProps = {
    file: File
}

const Preview = ({file}: PreviewProps) => {
    const [data, setData] = useState<InstitutesConfiguration | null>(null)


    useEffect(() => {
        parseFile(file).then(setData)
    }, [file]);

    return <ul className="text-gray-900">
        {data?.institutes.map(institute =>
            <li key={institute.name} className="ml-2">
                {institute.name}:
                <p className="ml-2">{institute.departments.join(", ")}</p>
            </li>
        )}
    </ul>
}

const schema = z.object({
    file: z.instanceof(File),
})

type UploadFileValues = {
    file: File;
}

type UploadFileFormProps = {
    onSubmit: (data: void) => void;
    close: () => void
};

export const UploadFileForm = ({onSubmit, close}: UploadFileFormProps) => {
    const queryClient = useQueryClient();
    const {mutate, isLoading} = useCreateInstitutes()

    return <Form<UploadFileValues, typeof schema>
        onSubmit={({file}, onError) => {
            if (!file) return;
            parseFile(file).then(data => {
                mutate(data, {
                    onSuccess: async () => {
                        await queryClient.invalidateQueries(institutesKeys.institutes.root)
                        onSubmit()
                        close()
                    },
                    onError: (err) => onError(err.error.detail)
                })
            })
        }}
        schema={schema}
    >
        {({
              formState, watch, control
          }) => <>
            <FileField
                name={"file"}
                control={control}
                label="Выберите файл (.json, .xml)"
                error={formState.errors["file"]}
                accept="text/xml,application/xml,application/json"
            />

            {watch("file") && <Preview file={watch("file")!}/>}

            <FieldWrapper error={formState.errors["root"]}>
                <Button
                    startIcon={solid("check")}
                    className="w-full"
                    type="submit"
                    disabled={!watch("file")}
                    isLoading={isLoading}
                >
                    Подтвердить
                </Button>
            </FieldWrapper>
        </>
        }
    </Form>
}