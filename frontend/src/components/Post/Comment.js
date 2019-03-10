import React from 'react';
import * as PropTypes from 'prop-types';
import {KeyboardArrowDownRounded, KeyboardArrowUpRounded} from '@material-ui/icons';
import {withStyles, Grid, IconButton} from '@material-ui/core';
import PostStyles from '../../styles/postStyles';

const Comment = props => {
    const {comment} = props;
    
    return (
        <div className={classes.verticalGrow}>
            <IconButton onClick={() => props.voteComment('up')}>
                <KeyboardArrowUpRounded className={classes.voteIcon}/>
            </IconButton>
            <span>{comment.voteScore}</span>
            <IconButton onClick={() => props.voteComment('down')}>
                <KeyboardArrowDownRounded className={classes.voteIcon}/>
            </IconButton>
        </div>
    )
};

Comment.propTypes = {
    classes: PropTypes.object.isRequired,
    voteComment: PropTypes.func.isRequired,
};

export default withStyles(PostStyles)(Comment);