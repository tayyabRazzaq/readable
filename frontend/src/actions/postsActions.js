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
    DELETE_POST_FAILED,
} from '../common/actionTypes';
import {
    getCategoryPostsHelper,
    getAllPostsHelper,
    savePostHelper,
    getPostHelper,
    votePostHelper,
    updatePostHelper,
    deletePostHelper,
    performServerCall
} from '../utils';

export const getAllPosts = () => dispatch => dispatch(performServerCall(
    getAllPostsHelper, {}, GET_ALL_POSTS_SUCCESSFULLY, GET_ALL_POSTS_FAILED),
);

export const getCategoryPosts = category => dispatch => dispatch(performServerCall(
    getCategoryPostsHelper, category, GET_CATEGORY_POSTS_SUCCESSFULLY, GET_CATEGORY_POSTS_FAILED),
);

export const savePost = postData => dispatch => dispatch(performServerCall(
    savePostHelper, postData, SAVE_POST_SUCCESSFULLY, SAVE_POST_FAILED),
);

export const getPost = id => dispatch => dispatch(performServerCall(
    getPostHelper, id, GET_POST_SUCCESSFULLY, GET_POST_FAILED),
);

export const votePost = postData => dispatch => dispatch(performServerCall(
    votePostHelper, postData, VOTE_POST_SUCCESSFULLY, VOTE_POST_FAILED, { id: postData.id }),
);

export const updatePost = postData => dispatch => dispatch(performServerCall(
    updatePostHelper, postData, UPDATE_POST_SUCCESSFULLY, UPDATE_POST_FAILED, { id: postData.id }),
);

export const deletePost = id => dispatch => dispatch(performServerCall(
    deletePostHelper, id, DELETE_POST_SUCCESSFULLY, DELETE_POST_FAILED, { id }),
);