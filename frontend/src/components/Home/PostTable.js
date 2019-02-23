import * as PropTypes from 'prop-types';
import React from 'react';



const PostTable = props => {
    const {posts} = props;
    debugger; //eslint-disable-line
    
};

PostTable.propTypes = {
    posts: PropTypes.array.isRequired,
    votePost: PropTypes.func.isRequired,
    viewPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
};

export default PostTable;