import * as PropTypes from 'prop-types';
import React from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell, IconButton} from '@material-ui/core';
import {ThumbDownOutlined, ThumbUpOutlined, DeleteForeverOutlined, RemoveRedEyeOutlined} from '@material-ui/icons';


const PostTable = props => {
    const {posts} = props;
    debugger; //eslint-disable-line
    const postTable = posts.map(post => (
        <TableRow key={post.id}>
            <TableCell>{post.title}</TableCell>
            <TableCell align="center">{post.author}</TableCell>
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
    );
};

PostTable.propTypes = {
    posts: PropTypes.array.isRequired,
    votePost: PropTypes.func.isRequired,
    viewPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
};

export default PostTable;