import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {TableRow, TableCell, Table, TableHead, TableBody, IconButton, withStyles} from '@material-ui/core';
import {DeleteForeverOutlined, RemoveRedEyeOutlined, ThumbDownOutlined, ThumbUpOutlined} from '@material-ui/icons';
import {connect} from 'react-redux';
import homeStyle from '../../styles/homeStyles';
import {postsActions} from '../../actions';


class MainPage extends Component {
    
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
    
    votePost = (id, option) => this.props.votePost({id, option});
    
    deletePost = postId => this.props.deletePost(postId);
    
    viewPost = (postId, category) => this.props.history.push(`/${category}/${postId}`);
    
    render() {
        const posts = this.props.postsReducer.get('posts');
        
        const postTable = posts.map(post => (
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
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="center">Author</TableCell>
                            <TableCell align="center">No. of Comments</TableCell>
                            <TableCell align="center">Current Score</TableCell>
                            <TableCell align="center">Vote</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {postTable}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

MainPage.propTypes = {
    // classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    postsReducer: PropTypes.object.isRequired,
    getAllPosts: PropTypes.func.isRequired,
    getCategoryPosts: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = ({postsReducer}) => ({postsReducer});

const mapDispatchToProps = dispatch => ({
    getAllPosts: () => dispatch(postsActions.getAllPosts()),
    getCategoryPosts: category => dispatch(postsActions.getCategoryPosts(category)),
    votePost: postData => dispatch(postsActions.votePost(postData)),
    deletePost: postId => dispatch(postsActions.deletePost(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(homeStyle)(MainPage));