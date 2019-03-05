import * as PropTypes from 'prop-types';
import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Slide, Button, TextField,
    Grid, Select, MenuItem, FormControl, InputLabel, withStyles
} from '@material-ui/core';
import homeStyles from '../../styles/homeStyles';

const Transition = props => <Slide direction="up" {...props} />;

const NewPost = props => {
    const {classes, categories, open, post, error} = props;
    const categoriesOptions = categories.map(key => (
        <MenuItem key={key.path} value={key.path}>{key.name}</MenuItem>
    ));
    
    return (
        <div>
            <Dialog
                open={open}
                onClose={props.cancelPost}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">New Post</DialogTitle>
                <DialogContent>
                    <Grid container spacing={4}>
                        <Grid item sm={12}>
                            <TextField
                                className={classes.postField}
                                value={post.title}
                                error={error.title}
                                required
                                variant="outlined"
                                fullWidth
                                label="Title"
                                onChange={e => props.onChange(e, 'title')}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                className={classes.postField}
                                required
                                error={error.author}
                                value={post.author}
                                fullWidth
                                variant="outlined"
                                label="Author"
                                onChange={e => props.onChange(e, 'author')}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                className={classes.postField}
                                multiline
                                required
                                error={error.body}
                                value={post.body}
                                fullWidth
                                variant="outlined"
                                label="Body"
                                onChange={e => props.onChange(e, 'body')}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <FormControl
                                className={classes.formControl}
                                fullWidth
                                variant="outlined"
                                error={error.category}
                            >
                                <InputLabel htmlFor="category">Category</InputLabel>
                                <Select
                                    className={classes.postField}
                                    required
                                    value={post.category}
                                    fullWidth
                                    inputProps={{
                                        id: 'category',
                                    }}
                                    onChange={e => props.onChange(e, 'category')}
                                >
                                    <MenuItem disabled value="">Select</MenuItem>
                                    {categoriesOptions}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.cancelPost} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={props.submitPost} color="primary" autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};


NewPost.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    submitPost: PropTypes.func.isRequired,
    cancelPost: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};


export default withStyles(homeStyles)(NewPost);