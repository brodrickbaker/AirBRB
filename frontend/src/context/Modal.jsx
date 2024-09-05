import { useRef, createContext, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'
    
const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [modalContent, setModalContent] = useState(null);
    const [onModalClose, setOnModalClose] = useState(null)

    const modalRef = useRef();

    const closeModal = () => {
        setModalContent(null); // clear the modal contents
        // If callback function is truthy, call the callback function and reset it
        // to null:
        if (typeof onModalClose === "function") {
          setOnModalClose(null);
          onModalClose();
        }
      };

    const contextValue = {
        modalRef, 
        modalContent,
        setModalContent,
        setOnModalClose,
        closeModal
    };

    return (
        <>
            <ModalContext.Provider value={contextValue}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function Modal() {
    const { modalRef, modalContent, closeModal } = useContext(ModalContext);
    // If there is no div referenced by the modalRef or modalContent is not a
    // truthy value, render nothing:
    if (!modalRef || !modalRef.current || !modalContent) return null;
  
    // Render the following component to the div referenced by the modalRef
    return ReactDOM.createPortal(
      <div id="modal">
        <div id="modal-background" onClick={closeModal} />
        <div id="modal-content">{modalContent}</div>
      </div>,
      modalRef.current
    );
  }

  // custom hook for consuming modal context
  export const useModal = () => useContext(ModalContext);