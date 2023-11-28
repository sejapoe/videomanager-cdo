import React, {useState} from "react";
import {DialogWrapper} from "../ui/dialog/DialogWrapper.tsx";

type UseDialogReturn<TArgs, TOk> = {
    Dialog: (props: DialogProps<TArgs, TOk>) => React.ReactNode;
    open: (args: TArgs, ok?: (data: TOk) => void) => void;
}

type DialogChildrenProps<TArgs, TOk> = {
    args: TArgs;
    ok: (data: TOk) => void;
}

type DialogChildrenPropsPassThrough<TArgs, TOk> = DialogChildrenProps<TArgs, TOk> & {
    close: () => void;
}

type DialogProps<TArgs, TOk> = {
    children: (props: DialogChildrenPropsPassThrough<TArgs, TOk>) => React.ReactNode;
}

type UseDialogProps = {
    title: string;
}

export const useDialog = <TArgs, TOk>({title}: UseDialogProps): UseDialogReturn<TArgs, TOk> => {
    const [open, setOpen] = useState(false)
    const [props, setProps] = useState({
        args: undefined,
        ok: (_) => {
        },
    } as DialogChildrenProps<TArgs, TOk>)

    return {
        Dialog: (({children}) => (<DialogWrapper isOpen={open} setOpen={setOpen} title={title}>
            {props.args && children({
                close: () => setOpen(false),
                ...props
            })}
        </DialogWrapper>)),
        open: (args: TArgs, ok?: (data: TOk) => void) => {
            setProps({
                args,
                ok: ok || (() => {
                })
            })
            setOpen(true);
        }
    }
}

