import ReactModal from 'react-modal';
import { customStyles } from '../app/styles/style';

ReactModal.setAppElement('body');

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      style={customStyles}
      shouldCloseOnEsc={true}
     
    >
      {children}
    </ReactModal>
  );
};

export default Modal;