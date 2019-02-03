import clone from 'clone';

const db = {};

const defaultData = {
    categories: [
        {
            name: 'react',
            path: 'react'
        },
        {
            name: 'redux',
            path: 'redux'
        },
        {
            name: 'udacity',
            path: 'udacity'
        }
    ]
};

const getData = token => {
    // Each token has it's own copy of the DB. The token in this case is like an app id.
    let data = db[token];
    // This populates the default user data if there isn't any in the db.
    if (data == null) {
        db[token] = clone(defaultData);
        data = db[token];
    }
    return data;
};

export const getAll = token => {
    return new Promise(res => {
        res(getData(token));
    });
};