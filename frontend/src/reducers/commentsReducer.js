import { Map } from 'immutable';
import {
    GET_POST_COMMENTS_SUCCESSFULLY,
    GET_POST_COMMENTS_FAILED,
    SAVE_COMMENT_SUCCESSFULLY,
    SAVE_COMMENT_FAILED,
    GET_COMMENT_SUCCESSFULLY,
    GET_COMMENT_FAILED,
    VOTE_COMMENT_SUCCESSFULLY,
    VOTE_COMMENT_FAILED,
    UPDATE_COMMENT_SUCCESSFULLY,
    UPDATE_COMMENT_FAILED,
    DELETE_COMMENT_SUCCESSFULLY,
    DELETE_COMMENT_FAILED
} from '../common';

const initialState = new Map({
    comments: [],
    error: null,
    statusSuccess: false,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_POST_COMMENTS_SUCCESSFULLY:
            return state.merge({
                comments: action.response.data,
                error: null,
                statusSuccess: true,
            });
        case SAVE_COMMENT_SUCCESSFULLY:
            return state.merge({
                comments: [...state.get('comments'), action.response.data],
                error: null,
                statusSuccess: true,
            });
        case GET_COMMENT_SUCCESSFULLY:
            return state.merge({
                comment: action.response.data,
                error: null,
                statusSuccess: true,
            });
        case VOTE_COMMENT_SUCCESSFULLY:
        case UPDATE_COMMENT_SUCCESSFULLY:
            return state.merge({
                comments: state.get('comments').map(comment =>
                    comment.id === action.successData.id ? action.response.data : comment),
                error: null,
                statusSuccess: true,
            });
        case DELETE_COMMENT_SUCCESSFULLY:
            return state.merge({
                comments: state.get('comments').filter(comment => comment.id !== action.successData.id),
                error: null,
                statusSuccess: true,
            });
        case DELETE_COMMENT_FAILED:
        case UPDATE_COMMENT_FAILED:
        case VOTE_COMMENT_FAILED:
        case GET_POST_COMMENTS_FAILED:
        case SAVE_COMMENT_FAILED:
        case GET_COMMENT_FAILED:
            return state.merge({
                error: action.error,
                statusSuccess: false,
            });
        default:
            return state;
    }
};