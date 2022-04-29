import React, { useContext } from "react";
import { Dialog } from "@headlessui/react";
import { ModalContext } from "../store/modal-context";

// headlessui has already taken care of portals
const Modal = () => {
    const modalContext = useContext(ModalContext);

    return (
        <Dialog
            open={modalContext.show}
            onClose={() => modalContext.hideModal()}
            className="fixed inset-0 z-10 overflow-y-auto"
        >
            <Dialog.Backdrop className="fixed inset-0 bg-black opacity-30" />
            <div className="flex min-h-screen items-center justify-center">
                <Dialog.Panel className="flex flex-col relative mx-auto max-w-sm rounded bg-white p-8">
                    <Dialog.Title
                        as="h3"
                        className="text-xl font-bold leading-6 text-gray-900"
                    >
                        {modalContext.title}
                    </Dialog.Title>
                    <Dialog.Description className="my-4 text-sm text-gray-500">
                        {modalContext.description}
                    </Dialog.Description>

                    <button
                        className="focus:outline-none inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-200 focus:border-red-300 focus:shadow-outline-red active:bg-red-300 transition ease-in-out duration-150 self-end"
                        onClick={() => modalContext.hideModal()}
                    >
                        {modalContext.buttonText}
                    </button>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default Modal;
