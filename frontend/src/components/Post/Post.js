import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core';
import {connect} from 'react-redux';
import PostStyles from '../../styles/postStyles';
import {postsActions} from '../../actions';


class Post extends Component {
    
    componentDidMount() {
        debugger; //eslint-disable-line
        this.props.getPost(this.props.match.params.postId);
    }
    
    render() {
        const post = this.props.postsReducer.get('post');
        debugger; //eslint-disable-line
        return (
            <div>
                Post
                <br/>
                {post.title}
            </div>
        );
    }
}

Post.propTypes = {
    postsReducer: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
};

const mapStateToProps = ({postsReducer}) => ({postsReducer});

const mapDispatchToProps = dispatch => ({
    getPost: id => dispatch(postsActions.getPost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(PostStyles)(Post));