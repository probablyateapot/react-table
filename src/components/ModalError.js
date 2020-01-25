
import React from 'react';

const ModalError = ({ title, children, onClose }) => {
    return (
        <div className="modal-content">
            { title &&
                <div className="modal-header">
                    <h5 className="modal-title">{ title }</h5>
                    <button onClick={onClose} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            }
            <div className="modal-body">
            { process.env.NODE_ENV === 'production'
                ? <>
                    <span
                        style={{ fontSize: '4em' }}
                        className='float-left mr-3 text-secondary fa fa-sad-tear'
                    />
                    <p className='float-left'>Что-то пошло не так :(</p>
                </>
                : children
            }
            </div>
            <div className="modal-footer">
                <button onClick={onClose} type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
            </div>
        </div>
    );
};

export default ModalError;

