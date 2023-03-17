import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

function OfflineModal({ display }: { display: boolean }) {
  return (
    <Modal
      isOpen={display}
      style={customStyles}
      contentLabel="Network lost"
    >
      <div>You appear to have lost connection!</div>
    </Modal>
  );
}

export default OfflineModal;