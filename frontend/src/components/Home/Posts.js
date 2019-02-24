import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Grid, withStyles} from '@material-ui/core';
import {connect} from 'react-redux';
import homeStyle from '../../styles/homeStyles';
import {postsActions} from '../../actions';
import {generateUID} from '../../utils/helpers';
import PostsTable from './PostsTable';
import NewPost from './NewPost';


class Posts extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            order: 'asc',
            orderBy: '',
            open: false,
            post: {
                title: '',
                author: '',
                body: '',
                category: '',
            },
            error: {
                title: false,
                author: false,
                body: false,
                category: false,
            }
        };
    }
    
    componentDidMount() {
        const {category} = this.props.match.params;
        return category ? this.props.getCategoryPosts(category) : this.props.getAllPosts();
    }
    
    // eslint-disable-next-line
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {category} = this.props.match.params;
        const {category: prevCategory} = prevProps.match.params;
        if (category && (!prevCategory || category !== prevCategory)) {
            this.props.getCategoryPosts(category);
        } else if (!category && prevCategory) {
            this.props.getAllPosts();
        }
    }
    
    handleToggle = () => this.setState(prevState => ({open: !prevState.open}));
    
    onChange = (e, property) => {
        const {post, error} = this.state;
        post[property] = e.target.value;
        error[property] = false;
        this.setState({post, error});
    };
    
    submitPost = () => {
        const {post, error} = this.state;
        let anyError = false;
        Object.keys(post).forEach(key => {
            if (!post[key].toString().trim()) {
                error[key] = true;
                anyError = true;
            }
        });
        if (anyError) {
            return this.setState({error});
        }
        if ('id' in post) {
            return this.props.updatePost(post).then(() => this.cancelPost());
        }
        post.id = generateUID();
        post.timestamp = Date.now();
        return this.props.savePost(post).then(() => this.cancelPost());
    };
    
    cancelPost = () => this.setState({
        post: {
            title: '',
            author: '',
            body: '',
            category: '',
        },
        error: {
            title: false,
            author: false,
            body: false,
            category: false,
        }
    }, this.handleToggle);
    
    handleRequestSort = (event, property) => {
        const localOrderBy = property;
        let localOrder = 'desc';
        const {orderBy, order} = this.state;
        if (orderBy === property && order === 'desc') {
            localOrder = 'asc';
        }
        this.setState({order: localOrder, orderBy: localOrderBy});
    };
    
    votePost = (id, option) => this.props.votePost({id, option});
    
    deletePost = postId => this.props.deletePost(postId);
    
    viewPost = (postId, category) => this.props.history.push(`/${category}/${postId}`);
    
    editPost = postId => {
        const posts = this.props.postsReducer.get('posts');
        const post = posts.find(postData => postData.id === postId);
        if (post) {
            this.setState({post: {...post}}, this.handleToggle);
        }
    };
    
    render() {
        
        const {order, orderBy, open, post: localPost, error} = this.state;
        
        const posts = this.props.postsReducer.get('posts');
        const categories = this.props.categoriesReducer.get('categories');
        
        return (
            <div>
                <Grid container direction="row-reverse" justify="flex-start" alignItems="center">
                    <Grid item sm={1}>
                        <NewPost
                            categories={categories}
                            open={open}
                            post={localPost}
                            error={error}
                            handleToggle={this.handleToggle}
                            cancelPost={this.cancelPost}
                            submitPost={this.submitPost}
                            onChange={this.onChange}
                        />
                    </Grid>
                </Grid>
                <PostsTable
                    order={order}
                    orderBy={orderBy}
                    posts={posts}
                    viewPost={this.viewPost}
                    deletePost={this.deletePost}
                    editPost={this.editPost}
                    votePost={this.votePost}
                    handleRequestSort={this.handleRequestSort}
                />
            </div>
        );
    }
}

Posts.propTypes = {
    // classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    postsReducer: PropTypes.object.isRequired,
    categoriesReducer: PropTypes.object.isRequired,
    getAllPosts: PropTypes.func.isRequired,
    getCategoryPosts: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    savePost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
};

const mapStateToProps = ({postsReducer, categoriesReducer}) => ({postsReducer, categoriesReducer});

const mapDispatchToProps = dispatch => ({
    getAllPosts: () => dispatch(postsActions.getAllPosts()),
    getCategoryPosts: category => dispatch(postsActions.getCategoryPosts(category)),
    votePost: postData => dispatch(postsActions.votePost(postData)),
    deletePost: postId => dispatch(postsActions.deletePost(postId)),
    savePost: postData => dispatch(postsActions.savePost(postData)),
    updatePost: postData => dispatch(postsActions.updatePost(postData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(homeStyle)(Posts));