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
    DELETE_COMMENT_FAILED,
} from '../common';
import {
    getPostCommentsHelper,
    saveCommentHelper,
    getCommentHelper,
    voteCommentHelper,
    updateCommentHelper,
    deleteCommentHelper,
    performServerCall
} from '../utils';

export const getPostComments = id => dispatch => dispatch(performServerCall(
    getPostCommentsHelper, id, GET_POST_COMMENTS_SUCCESSFULLY, GET_POST_COMMENTS_FAILED),
);

export const saveComment = commentData => dispatch => dispatch(performServerCall(
    saveCommentHelper, commentData, SAVE_COMMENT_SUCCESSFULLY, SAVE_COMMENT_FAILED),
);

export const getComment = id => dispatch => dispatch(performServerCall(
    getCommentHelper, id, GET_COMMENT_SUCCESSFULLY, GET_COMMENT_FAILED),
);

export const voteComment = commentData => dispatch => dispatch(performServerCall(
    voteCommentHelper, commentData, VOTE_COMMENT_SUCCESSFULLY, VOTE_COMMENT_FAILED, { id: commentData.id }),
);

export const updateComment = commentData => dispatch => dispatch(performServerCall(
    updateCommentHelper, commentData, UPDATE_COMMENT_SUCCESSFULLY, UPDATE_COMMENT_FAILED, { id: commentData.id }),
);

export const deleteComment = id => dispatch => dispatch(performServerCall(
    deleteCommentHelper, id, DELETE_COMMENT_SUCCESSFULLY, DELETE_COMMENT_FAILED, { id }),
);
