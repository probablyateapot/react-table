
import { combineReducers } from 'redux';

import {
    SET_SELECTED_ENTRY,
    SET_DATA
} from './actions';

const selected = (state = null, { type, entry = null }) => {
	switch (type) {
        case SET_SELECTED_ENTRY:
            return entry;
		case SET_DATA:
			return null;
		default:
			return state;
	}
};

const data = (state = [], { type, data }) => {
	switch (type) {
		case SET_DATA:
			return data;
		default:
			return state;
	}
};

export default combineReducers({ data, selected });
