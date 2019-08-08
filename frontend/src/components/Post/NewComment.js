import * as PropTypes from 'prop-types';
import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Slide, Button, TextField, Grid, withStyles,
} from '@material-ui/core';
import postStyles from '../../styles/postStyles';

const Transition = props => <Slide direction="up" {...props} />;

const NewComment = props => {
    const { classes, open, comment, error } = props;

    return (
        <div>
            <Dialog
                open={open}
                onClose={props.cancelComment}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Comment</DialogTitle>
                <DialogContent>
                    <Grid container spacing={4}>
                        <Grid item sm={12}>
                            <TextField
                                className={classes.commentField}
                                value={comment.body}
                                error={error.body}
                                required
                                variant="outlined"
                                fullWidth
                                label="Comment"
                                onChange={e => props.onChange(e, 'body')}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                className={classes.commentField}
                                required
                                error={error.author}
                                value={comment.author}
                                fullWidth
                                variant="outlined"
                                label="Author"
                                onChange={e => props.onChange(e, 'author')}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.cancelComment} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={props.submitComment} color="primary" autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};


NewComment.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    submitComment: PropTypes.func.isRequired,
    cancelComment: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default withStyles(postStyles)(NewComment);