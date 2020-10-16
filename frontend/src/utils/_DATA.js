import {API} from '../common';

/* =================================================== Categories =================================================== */

export const getCategoriesHelper = () => API.get('categories');

/* ===================================================== Posts ====================================================== */

export const getCategoryPostsHelper = category => API.get(`${category}/posts`);

export const getAllPostsHelper = () => API.get('posts');

export const savePostHelper = postData => API.post('posts', postData);

export const getPostHelper = id => API.get(`posts/${id}`);

export const votePostHelper = postData => API.post(`posts/${postData.id}`, postData);

export const updatePostHelper = postData => API.put(`posts/${postData.id}`, postData);

export const deletePostHelper = id => API.delete(`posts/${id}`);

/* ==================================================== Comments ==================================================== */

export const getPostCommentsHelper = id => API.get(`posts/${id}/comments`);

export const saveCommentHelper = postData => API.post('comments', postData);

export const getCommentHelper = id => API.get(`comments/${id}`);

export const voteCommentHelper = postData => API.post(`comments/${postData.id}`, postData);

export const updateCommentHelper = postData => API.put(`comments/${postData.id}`, postData);

export const deleteCommentHelper = id => API.delete(`comments/${id}`);