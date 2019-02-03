import {Map} from 'immutable';

const initialState = new Map({
	categories: [],
	category: {}
});

export default (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};