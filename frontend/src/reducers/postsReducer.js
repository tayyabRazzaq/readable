import {Map} from 'immutable';
import {
    GET_CATEGORY_POSTS_SUCCESSFULLY,
    GET_CATEGORY_POSTS_FAILED,
    GET_ALL_POSTS_SUCCESSFULLY,
    GET_ALL_POSTS_FAILED,
    SAVE_POST_SUCCESSFULLY,
    SAVE_POST_FAILED,
    GET_POST_SUCCESSFULLY,
    GET_POST_FAILED,
    VOTE_POST_SUCCESSFULLY,
    VOTE_POST_FAILED,
    UPDATE_POST_SUCCESSFULLY,
    UPDATE_POST_FAILED,
    DELETE_POST_SUCCESSFULLY,
    DELETE_POST_FAILED
} from '../common/actionTypes';

const initialState = new Map({
    posts: [],
    post: {},
    error: null,
    statusSuccess: false,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY_POSTS_SUCCESSFULLY:
        case GET_ALL_POSTS_SUCCESSFULLY:
            return state.merge({
                posts: action.response.data,
                error: null,
                statusSuccess: true,
            });
        case GET_CATEGORY_POSTS_FAILED:
        case GET_ALL_POSTS_FAILED:
            return state.merge({
                posts: [],
                error: action.response.error,
                statusSuccess: false,
            });
        case SAVE_POST_SUCCESSFULLY:
            return state.merge({
                post: action.response.data,
                posts: [...state.get('posts'), action.response.data],
                error: null,
                statusSuccess: true,
            });
        case SAVE_POST_FAILED:
            return state.merge({
                post: {},
                error: action.response.error,
                statusSuccess: false,
            });
        case GET_POST_SUCCESSFULLY:
            return state.merge({
                post: action.response.data,
                error: null,
                statusSuccess: true,
            });
        case GET_POST_FAILED:
            return state.merge({
                post: {},
                error: action.response.error,
                statusSuccess: false,
            });
        case VOTE_POST_SUCCESSFULLY:
            return state.merge({
                post: action.response.data,
                error: null,
                statusSuccess: true,
            });
        case VOTE_POST_FAILED:
            return state.merge({
                post: [],
                error: action.response.error,
                statusSuccess: false,
            });
        case UPDATE_POST_SUCCESSFULLY:
            return state.merge({
                post: action.response.data,
                error: null,
                statusSuccess: true,
            });
        case UPDATE_POST_FAILED:
            return state.merge({
                post: [],
                error: action.response.error,
                statusSuccess: false,
            });
        case DELETE_POST_SUCCESSFULLY:
            return state.merge({
                post: action.response.data,
                error: null,
                statusSuccess: true,
            });
        case DELETE_POST_FAILED:
            return state.merge({
                post: [],
                error: action.response.error,
                statusSuccess: false,
            });
        default:
            return state;
    }
};