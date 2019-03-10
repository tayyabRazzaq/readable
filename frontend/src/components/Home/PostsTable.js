import {IconButton, Table, TableBody, TableCell, TableRow, withStyles} from '@material-ui/core';
import {
    DeleteForeverOutlined,
    EditOutlined,
    RemoveRedEyeOutlined,
    ThumbDownOutlined,
    ThumbUpOutlined
} from '@material-ui/icons';
import * as PropTypes from 'prop-types';
import React from 'react';
import homeStyle from '../../styles/homeStyles';
import {getSorting, stableSort} from '../../utils/helpers';
import PostTableHeader from './PostTableHeader';

const PostsTable = props => {
    const {order, orderBy, posts} = props;
    const rows = [
        {id: 'title', label: 'Title', order: true},
        {id: 'author', label: 'Author', order: true},
        {id: 'timestamp', label: 'Date', order: true},
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
            <TableCell align="center">{new Date(post.timestamp).toDateString()}</TableCell>
            <TableCell align="center">{post.commentCount}</TableCell>
            <TableCell align="center">{post.voteScore}</TableCell>
            <TableCell align="center">
                <IconButton onClick={() => props.votePost(post.id, 'upVote')}>
                    <ThumbUpOutlined/>
                </IconButton>
                <IconButton onClick={() => props.votePost(post.id, 'downVote')}>
                    <ThumbDownOutlined/>
                </IconButton>
            </TableCell>
            <TableCell align="center">
                <IconButton onClick={() => props.editPost(post.id)}>
                    <EditOutlined/>
                </IconButton>
                <IconButton onClick={() => props.viewPost(post.id, post.category)}>
                    <RemoveRedEyeOutlined/>
                </IconButton>
                <IconButton onClick={() => props.deletePost(post.id)}>
                    <DeleteForeverOutlined/>
                </IconButton>
            </TableCell>
        </TableRow>
    ));
    return (
        <Table>
            <PostTableHeader
                rows={rows}
                order={order}
                orderBy={orderBy}
                onRequestSort={props.handleRequestSort}
            />
            <TableBody>
                {postTable}
            </TableBody>
        </Table>
    );
};

PostsTable.propTypes = {
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    deletePost: PropTypes.func.isRequired,
    handleRequestSort: PropTypes.func.isRequired,
    viewPost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired,
};

export default withStyles(homeStyle)(PostsTable);