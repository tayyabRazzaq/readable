import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import MenuIcon from '@material-ui/icons/Menu';
import homeStyle from '../../styles/homeStyles';
import {getCategories, getAllPosts, getCategoryPosts} from '../../utils/_DATA';


class ButtonAppBar extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            categories: [],
            posts: [],
            showSideBar: true
        };
    }
    
    componentDidMount() {
        getCategories().then(response => {
            debugger; // eslint-disable-line
            this.setState({categories: response.data.categories});
        });
        getAllPosts().then(response => {
            debugger; // eslint-disable-line
            this.setState({posts: response.data});
        });
    }
    
    toggleSideBar = () => this.setState(prevState => ({showSideBar: !prevState.showSideBar}));
    
    handleNavClick = key => {
        getCategoryPosts(key).then(response => {
            debugger; // eslint-disable-line
            this.setState({posts: response.data}, () => {
                const {history} = this.props;
                history.push(key);
            });
        });
    };
    
    render()    {
        const {classes, history} = this.props;
        const {posts, categories, showSideBar} = this.state;
    
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
        const postList = posts.map(post => (
            <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.body}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>{post.voteScore}</TableCell>
                <TableCell>{post.deleted}</TableCell>
            </TableRow>
        ));
        return (
            <div className={classes.root}>
                <AppBar
                    position="static" color='default'
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
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <nav className={navBarStyling.join(' ')}>
                    <List
                        className={classes.navList}
                        component='nav'>
                        {categoriesList}
                    </List>
                </nav>
                <div id='main-content'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Body</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Score</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {postList}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default withStyles(homeStyle)(ButtonAppBar);