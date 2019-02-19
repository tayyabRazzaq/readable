import {combineReducers} from 'redux';
import categoriesReducer from './categoriesReducer';
import postsReducer from './postsReducer';
import commentsReducer from './commentsReducer';

const rootReducer = combineReducers({
    categoriesReducer,
    postsReducer,
    commentsReducer
});

export default rootReducer;