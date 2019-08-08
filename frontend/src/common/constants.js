export const API_URL = 'http://localhost:3001';

export const EMPTY_POST = {
    title: '',
    author: '',
    body: '',
    category: '',
};

export const DEFAULT_POST_ERROR = {
    title: false,
    author: false,
    body: false,
    category: false,
};

export const EMPTY_COMMENT = {
    author: '',
    body: '',
};

export const DEFAULT_COMMENT_ERROR = {
    author: false,
    body: false,
};

export const POST_TABLE_DATA = [
    { id: 'title', label: 'Title', order: true },
    { id: 'author', label: 'Author', order: true },
    { id: 'timestamp', label: 'Date', order: true },
    { id: 'commentCount', label: 'No. of Comments', order: true },
    { id: 'voteScore', label: 'Current Score', order: true },
    { id: 'vote', label: 'Vote', order: false },
    { id: 'action', label: 'Actions', order: false },
];