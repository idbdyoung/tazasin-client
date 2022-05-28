import React, { useState, useContext, createContext } from 'react';

type Modal = {
  isOpen: boolean;
  component: React.ReactNode;
  open: (component: React.ReactNode) => void;
  close: (...any: any) => void;
};

const initialState: Modal = {
  isOpen: false,
  component: null,
  open: () => {},
  close: () => {},
};
const ModalContext = createContext<Modal>(initialState);

const useProvideModal = (): Modal => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [component, setComponent] = useState<React.ReactNode>();

  const open = (component: React.ReactNode) => {
    setOpen(true);
    setComponent(component);
  };
  const close = () => setOpen(false);

  return {
    isOpen,
    component,
    open,
    close,
  };
};

export const ModalProvider: React.FC = ({ children }) => {
  const modal = useProvideModal();

  return (
    <ModalContext.Provider value={modal}>
      {modal.isOpen && (
        <div className="absolute flex justify-center items-center w-full h-full bg-black bg-opacity-60 z-[999]">
          {modal.component}
        </div>
      )}
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
