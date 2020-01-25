
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import cn from 'classnames';

import { SET_DATA } from '../store/actions';

import Table from './Table';
import PaginationWrapper from './Pagination';
import FuzzySearch from './FuzzySearch';
import EntryInfo from './EntryInfo';
import LoadingBox from './LoadingBox';
import ModalForm from './ModalForm';

import {
    smDatasetUrl,
    lgDatasetUrl,
    fuseOptions
} from '../config';

const newEntitySchema = [
    {
        id: 'id', label: 'ID',
        validator: null,
        readOnly: true,
        type: 'text',
        value: ((Math.random() * 1000) >> 0).toString(),
        className: 'form-control-plaintext'
    },
    {
        id: 'firstName', label: 'Имя',
        validator: value => /^[A-Z][a-z]+$/.test(value),
        type: 'text',
        placeholder: 'John'
    },
    {
        id: 'lastName', label: 'Фамилия',
        validator: value => /^[A-Z][a-z]+$/.test(value),
        type: 'text',
        placeholder: 'Doe'
    },
    {
        id: 'email', label: 'E-mail',
        validator: value => /^[a-z-_0-9]+@[a-z]+\.[a-z]+$/.test(value),
        type: 'text',
        placeholder: 'johndoe@nonexistent.domain'
    },
    {
        id: 'phone', label: 'Телефон',
        validator: value => /^\(\d\d\d\)\d\d\d-\d\d\d\d$/.test(value),
        type: 'text',
        placeholder: '(xxx)xxx-xxxx'
    },
];

const DatasetTabs = ({ onClick, className, active }) => (
    <ul className={cn('nav nav-pills flex-column justify-content-left', className)}> { [
        { title: "Малая выборка", url: smDatasetUrl },
        { title: "Большая выборка", url: lgDatasetUrl }
    ].map(({ title, url }) => (
        <li key={url} className='nav-item' onClick={e => onClick(url)}>
            <a href="#" className={cn('nav-link', active === url && 'active')}>{ title }</a>
        </li>
    )) }
    </ul>
);

const FuzzyToolbar = ({ onShowModal }) => {
    const cachedData = useSelector(s => s.data);
	const dispatch = useDispatch();

    return (
        <button
            onClick={() => onShowModal(({ onClose }) => (
                <ModalForm
                    title='Добавить новую запись'
                    schema={newEntitySchema}
                    onClose={onClose}
                    onSave={entry => dispatch({
                        type: SET_DATA,
                        data: [ entry ].concat(cachedData)
                    })}
                />
            ))}
            className='btn btn-link'
        ><span className="mr-2 fa fa-plus"/>Добавить</button>
    );
};

const EmptyPlace = ({ icon, text }) => (
    <div className='py-2 border rounded text-center'>
        <span
            style={{ fontSize: '4em' }}
            className={cn('text-secondary my-3', icon)}
        />
        <br />
        <p className='lead'>{ text }</p>
    </div>
);

const Page = ({
    onShowModal,
    onCloseModal
}) => {

	const [ sortDirection, setSortDirection ] = useState(null);
	const [ sortField, setSortField ] = useState(null);
    const [ dataUrl, setDataUrl ] = useState(null);
    const [ loading, setLoadingState ] = useState(false);

    const cachedData = useSelector(s => s.data);
	const dispatch = useDispatch();

    const sortCb = useCallback((a, b) => {
        const _a = a[sortField];
        const _b = b[sortField];

        return sortDirection
            ? (typeof _a === 'number'? _b - _a : _b < _a)
            : (typeof _a === 'number'? _a - _b : _a < _b);
        
    }, [ sortField, sortDirection ]);

    const createSortHandler = useCallback(field => event => {
        if (sortField === field) {
            if (sortDirection) {
                setSortField(null);
                setSortDirection(null); 
            } else {
                setSortDirection(true);
            }
        } else {
            setSortField(field);
            setSortDirection(false); 
        }
    }, [ sortField, sortDirection ]);

    const controls = useMemo(() => [
        "id",
        "firstName",
        "lastName",
        "email",
        "phone"
    ].map(field => ({
        onClick: createSortHandler(field),
        state: field === sortField ? sortDirection : null,
        field
    })), [ sortField, sortDirection, createSortHandler ]);

    const onFuzzySearch = useCallback((data, isPristine, text) => {
        const _data = !isPristine
            ? data
            : (sortField && (typeof sortDirection === 'boolean')
                ? data.sort(sortCb) : data );

        return (
            <PaginationWrapper className="my-4" data={_data}>
            { frame =>
                <Table
                    className='my-3'
                    controls={controls}
                    data={frame}
                    enableControls={isPristine}
                >
                    <EmptyPlace
                        icon='fa fa-frown'
                        text={`По запросу "${text}" ничего не найдено`}
                    />
                </Table>
            }
            </PaginationWrapper>
        );
        
    }, [ sortCb, sortField, sortDirection, controls ]);

	useEffect(() => {
        if (!dataUrl) {
            return;
        }

        setLoadingState(true);

		fetch(dataUrl)
            .then(res => res.json())
			.then(data => {
				dispatch({ type: SET_DATA, data });

                setLoadingState(false);
            });
	}, [ dataUrl, dispatch ]);

	return (
        <div className='container h-100'>
        { loading
            ? 
                <div style={{ minHeight: '100vh' }}
                    className='d-flex flex-column justify-content-center align-items-center'
                >
                    <LoadingBox />
                </div>
            :
            <div className='row pt-5'>
                <div className='col-8'>
                { cachedData.length > 0
                    ?
                    React.createElement(FuzzySearch, {
                        data: cachedData.slice(0),
                        opts: fuseOptions,
                        toolbar: () => <FuzzyToolbar onShowModal={onShowModal} />,
                    }, onFuzzySearch)
                    :
                    <EmptyPlace
                        icon='fa fa-database'
                        text='Выберите набор данных'
                    />
                }
                </div>
                <div className='col'>
                    <DatasetTabs
                        className='mb-3'
                        active={dataUrl}
                        onClick={setDataUrl}
                    />
                    <EntryInfo />
                </div>
            </div>
        }
        </div>
	);
};

export default Page;

