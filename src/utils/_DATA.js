import axios from 'axios';
import {apiUrl} from '../common/constants';
import {getRequestHeaders} from '../common/utils';

export const getCategories = () => {
    const requestUrl = `${apiUrl}/categories`;
    return axios.get(requestUrl, {headers: getRequestHeaders()});
};