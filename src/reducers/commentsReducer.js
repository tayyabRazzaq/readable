import {Map} from 'immutable';

const initialState = new Map({
	comments: [],
	comment: {}
});

export default (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};