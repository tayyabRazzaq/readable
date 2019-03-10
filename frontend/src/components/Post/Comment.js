import React from 'react';
import * as PropTypes from 'prop-types';
import {
    DeleteForeverOutlined, EditOutlined, KeyboardArrowDownRounded, KeyboardArrowUpRounded} from '@material-ui/icons';
import {withStyles, Grid, IconButton} from '@material-ui/core';
import PostStyles from '../../styles/postStyles';

const Comment = props => {
    
    const {comment, classes} = props;
    
    return (
        <Grid container>
            <Grid item sm={1}>
                <div className={classes.verticalGrow}>
                    <IconButton
                        onClick={() => props.voteComment(
                            comment.id, 'upVote')} className={classes.voteIcoBtn}>
                        <KeyboardArrowUpRounded className={classes.voteIcon}/>
                    </IconButton>
                    <span>{comment.voteScore}</span>
                    <IconButton
                        onClick={() => props.voteComment(
                            comment.id, 'downVote')} className={classes.voteIcoBtn}>
                        <KeyboardArrowDownRounded className={classes.voteIcon}/>
                    </IconButton>
                </div>
            </Grid>
            <Grid item sm={11}>
                <Grid container>
                    <Grid item sm={12}>
                        {comment.body}
                        <IconButton onClick={() => props.editComment(comment.id)}>
                            <EditOutlined/>
                        </IconButton>
                        <IconButton onClick={() => props.deleteComment(comment.id)}>
                            <DeleteForeverOutlined/>
                        </IconButton>
                    </Grid>
                    <Grid item sm={12}>
                        <label>Author: </label>
                        <span>{comment.author}</span>
                    </Grid>
                    <Grid item sm={12}>
                        <label>Date: </label>
                        <span>{comment.timestamp ? new Date(comment.timestamp).toDateString() : ''}</span>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

Comment.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    voteComment: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
};

export default withStyles(PostStyles)(Comment);