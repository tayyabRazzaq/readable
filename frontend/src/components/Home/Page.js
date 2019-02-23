import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {IconButton, Toolbar, AppBar, Typography, List, ListItem, ListItemText, withStyles} from '@material-ui/core';
import {Menu as MenuIcon} from '@material-ui/icons';
import {connect} from 'react-redux';
import homeStyle from '../../styles/homeStyles';
import {postsActions, getCategories} from '../../actions';
import PostTable from './PostTable';


class MainPage extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            showSideBar: true
        };
    }
    
    componentDidMount() {
        this.props.getCategories();
        const {category} = this.props.match.params;
        return category ? this.props.getCategoryPosts(category) : this.props.getAllPosts();
    }
    
    // eslint-disable-next-line
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {category} = this.props.match.params;
        const {category: prevCategory} = prevProps.match.params;
        if (category && (!prevCategory || category !== prevCategory)) {
            this.props.getCategoryPosts(category);
        }
        else if (!category && prevCategory) {
            this.props.getAllPosts();
        }
    }
    
    toggleSideBar = () => this.setState(prevState => ({showSideBar: !prevState.showSideBar}));
    
    handleNavClick = key => key === '' ? this.props.history.push('/') : this.props.history.push(`/${key}`);
    
    votePost = (id, option) => this.props.votePost({id, option});
    
    deletePost = postId => this.props.deletePost(postId);
    
    viewPost = (postId, category) => this.props.history.push(`/${category}/${postId}`);
    
    render() {
        const {classes, history} = this.props;
        const categories = this.props.categoriesReducer.get('categories');
        const posts = this.props.postsReducer.get('posts');
        const {showSideBar} = this.state;
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
                <div id="main-content">
                    <div>
                        <PostTable
                            posts={posts}
                            votePost={this.votePost}
                            deletePost={this.deletePost}
                            viewPost={this.viewPost}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

MainPage.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    postsReducer: PropTypes.object.isRequired,
    categoriesReducer: PropTypes.object.isRequired,
    getCategories: PropTypes.func.isRequired,
    getAllPosts: PropTypes.func.isRequired,
    getCategoryPosts: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = ({postsReducer, categoriesReducer}) => ({postsReducer, categoriesReducer});

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategories()),
    getAllPosts: () => dispatch(postsActions.getAllPosts()),
    getCategoryPosts: category => dispatch(postsActions.getCategoryPosts(category)),
    votePost: postData => dispatch(postsActions.votePost(postData)),
    deletePost: postId => dispatch(postsActions.deletePost(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(homeStyle)(MainPage));