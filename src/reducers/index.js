import {combineReducers} from 'redux';
import postsReducer from './postsReducer';
import commentsReducer from './commentsReducer';
import categoriesReducer from './categoriesReducer';

const rootReducer = combineReducers({
	postsReducer,
	commentsReducer,
	categoriesReducer
});

export default rootReducer