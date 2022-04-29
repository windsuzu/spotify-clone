import React from "react";

const defaultModalState = {
    show: false,
    title: "",
    description: "",
    buttonText: "",
};

export const ModalContext = React.createContext({
    show: false,
    title: "",
    description: "",
    buttonText: "",
    showModal: (title: string, description: string, buttonText: string) => {},
    hideModal: () => {},
});

const ModalProvider = ({ children }: { children: JSX.Element }) => {
    const [modal, setModal] = React.useState(defaultModalState);

    const showModal = (
        title: string,
        description: string,
        buttonText: string
    ) => {
        setModal({
            show: true,
            title,
            description,
            buttonText,
        });
    };

    const hideModal = () => {
        setModal({
            show: false,
            title: "",
            description: "",
            buttonText: "",
        });
    };

    const initCtx = {
        show: modal.show,
        title: modal.title,
        description: modal.description,
        buttonText: modal.buttonText,
        showModal,
        hideModal,
    };

    return (
        <ModalContext.Provider value={initCtx}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;
