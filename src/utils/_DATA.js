import API from '../common';

export const getCategories = () => API.get('categories');

export const getCategoryPosts = category => API.get(`${category}/posts`);

export const getAllPosts = () => API.get('posts');

export const savePost = postData => API.post('posts', postData);

export const getPost = id => API.get(`posts/${id}`);

export const votePost = (id, postData) => API.post(`posts/${id}`, postData);

export const updatePost = (id, postData) => API.put(`posts/${id}`, postData);

export const deletePost = id => API.delete(`posts/${id}`);

export const getPostComments = id => API.get(`posts/${id}/comments`);

export const saveComments = postData => API.post('comments', postData);

export const getComment = id => API.get(`comments/${id}`);

export const voteComment = (id, postData) => API.post(`comments/${id}`, postData);

export const updateComment = (id, postData) => API.put(`comments/${id}`, postData);

export const deleteComment = id => API.delete(`comments/${id}`);