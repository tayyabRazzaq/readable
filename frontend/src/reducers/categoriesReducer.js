import {Map} from 'immutable';
import {
    GET_ALL_CATEGORIES_SUCCESSFULLY,
    GET_ALL_CATEGORIES_FAILED,
} from '../common/actionTypes';

const initialState = new Map({
    categories: [],
    category: {},
    error: null,
    statusSuccess: false,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES_SUCCESSFULLY:
            return state.merge({
                categories: action.response.data.categories,
                error: null,
                statusSuccess: true
            });
        case GET_ALL_CATEGORIES_FAILED:
            return state.merge({
                categories: [],
                error: action.response.error,
                statusSuccess: false
            });
        default:
            return state;
    }
};