import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import {
    UnfoldLessRounded,
    UnfoldMoreRounded,
    KeyboardArrowDownRounded,
    KeyboardArrowUpRounded,
    EditOutlined,
    DeleteForeverOutlined,
} from '@material-ui/icons';
import { withStyles, Grid, IconButton, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PostStyles from '../../styles/postStyles';
import { postsActions, commentsActions } from '../../actions';
import { generateUID } from '../../utils/helpers';
import Comment from './Comment';
import NewComment from './NewComment';
import NewPost from '../Home/NewPost';
import { DEFAULT_POST_ERROR, EMPTY_POST, EMPTY_COMMENT, DEFAULT_COMMENT_ERROR } from '../../common';


class Post extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editablePost: false,
            showComments: false,
            editableComment: false,
            post: { ...EMPTY_POST },
            errorPost: { ...DEFAULT_POST_ERROR },
            comment: { ...EMPTY_COMMENT },
            errorComment: { ...DEFAULT_COMMENT_ERROR },
        };
    }

    componentDidMount() {
        this.getPost(this.props.match.params.postId);
    }

    getPost = postId => this.props.getPost(postId).then(() => {
        const post = this.props.postsReducer.get('post');
        const statusSuccess = this.props.postsReducer.get('statusSuccess');
        if (!statusSuccess || isEmpty(post)) {
            this.props.history.push('/page-404');
        }
    });

    votePost = option => this.props.votePost({ id: this.props.match.params.postId, option });

    handlePostToggle = () => this.setState(prevState => ({ editablePost: !prevState.editablePost }));

    onPostChange = (e, property) => {
        const { post, errorPost } = this.state;
        post[property] = e.target.value;
        errorPost[property] = false;
        this.setState({ post, errorPost });
    };

    editPost = () => {
        const post = this.props.postsReducer.get('post');
        if (post) {
            this.setState({ post: { ...post } }, this.handlePostToggle);
        }
    };

    submitPost = () => {
        const { post, errorPost } = this.state;
        let anyError = false;
        Object.keys(post).forEach(key => {
            if (!post[key].toString().trim()) {
                errorPost[key] = true;
                anyError = true;
            }
        });
        if (anyError) {
            return this.setState({ errorPost });
        }
        return this.props.updatePost(post).then(() => this.cancelPost());
    };

    cancelPost = () => this.setState({
        post: { ...EMPTY_POST },
        errorPost: { ...DEFAULT_POST_ERROR },
    }, this.handlePostToggle);

    deletePost = () => this.props.deletePost(this.props.match.params.postId).then(() => this.props.history.push('/'));

    onShowComments = () => this.setState({ showComments: true },
        () => this.props.getPostComments(this.props.match.params.postId));

    onHideComments = () => this.setState({ showComments: false });

    handleCommentToggle = () => this.setState(prevState => ({ editableComment: !prevState.editableComment }));

    onCommentChange = (e, property) => {
        const { comment, errorComment } = this.state;
        comment[property] = e.target.value;
        errorComment[property] = false;
        this.setState({ comment, errorComment });
    };

    editComment = commentId => {
        const comments = this.props.commentsReducer.get('comments');
        const comment = comments.find(commentData => commentData.id === commentId);
        if (comment) {
            this.setState({ comment: { ...comment } }, this.handleCommentToggle);
        }
    };

    submitComment = () => {
        const { comment, errorComment } = this.state;
        let anyError = false;
        Object.keys(comment).forEach(key => {
            if (!comment[key].toString().trim()) {
                errorComment[key] = true;
                anyError = true;
            }
        });
        if (anyError) {
            return this.setState({ errorComment });
        }
        if ('id' in comment) {
            return this.props.updateComment(comment).then(() => this.cancelComment());
        }
        comment.id = generateUID();
        comment.timestamp = Date.now();
        comment.parentId = this.props.match.params.postId;
        return this.props.saveComment(comment).then(() => {
            this.getPost(this.props.match.params.postId);
            this.cancelComment();
        });
    };

    cancelComment = () => this.setState({
        comment: { ...EMPTY_COMMENT },
        errorComment: { ...DEFAULT_COMMENT_ERROR },
    }, this.handleCommentToggle);

    voteComment = (id, option) => this.props.voteComment({ id, option });

    deleteComment = id => this.props.deleteComment(id).then(() => this.getPost(this.props.match.params.postId));

    renderComments = comments => comments.map(comment => (
        <Comment
            key={comment.id}
            comment={comment}
            voteComment={this.voteComment}
            editComment={this.editComment}
            deleteComment={this.deleteComment}
        />
    ));

    render() {
        const post = this.props.postsReducer.get('post');
        const comments = this.props.commentsReducer.get('comments');
        const categories = this.props.categoriesReducer.get('categories');
        const { classes } = this.props;
        const {
            showComments, comment, errorComment, editableComment,
            editablePost, post: localPost, errorPost,
        } = this.state;

        const commentsList = this.renderComments(comments);

        return (
            <div>
                <NewPost
                    categories={categories}
                    open={editablePost}
                    post={localPost}
                    error={errorPost}
                    handleToggle={this.handlePostToggle}
                    cancelPost={this.cancelPost}
                    submitPost={this.submitPost}
                    onChange={this.onPostChange}
                />
                <NewComment
                    comment={comment}
                    error={errorComment}
                    open={editableComment}
                    submitComment={this.submitComment}
                    cancelComment={this.cancelComment}
                    onChange={this.onCommentChange}
                />
                <Grid container spacing={0}>
                    <Grid item sm={1}>
                        <div className={classes.verticalGrow}>
                            <IconButton onClick={() => this.votePost('upVote')} className={classes.voteIcoBtn}>
                                <KeyboardArrowUpRounded className={classes.voteIcon}/>
                            </IconButton>
                            <span>{post.voteScore}</span>
                            <IconButton onClick={() => this.votePost('downVote')} className={classes.voteIcoBtn}>
                                <KeyboardArrowDownRounded className={classes.voteIcon}/>
                            </IconButton>
                        </div>
                    </Grid>
                    <Grid item sm={11}>
                        <Grid container alignItems="center">
                            <Grid item sm={12}>
                                <h2>{post.title}
                                    <IconButton onClick={this.editPost}>
                                        <EditOutlined/>
                                    </IconButton>
                                    <IconButton onClick={this.deletePost}>
                                        <DeleteForeverOutlined/>
                                    </IconButton>
                                </h2>
                            </Grid>
                            <Grid item sm={12}>
                                <div>
                                    <span>{post.body}</span>
                                </div>
                                <div>
                                    <label>By: </label>
                                    <span>{post.author}</span>
                                </div>
                                <div>
                                    <label>Date: </label>
                                    <span>{post.timestamp ? new Date(post.timestamp).toDateString() : ''}</span>
                                </div>
                            </Grid>
                            <Grid item sm={12}>
                                {
                                    !showComments ?
                                        <div>
                                            <IconButton onClick={this.onShowComments}>
                                                <UnfoldMoreRounded/>
                                            </IconButton>
                                            Show Comments (<span>{post.commentCount}</span>)
                                            <Button
                                                className={classes.newComment}
                                                onClick={this.handleCommentToggle}>New Comment</Button>
                                        </div> :
                                        <div>
                                            <IconButton onClick={this.onHideComments}>
                                                <UnfoldLessRounded/>
                                            </IconButton>
                                            Hide Comments (<span>{post.commentCount}</span>)
                                            <Button
                                                className={classes.newComment}
                                                onClick={this.handleCommentToggle}>New Comment</Button>
                                            <br/>
                                            {commentsList}
                                        </div>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <br/>
            </div>
        );
    }
}

Post.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    categoriesReducer: PropTypes.object.isRequired,
    postsReducer: PropTypes.object.isRequired,
    commentsReducer: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    getPostComments: PropTypes.func.isRequired,
    saveComment: PropTypes.func.isRequired,
    updateComment: PropTypes.func.isRequired,
    voteComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = ({ postsReducer, commentsReducer, categoriesReducer }) =>
    ({ postsReducer, commentsReducer, categoriesReducer });

const mapDispatchToProps = dispatch => ({
    getPost: id => dispatch(postsActions.getPost(id)),
    votePost: postData => dispatch(postsActions.votePost(postData)),
    updatePost: postData => dispatch(postsActions.updatePost(postData)),
    deletePost: id => dispatch(postsActions.deletePost(id)),
    getPostComments: id => dispatch(commentsActions.getPostComments(id)),
    saveComment: commentData => dispatch(commentsActions.saveComment(commentData)),
    updateComment: commentData => dispatch(commentsActions.updateComment(commentData)),
    voteComment: commentData => dispatch(commentsActions.voteComment(commentData)),
    deleteComment: id => dispatch(commentsActions.deleteComment(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(PostStyles)(Post));