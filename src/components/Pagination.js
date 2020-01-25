
import React, { useState, useMemo, useCallback } from 'react';
import cn from 'classnames';

const PaginationEllipses = () => <li className='mx-3 page-item'><span className='pagination-ellipsis'>&hellip;</span></li>;

const PaginationLink = ({ disabled, to, active, onClick, children }) => (
	<li className={cn('page-item', disabled && 'disabled', !disabled && active && 'active')}>
		<a onClick={e => {
				e.preventDefault();
				onClick(to);
			}}
			className='page-link'
            href='#'
			aria-label={`Goto page ${to}`}>{ children || to}</a>
	</li>
);

export const Pagination = ({
	entriesTotal,
	entriesPerPage = 10,
	current,
    onClick,
    className,
    children
}) => {
    const pagesTotal = useMemo(() => ((entriesTotal + entriesPerPage - 1) / entriesPerPage) >> 0, [
        entriesTotal, entriesPerPage
    ]);

    return (
        <nav className={className} role='navigation' aria-label='pagination'>
            <div className='form-inline'>
                { children }
                <div className='form-group ml-auto'>
                { pagesTotal > 1 &&
                    <ul className='mb-0 pagination pagination-sm justify-content-end'>
                        <PaginationLink disabled={current <= 1} to={current - 1} onClick={onClick}>
                            <span aria-hidden="true">&laquo;</span>
                        </PaginationLink>
                        { current >= 3 && <PaginationLink to={1} onClick={onClick} /> }
                        { current > 3 && <PaginationEllipses /> }
                        { current > 1 && <PaginationLink to={current - 1} onClick={onClick} /> }
                        <PaginationLink to={current} active onClick={onClick} />
                        { current < pagesTotal && <PaginationLink to={current + 1} onClick={onClick} /> }
                        { current < pagesTotal - 2 && <PaginationEllipses /> }
                        { current <= pagesTotal - 2 && <PaginationLink to={pagesTotal} onClick={onClick} /> }
                        <PaginationLink disabled={current >= pagesTotal} to={current + 1} onClick={onClick}>
                            <span aria-hidden="true">&raquo;</span>
                        </PaginationLink>
                    </ul>
                }
                </div>
            </div>
        </nav>
    );
};

const Selector = ({ title = 'Показывать по:', active, presets = [], className, ...props }) => (
    <div className={cn('input-group input-group-sm', className)} {...props}>
        <div className='input-group-prepend'>
            <span className='input-group-text'>{ title }</span>
        </div>
        <select className='btn custom-select' defaultValue={active || presets[0]}>
            { presets.map(value => <option key={value} value={value}>{ value }</option>) }
        </select>
    </div>
);

const PaginationWrapper = ({
    data = [],
    presets = [ 10, 25, 50 ],
    showTotal = true,
    header = true,
    footer = true,
    children,
    ...rest
}) => {
    const [ entriesPerPage, setEntriesPerPage ] = useState(presets[presets.length >> 1]);
    const [ page, setPage ] = useState(1);

    const Paginations = useCallback(() => (
        <Pagination
            entriesPerPage={entriesPerPage}
            className='my-3'
            onClick={setPage}
            entriesTotal={data.length}
            current={page}
        >
            <Selector
                onChange={e => {
                    const newValue = parseInt(e.target.value);
                    const oldValue = entriesPerPage;

                    setEntriesPerPage(newValue);
                    setPage(((page - 1) * oldValue / newValue + 1) << 0);
                }}
                presets={presets}
                active={entriesPerPage}
                className='justify-content-left'
            />
        </Pagination>
    ), [ entriesPerPage, page, data, presets ]);

    if (!Array.isArray(data) || data.length === 0) {
        return children(data);
    }

    const frame = data.slice((page - 1) * entriesPerPage, page * entriesPerPage);

    return (
        <div {...rest}>
        { header &&
            <>
                { showTotal && <div className='text-right'>Всего { data.length } записей</div> }
                <Paginations />
            </>
        }
        { children(frame) }
        { footer &&
            <>
                <Paginations />
                { showTotal && <div className='text-right'>Всего { data.length } записей</div> }
            </>
        }
        </div>
    );
};

export default PaginationWrapper;

