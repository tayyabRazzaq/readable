export const getRequestHeaders = () => {
	let token = localStorage.token;
	if (!token)
		token = localStorage.token = Math.random().toString(36).substr(-8);

	return {
		'Accept': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Authorization': token
	};
};
