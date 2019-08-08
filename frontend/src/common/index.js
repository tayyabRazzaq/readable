import { apiGet, apiPost, apiPut, apiDelete } from './serverCalls';

export * from './constants';

export const API = {
    get: apiGet,
    post: apiPost,
    put: apiPut,
    delete: apiDelete,
};