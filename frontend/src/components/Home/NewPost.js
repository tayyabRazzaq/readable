import * as PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Slide, Button, TextField,
    Grid, Select, MenuItem, FormControl, InputLabel, withStyles
} from '@material-ui/core';
import homeStyles from '../../styles/homeStyles';
import {generateUID} from '../../utils/helpers';

const Transition = props => <Slide direction="up" {...props} />;

class NewPost extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
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
            if (!post[key].trim()) {
                error[key] = true;
                anyError = true;
            }
        });
        if (anyError) {
            return this.setState({error});
        }
        post.id = generateUID();
        post.timestamp = Date.now();
        return this.props.savePost(post, this.cancelPost);
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
    
    render() {
        
        const {open, post, error} = this.state;
        const {classes, categories} = this.props;
        debugger; //eslint-disable-line
        const categoriesOptions = categories.map(key => (
            <MenuItem key={key.path} value={key.path}>{key.name}</MenuItem>
        ));
        
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={this.handleToggle}
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
                                    onChange={e => this.onChange(e, 'title')}
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
                                    onChange={e => this.onChange(e, 'author')}
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
                                    onChange={e => this.onChange(e, 'body')}
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
                                        onChange={e => this.onChange(e, 'category')}
                                    >
                                        <MenuItem disabled value="">Select</MenuItem>
                                        {categoriesOptions}
                                    </Select>
                                </FormControl>
                                
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.cancelPost} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.submitPost} color="primary" autoFocus>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                <Button
                    onClick={this.handleToggle}
                    className={classes.addPost}
                    color="default"
                    variant="outlined">
                    Add Post
                </Button>
            </div>
        );
    }
}


NewPost.propTypes = {
    classes: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    savePost: PropTypes.func.isRequired,
};


export default withStyles(homeStyles)(NewPost);