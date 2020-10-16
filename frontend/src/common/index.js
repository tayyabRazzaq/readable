import { apiGet, apiPost, apiPut, apiDelete } from './serverCalls';

export const API = {
    get: apiGet,
    post: apiPost,
    put: apiPut,
    delete: apiDelete,
};

export * from './actionTypes';
export * from './constants';