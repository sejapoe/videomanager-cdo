import React from "react";
import {Dialog} from "@headlessui/react";

type DialogWrapperProps = {
    isOpen: boolean;
    setOpen: (value: boolean) => void;
    children: React.ReactNode;
    title: string;
}

export const DialogWrapper = ({isOpen, setOpen, children, title}: DialogWrapperProps) => {
    return <Dialog
        open={isOpen}
        onClose={() => setOpen(false)}
        className="relative z-50"
    >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>
        <div className="fixed inset-0 flex w-screen h-screen items-center justify-center p-4">

            <Dialog.Panel className="mx-auto min-w-fit max-w-sm rounded bg-white p-4">
                <Dialog.Title className="text-gray-500 text-xl font-bold mb-4">{title}</Dialog.Title>
                {children}
            </Dialog.Panel>

        </div>

    </Dialog>
}