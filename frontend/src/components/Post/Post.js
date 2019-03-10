import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {
    UnfoldLessRounded, UnfoldMoreRounded, KeyboardArrowDownRounded, KeyboardArrowUpRounded
} from '@material-ui/icons';
import {withStyles, Grid, IconButton} from '@material-ui/core';
import {connect} from 'react-redux';
import PostStyles from '../../styles/postStyles';
import {postsActions, commentsActions} from '../../actions';


class Post extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            showComments: false
        };
    }
    
    componentDidMount() {
        debugger; //eslint-disable-line
        this.props.getPost(this.props.match.params.postId);
    }
    
    onShowComments = () => this.setState({showComments: true},
        () => this.props.getPostComments(this.props.match.params.postId));
    
    onHideComments = () => this.setState({showComments: false});
    
    votePost = option => this.props.votePost({id: this.props.match.params.postId, option});
    
    render() {
        const post = this.props.postsReducer.get('post');
        const comments = this.props.commentsReducer.get('comments'); //eslint-disable-line
        debugger; //eslint-disable-line
        const {classes} = this.props;
        const {showComments} = this.state;
        return (
            <div>
                <Grid container spacing={0}>
                    <Grid item sm={1} justify="center">
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
                                <h2>{post.title}</h2>
                            </Grid>
                            <Grid item sm={12}>
                                <div>
                                    <span>{post.body}</span>
                                </div>
                                <div>
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
                                        </div> :
                                        <div>
                                            <IconButton onClick={this.onHideComments}>
                                                <UnfoldLessRounded/>
                                            </IconButton>
                                            Hide Comments (<span>{post.commentCount}</span>)
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
    postsReducer: PropTypes.object.isRequired,
    commentsReducer: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired,
    getPostComments: PropTypes.func.isRequired,
};

const mapStateToProps = ({postsReducer, commentsReducer}) => ({postsReducer, commentsReducer});

const mapDispatchToProps = dispatch => ({
    getPost: id => dispatch(postsActions.getPost(id)),
    votePost: postData => dispatch(postsActions.votePost(postData)),
    getPostComments: id => dispatch(commentsActions.getPostComments(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(PostStyles)(Post));