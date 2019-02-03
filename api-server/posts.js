import clone from 'clone';

const db = {};

const defaultData = {
    '8xf0y6ziyjabvozdd253nd': {
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'Udacity is the best place to learn React',
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        category: 'react',
        voteScore: 6,
        deleted: false,
        commentCount: 2
    },
    '6ni6ok3ym7mf1p33lnez': {
        id: '6ni6ok3ym7mf1p33lnez',
        timestamp: 1468479767190,
        title: 'Learn Redux in 10 minutes!',
        body: 'Just kidding. It takes more than 10 minutes to learn technology.',
        author: 'thingone',
        category: 'redux',
        voteScore: -5,
        deleted: false,
        commentCount: 0
    }
};

const getData = token => {
    let data = db[token];
    if (data == null) {
        db[token] = clone(defaultData);
        data = db[token];
    }
    return data;
}

const getByCategory = (token, category) => {
    return new Promise(res => {
        const posts = getData(token);
        const keys = Object.keys(posts);
        const filteredKeys = keys.filter(key => posts[key].category === category && !posts[key].deleted);
        res(filteredKeys.map(key => posts[key]));
    });
};

const get = (token, id) => {
    return new Promise(res => {
        const posts = getData(token);
        res(
            posts[id].deleted
                ? {}
                : posts[id]
        );
    });
};

const getAll = token => {
    return new Promise(res => {
        const posts = getData(token);
        const keys = Object.keys(posts);
        const filteredKeys = keys.filter(key => !posts[key].deleted);
        res(filteredKeys.map(key => posts[key]));
    });
};

const add = (token, post) => {
    return new Promise(res => {
        const posts = getData(token);
        
        posts[post.id] = {
            id: post.id,
            timestamp: post.timestamp,
            title: post.title,
            body: post.body,
            author: post.author,
            category: post.category,
            voteScore: 1,
            deleted: false,
            commentCount: 0
        };
        
        res(posts[post.id]);
    });
};

const vote = (token, id, option) => {
    return new Promise(res => {
        const posts = getData(token);
        const post = posts[id];
        switch (option) {
            case 'upVote':
                post.voteScore += 1;
                break;
            case 'downVote':
                post.voteScore -= 1;
                break;
            default:
                console.log(`posts.vote received incorrect parameter: ${option}`);
        }
        res(post);
    });
};

const disable = (token, id) => {
    return new Promise(res => {
        const posts = getData(token);
        posts[id].deleted = true;
        res(posts[id]);
    });
};

const edit = (token, id, post) => {
    return new Promise(res => {
        const posts = getData(token);
        Object.keys(post).forEach(prop => {
            posts[id][prop] = post[prop];
        });
        res(posts[id]);
    });
};

const incrementCommentCounter = (token, id, count) => {
    const data = getData(token);
    if (data[id]) {
        data[id].commentCount += count;
    }
};

export {
    get,
    getAll,
    getByCategory,
    add,
    vote,
    disable,
    edit,
    incrementCommentCounter
};
