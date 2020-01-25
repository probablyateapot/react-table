
import React, { useState, useRef, useMemo } from 'react';
import Fuse from 'fuse.js';

const FuzzySearch = ({ data = [], opts = {}, toolbar: Toolbar, children }) => {
    const fuse = useMemo(() => new Fuse(data, opts), [ data, opts ]);

    const inputRef = useRef();
    const [ text, setText ] = useState('');

    if (!Array.isArray(data) || data.length < 1) {
        return children? children(data, true, text) : null;
    }

    return (<>
        <div className='form-inline mb-3'>
            { Toolbar && <Toolbar /> }
            <div className='form-group ml-auto'>
                <div className='input-group'>
                    <input className='form-control' placeholder='Отфильтровать...' type='text' ref={inputRef} />
                    <div className='input-group-append'>
                        <button className='btn btn-primary' onClick={() => setText(inputRef.current.value)}>
                            <span className='fa fa-filter' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        { children(text.length > 1? fuse.search(text) : data, text.length <= 1, text) }
    </>);
};

export default FuzzySearch;

