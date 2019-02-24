import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {TableRow, TableCell, Table, TableBody, IconButton, Grid, withStyles} from '@material-ui/core';
import {DeleteForeverOutlined, RemoveRedEyeOutlined, ThumbDownOutlined, ThumbUpOutlined} from '@material-ui/icons';
import {connect} from 'react-redux';
import homeStyle from '../../styles/homeStyles';
import {postsActions} from '../../actions';
import {getSorting, stableSort} from '../../utils/helpers';
import PostTableHeader from './PostTableHeader';
import NewPost from './NewPost';


class Posts extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            order: 'asc',
            orderBy: '',
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
    
    savePost = (postData, callBack) => this.props.savePost(postData).then(() => {
        if (callBack) {
            callBack();
        }
    });
    
    render() {
        
        const {order, orderBy} = this.state;
        
        const posts = this.props.postsReducer.get('posts');
        const categories = this.props.categoriesReducer.get('categories');
        
        const rows = [
            {id: 'title', label: 'Title', order: true},
            {id: 'author', label: 'Author', order: true},
            {id: 'commentCount', label: 'No. of Comments', order: true},
            {id: 'voteScore', label: 'Current Score', order: true},
            {id: 'vote', label: 'Vote', order: false},
            {id: 'action', label: 'Actions', order: false},
        ];
        
        const sortedPosts = stableSort(posts, getSorting(order, orderBy));
        
        const postTable = sortedPosts.map(post => (
            <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell align="center">{post.author}</TableCell>
                <TableCell align="center">{post.commentCount}</TableCell>
                <TableCell align="center">{post.voteScore}</TableCell>
                <TableCell align="center">
                    <IconButton onClick={() => this.votePost(post.id, 'upVote')}>
                        <ThumbUpOutlined/>
                    </IconButton>
                    <IconButton onClick={() => this.votePost(post.id, 'downVote')}>
                        <ThumbDownOutlined/>
                    </IconButton>
                </TableCell>
                <TableCell align="center">
                    <IconButton onClick={() => this.viewPost(post.id, post.category)}>
                        <RemoveRedEyeOutlined/>
                    </IconButton>
                    <IconButton onClick={() => this.deletePost(post.id)}>
                        <DeleteForeverOutlined/>
                    </IconButton>
                </TableCell>
            </TableRow>
        ));
        
        return (
            <div>
                <Grid container direction="row-reverse" justify="flex-start" alignItems="center">
                    <Grid item sm={1}>
                        <NewPost categories={categories} savePost={this.savePost}/>
                    </Grid>
                </Grid>
                <Table>
                    <PostTableHeader
                        rows={rows}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={this.handleRequestSort}
                    />
                    <TableBody>
                        {postTable}
                    </TableBody>
                </Table>
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
};

const mapStateToProps = ({postsReducer, categoriesReducer}) => ({postsReducer, categoriesReducer});

const mapDispatchToProps = dispatch => ({
    getAllPosts: () => dispatch(postsActions.getAllPosts()),
    getCategoryPosts: category => dispatch(postsActions.getCategoryPosts(category)),
    votePost: postData => dispatch(postsActions.votePost(postData)),
    deletePost: postId => dispatch(postsActions.deletePost(postId)),
    savePost: postData => dispatch(postsActions.savePost(postData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(homeStyle)(Posts));