import {Map} from 'immutable';

const initialState = new Map({
	posts: [],
	post: {}
});

export default (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};