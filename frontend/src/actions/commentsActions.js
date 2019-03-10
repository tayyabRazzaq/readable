import {
    GET_POST_COMMENTS_SUCCESSFULLY, GET_POST_COMMENTS_FAILED,
    SAVE_COMMENT_SUCCESSFULLY, SAVE_COMMENT_FAILED,
    GET_COMMENT_SUCCESSFULLY, GET_COMMENT_FAILED,
    VOTE_COMMENT_SUCCESSFULLY, VOTE_COMMENT_FAILED,
    UPDATE_COMMENT_SUCCESSFULLY, UPDATE_COMMENT_FAILED,
    DELETE_COMMENT_SUCCESSFULLY, DELETE_COMMENT_FAILED
} from '../common/actionTypes';
import {
    getPostComments,
    saveComment,
    getComment,
    voteComment,
    updateComment,
    deleteComment
} from '../utils/_DATA';
import performServerCall from '../utils/actionHandler';

const getPostCommentsAction = id => dispatch => dispatch(
    performServerCall(getPostComments, id, GET_POST_COMMENTS_SUCCESSFULLY, GET_POST_COMMENTS_FAILED)
);

const saveCommentAction = commentData => dispatch => dispatch(
    performServerCall(saveComment, commentData, SAVE_COMMENT_SUCCESSFULLY, SAVE_COMMENT_FAILED)
);

const getCommentAction = id => dispatch => dispatch(
    performServerCall(getComment, id, GET_COMMENT_SUCCESSFULLY, GET_COMMENT_FAILED)
);

const voteCommentAction = commentData => dispatch => dispatch(
    performServerCall(voteComment, commentData, VOTE_COMMENT_SUCCESSFULLY, VOTE_COMMENT_FAILED)
);

const updateCommentAction = commentData => dispatch => dispatch(
    performServerCall(updateComment, commentData, UPDATE_COMMENT_SUCCESSFULLY, UPDATE_COMMENT_FAILED)
);

const deleteCommentAction = id => dispatch => dispatch(
    performServerCall(deleteComment, id, DELETE_COMMENT_SUCCESSFULLY, DELETE_COMMENT_FAILED)
);

export {
    getPostCommentsAction as getPostComments,
    saveCommentAction as saveComment,
    getCommentAction as getComment,
    voteCommentAction as voteComment,
    updateCommentAction as updateComment,
    deleteCommentAction as deleteComment,
};