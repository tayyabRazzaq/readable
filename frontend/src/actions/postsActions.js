import {
    GET_CATEGORY_POSTS_SUCCESSFULLY, GET_CATEGORY_POSTS_FAILED,
    GET_ALL_POSTS_SUCCESSFULLY, GET_ALL_POSTS_FAILED,
    SAVE_POST_SUCCESSFULLY, SAVE_POST_FAILED,
    GET_POST_SUCCESSFULLY, GET_POST_FAILED,
    VOTE_POST_SUCCESSFULLY, VOTE_POST_FAILED,
    UPDATE_POST_SUCCESSFULLY, UPDATE_POST_FAILED,
    DELETE_POST_SUCCESSFULLY, DELETE_POST_FAILED
} from '../common/actionTypes';
import {getCategoryPosts, getAllPosts, savePost, getPost, votePost, updatePost, deletePost} from '../utils/_DATA';
import performServerCall from '../utils/actionHandler';


const getAllPostsAction = () => dispatch => dispatch(
    performServerCall(getAllPosts, {}, GET_ALL_POSTS_SUCCESSFULLY, GET_ALL_POSTS_FAILED)
);

const getCategoryPostsAction = category => dispatch => dispatch(
    performServerCall(getCategoryPosts, category, GET_CATEGORY_POSTS_SUCCESSFULLY, GET_CATEGORY_POSTS_FAILED)
);

const savePostAction = postData => dispatch => dispatch(
    performServerCall(savePost, postData, SAVE_POST_SUCCESSFULLY, SAVE_POST_FAILED)
);

const getPostAction = id => dispatch => dispatch(
    performServerCall(getPost, id, GET_POST_SUCCESSFULLY, GET_POST_FAILED)
);

const votePostAction = postData => dispatch => dispatch(
    performServerCall(votePost, postData, VOTE_POST_SUCCESSFULLY, VOTE_POST_FAILED, {id: postData.id})
);

const updatePostAction = postData => dispatch => dispatch(
    performServerCall(updatePost, postData, UPDATE_POST_SUCCESSFULLY, UPDATE_POST_FAILED)
);

const deletePostAction = id => dispatch => dispatch(
    performServerCall(deletePost, id, DELETE_POST_SUCCESSFULLY, DELETE_POST_FAILED, {id})
);

export {
    getAllPostsAction as getAllPosts,
    getCategoryPostsAction as getCategoryPosts,
    savePostAction as savePost,
    getPostAction as getPost,
    votePostAction as votePost,
    updatePostAction as updatePost,
    deletePostAction as deletePost
};