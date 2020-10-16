import { GET_ALL_CATEGORIES_SUCCESSFULLY, GET_ALL_CATEGORIES_FAILED } from '../common';
import { getCategoriesHelper, performServerCall } from '../utils';

export default () => dispatch => dispatch(
    performServerCall(getCategoriesHelper, {}, GET_ALL_CATEGORIES_SUCCESSFULLY, GET_ALL_CATEGORIES_FAILED),
);