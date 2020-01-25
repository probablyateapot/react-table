
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { SET_SELECTED_ENTRY } from '../store/actions';

const arrowIcons = {
    [false]: "fa-angle-up",
    [true]: "fa-angle-down"
};

const Table = ({
    controls = [],
    data = [],
    className,
    header = true,
    footer = true,
    enableControls = true,
    children
}) => {

    const selected = useSelector(s => s.selected);
    const dispatch = useDispatch();

    if (!Array.isArray(data) || data.length < 1) {
        return children || null;
    }

    return (
        <table className={cn('table table-sm', className)}>
            { header &&
                <thead className='text-white bg-secondary'>
                    <tr>
                        { controls.map(({ field, state, onClick }) =>
                            <th
                                key={"head-" + field}
                                style={{ cursor: "pointer" }}
                                className={cn(state !== null && 'bg-info')}
                                onClick={enableControls? onClick : undefined}
                            >
                                { field }
                                { state !== null && <span className={cn('float-right py-1 fa', arrowIcons[state])} /> }
                            </th>
                        ) }
                    </tr>
                </thead>
            }
            <tbody>
                { data.map((entry, index) => {
                    const active = selected === entry;

                    return (
                        <tr key={[ entry.id, index ].join('-')}
                            className={cn(active && 'bg-info text-light')}
                            onClick={() => !active && dispatch({ type: SET_SELECTED_ENTRY, entry })}
                        >
                            { controls.map(({ field, state }) =>
                                React.createElement('td', {
                                    key: [ entry.id, field ].join('-'),
                                    className: cn(state !== null && (active? 'bg-primary' : 'bg-light'))
                                }, entry[field])
                            ) }
                        </tr>
                    );
                } )}
            </tbody>
            { footer &&
                <tfoot className='text-white bg-secondary'>
                    <tr>
                        { controls.map(({ field, state, onClick }) =>
                            <th
                                key={"tail-" + field}
                                className={cn(state !== null && 'bg-info')}
                                onClick={enableControls? onClick : undefined}
                            >
                                { field }
                                { state !== null && <span className={cn('float-right py-1 fa', arrowIcons[state])} /> }
                            </th>
                        ) }
                    </tr>
                </tfoot>
            }
        </table>
    );
};

export default Table;

