import {
    AppBar, IconButton, Button, List, ListItem, ListItemText, Toolbar, Typography, withStyles
} from '@material-ui/core';
import {Menu as MenuIcon} from '@material-ui/icons';
import * as PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import routes from './routes';
import {getCategories, postsActions} from './actions';
import homeStyle from './styles/homeStyles';
import {generateUID} from './utils/helpers';
import NewPost from './components/Home/NewPost';
import {EMPTY_POST, DEFAULT_POST_ERROR} from './common';

class MainApp extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            showSideBar: true,
            open: false,
            post: {...EMPTY_POST},
            error: {...DEFAULT_POST_ERROR}
        };
    }
    
    componentDidMount() {
        this.props.getCategories();
    }
    
    toggleSideBar = () => this.setState(prevState => ({showSideBar: !prevState.showSideBar}));
    
    handleNavClick = key => key === '' ? this.props.history.push('/') : this.props.history.push(`/${key}`);
    
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
        post.id = generateUID();
        post.timestamp = Date.now();
        return this.props.savePost(post).then(() => this.cancelPost());
    };
    
    cancelPost = () => this.setState({post: {...EMPTY_POST}, error: {...DEFAULT_POST_ERROR}}, this.handleToggle);
    
    render() {
    
        const {classes, history} = this.props;
        const {open, post: localPost, error, showSideBar} = this.state;
        const categories = this.props.categoriesReducer.get('categories');
    
        const navBarStyling = [classes.sideNav];
        if (showSideBar) {
            navBarStyling.push(classes.sideNavToggle);
        }
        
        const categoriesList = categories.map(category => {
            const navItemClasses = [classes.itemGroup];
            if (`/${category.path}` === history.location.pathname) {
                navItemClasses.push(classes.activeItem);
            }
            return (
                <ListItem
                    key={category.name}
                    button onClick={() => this.handleNavClick(category.path)}
                    className={navItemClasses.join(' ')}>
                    <ListItemText
                        inset primary={category.name}
                        className={classes.ListItem} disableTypography/>
                </ListItem>
            );
        });
    
        const navItemClasses = [classes.itemGroup];
        if (history.location.pathname === '/') {
            navItemClasses.push(classes.activeItem);
        }
        
        return (
            <div className={classes.root}>
                <AppBar
                    position="static" color="default"
                    className={classes.topBar}
                    classes={{
                        colorDefault: classes.appBar
                    }}>
                    <Toolbar>
                        <IconButton
                            onClick={this.toggleSideBar}
                            className={classes.menuButton} color="inherit"
                            aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Readable
                        </Typography>
                        <Button onClick={() => this.handleNavClick('')} className={classes.appBarBtn}>Home</Button>
                        <Button onClick={this.handleToggle} className={classes.appBarBtn}>New Post</Button>
                    </Toolbar>
                </AppBar>
                <nav className={navBarStyling.join(' ')}>
                    <List
                        className={classes.navList}
                        component="nav">
                        <ListItem
                            button onClick={() => this.handleNavClick('')}
                            className={navItemClasses.join(' ')}>
                            <ListItemText
                                inset primary="All"
                                className={classes.ListItem} disableTypography/>
                        </ListItem>
                        {categoriesList}
                    </List>
                </nav>
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
                <div id="main-content">
                    {routes}
                </div>
            </div>
        );
    }
}

MainApp.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    categoriesReducer: PropTypes.object.isRequired,
    getCategories: PropTypes.func.isRequired,
    savePost: PropTypes.func.isRequired,
};

const mapStateToProps = ({categoriesReducer}) => ({categoriesReducer});

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategories()),
    savePost: postData => dispatch(postsActions.savePost(postData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(homeStyle)(MainApp));