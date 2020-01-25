
import React from 'react';

const Modal = ({ children, onClose }) => (
    <div className='modal-open'>
        <div style={{ background: "rgba(50, 50, 50, .7)" }} className='modal d-block show' tabIndex={-1} role='dialog' onClick={onClose}>
            <div className='modal-dialog modal-dialog-centered' role='document'>
                { children }
            </div>
        </div>
    </div>
);

export default Modal;

