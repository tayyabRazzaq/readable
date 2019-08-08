import { GET_ALL_CATEGORIES_SUCCESSFULLY, GET_ALL_CATEGORIES_FAILED } from '../common/actionTypes';
import { getCategoriesHelper } from '../utils/_DATA';
import performServerCall from '../utils/actionHandler';


export default () => dispatch => dispatch(
    performServerCall(getCategoriesHelper, {}, GET_ALL_CATEGORIES_SUCCESSFULLY, GET_ALL_CATEGORIES_FAILED),
);