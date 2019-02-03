import axios from 'axios';
import {apiUrl} from './constants';


const getRequestHeaders = () => {
    let token = localStorage.getItem('token');
    if (!token){
        token = Math.random().toString(36).substr(-8);
        localStorage.setItem('token', token);
    }
    return {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': token
    };
};

export const configObj = {
    headers: getRequestHeaders()
};

const getServerUrl = requestUrl => `${apiUrl}/${requestUrl}`;

export const apiGet = requestUrl => {
    return axios.get(getServerUrl(requestUrl), configObj);
};

export const apiPost = (requestUrl, postData) => {
    return axios.post(getServerUrl(requestUrl), postData, configObj);
};

export const apiPut = (requestUrl, postData) => {
    return axios.put(getServerUrl(requestUrl), postData, configObj);
};

export const apiDelete = requestUrl => {
    return axios.delete(getServerUrl(requestUrl), configObj);
};
