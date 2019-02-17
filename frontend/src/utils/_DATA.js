import API from '../common';

/***************************** Categories ************************************/

export const getCategories = () => API.get('categories');

/***************************** Posts ************************************/

export const getCategoryPosts = category => API.get(`${category}/posts`);

export const getAllPosts = () => API.get('posts');

export const savePost = postData => API.post('posts', postData);

export const getPost = id => API.get(`posts/${id}`);

export const votePost = postData => API.post(`posts/${postData.id}`, postData);

export const updatePost = postData => API.put(`posts/${postData.id}`, postData);

export const deletePost = id => API.delete(`posts/${id}`);

/***************************** Comments ************************************/

export const getPostComments = id => API.get(`posts/${id}/comments`);

export const saveComment = postData => API.post('comments', postData);

export const getComment = id => API.get(`comments/${id}`);

export const voteComment = postData => API.post(`comments/${postData.id}`, postData);

export const updateComment = postData => API.put(`comments/${postData.id}`, postData);

export const deleteComment = id => API.delete(`comments/${id}`);