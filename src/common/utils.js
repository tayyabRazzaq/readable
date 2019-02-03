export const getRequestHeaders = () => {
    let token = localStorage.getItem('token');
    if (!token){
        token = Math.random().toString(36).substr(-8);
        localStorage.setItem('token', token);
    }
    return {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': token
    };
};
