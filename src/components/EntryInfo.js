
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { SET_SELECTED_ENTRY } from '../store/actions';

const EntryInfo = ({ header }) => {

    const entry = useSelector(s => s.selected);
    const dispatch = useDispatch();

    if (!entry) {
        return null;
    }

    const {
        firstName: fn,
        lastName: ln,
        description,
        address: a
    } = entry;

    return (
        <div className='card'>
            { header &&
                <div className='card-header'>{ header }</div>
            }
            <div className='card-body'>
                <h5><b>{[ fn, ln ].join(' ')}</b></h5>

                { description && <>
                    <hr />
                    <p>{ description }</p>
                </> }

                { a && <>
                    <hr />
                    <p>Адрес проживания</p>

                    { Object.entries({
                        'Провинция/штат': a.state,
                        'Город': a.city,
                        'Улица': a.streetAddress,
                        'Индекс': a.zip,
                    }).map(([ key, val ]) => (
                        <div key={val} className='row'>
                            <div className='col-5 text-nowrap text-truncate'>{ key }</div>
                            <div className='col text-nowrap text-truncate'>{ val }</div>
                        </div>
                    )) }
                </> }

                <button
                    onClick={() => dispatch({ type: SET_SELECTED_ENTRY, entry: null })}
                    className='float-right btn btn-primary'
                >Закрыть</button>
            </div>
        </div>
    );
};

export default EntryInfo;

