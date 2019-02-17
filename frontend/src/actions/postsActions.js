import {
    GET_CATEGORY_POSTS_SUCCESSFULLY, GET_CATEGORY_POSTS_FAILED,
    GET_ALL_POSTS_SUCCESSFULLY, GET_ALL_POSTS_FAILED,
} from '../common/actionTypes';
import {getCategoryPosts, getAllPosts} from '../utils/_DATA';
import performServerCall from '../utils/actionHandler';


const getAllPostsAction = () => dispatch => dispatch(
    performServerCall(getAllPosts, {}, GET_ALL_POSTS_SUCCESSFULLY, GET_ALL_POSTS_FAILED)
);

const getCategoryPostsAction = category => dispatch => dispatch(
    performServerCall(getCategoryPosts, category, GET_CATEGORY_POSTS_SUCCESSFULLY, GET_CATEGORY_POSTS_FAILED)
);

export {
    getAllPostsAction as getAllPosts,
    getCategoryPostsAction as getCategoryPosts
};