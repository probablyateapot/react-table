
import React, { useState, useCallback } from 'react';

const ModalForm = ({ title, schema = [], onClose, onSave, children }) => {
    const refs = {};

    const [ commitEnabled, toggleCommit ] = useState(false);
    const [ validations, setValidations ] = useState(schema.map(() => true));

    const onSaveCb = useCallback(() => {
        const _validations = schema
            .map(({ id, validator }) => {
                if (!refs[id]) { return false; }
                if (!validator) { return true; }

                return validator(refs[id].value);
            });

        if (_validations.some(test => test === false)) {
            setValidations(_validations);
            return;
        }

        const values = schema.reduce((values, { id }) => ({
            ...values,
            [id]: refs[id].value
        }), {});

        onSave && onSave(values);
        onClose && onClose();
        
    }, [ onSave, onClose, refs, schema ]);

    const onChangeCb = useCallback(event => {
        toggleCommit(schema.every(({ id }) => {
            if (!refs[id]) { return false; }

            return refs[id].value !== "";
        }));
    }, [ refs, schema ]);

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
            { schema.map(({ id, label, validator, ...props }, index) => id && (
                <div key={id} className='form-group row'>
                    <label className='offset-1 col-3 col-form-label' htmlFor={id}>{ label }</label>
                    <div className='col-7'>
                        <input
                            ref={el => refs[id] = el}
                            id={id}
                            className='form-control'
                            onChange={onChangeCb}
                            {...props}
                        />
                    </div>
                    <div className='col-1 py-1 pl-0 text-danger'>
                    { !validations[index] &&
                        <span className='fa fa-lg fa-exclamation-circle' />
                    }
                    </div>
                </div>
            )) }
            { children }
            </div>
            <div className="modal-footer">
                { commitEnabled &&
                    <button onClick={onSaveCb} type="button" className="btn btn-primary">Сохранить</button>
                }
                <button onClick={onClose} type="button" className="btn btn-secondary" data-dismiss="modal">Отменить</button>
            </div>
        </div>
    );
};

export default ModalForm;

