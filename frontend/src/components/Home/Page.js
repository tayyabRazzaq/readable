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
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from 'react-redux';
import homeStyle from '../../styles/homeStyles';
import {postsActions, getCategories} from '../../actions';
import {getSorting, stableSort} from '../../utils/helpers';
import EnhancedTable from '../utils/ServerPaginatedTable/SortableTable';

const rows = [
    {id: 'title', numeric: false, disablePadding: true, label: 'Title'},
    {id: 'body', numeric: false, disablePadding: false, label: 'Body'},
    {id: 'author', numeric: false, disablePadding: false, label: 'Author'},
    {id: 'category', numeric: false, disablePadding: false, label: 'Category'},
    {id: 'voteScore', numeric: true, disablePadding: false, label: 'Score'},
];

class ButtonAppBar extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            showSideBar: true,
            order: 'asc',
            orderBy: '',
            page: 0,
            rowsPerPage: 10,
        };
    }
    
    componentDidMount() {
        this.props.getCategories();
        this.props.getAllPosts();
    }
    
    handleRequestSort = (localOrder, localOrderBy) => this.setState({order: localOrder, orderBy: localOrderBy});
    
    handleChangePage = page => this.setState({page});
    
    handleChangeRowsPerPage = rowsPerPage => this.setState({rowsPerPage});
    
    toggleSideBar = () => this.setState(prevState => ({showSideBar: !prevState.showSideBar}));
    
    handleNavClick = key => {
        if (key === '') {
            return this.props.getAllPosts().then(() => this.props.history.push('/'));
        }
        return this.props.getCategoryPosts(key).then(() => this.routeToCategory(key));
    };
    
    routeToCategory = key => this.props.history.push(`/${key}`);
    
    render() {
        const {classes, history} = this.props;
        const categories = this.props.categoriesReducer.get('categories');
        const posts = this.props.postsReducer.get('posts');
    
        const {showSideBar, page, rowsPerPage, order, orderBy} = this.state;
        
        const calculatedRowsPerPage = rowsPerPage === 'All' ? posts.length : rowsPerPage;
        const sortedData = stableSort(posts, getSorting(order, orderBy));
        const slicedData = sortedData.slice(
            page * calculatedRowsPerPage, page * calculatedRowsPerPage + calculatedRowsPerPage);
        
        
        
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
                        <Button color="inherit">Login</Button>
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
                        <EnhancedTable
                            data={slicedData}
                            headers={rows}
                            order={order}
                            orderBy={orderBy}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            handleRequestSort={this.handleRequestSort}
                            handleChangePage={this.handleChangePage}
                            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    postsReducer: PropTypes.object.isRequired,
    categoriesReducer: PropTypes.object.isRequired,
    getCategories: PropTypes.func.isRequired,
    getAllPosts: PropTypes.func.isRequired,
    getCategoryPosts: PropTypes.func.isRequired,
};

const mapStateToProps = ({postsReducer, categoriesReducer}) => ({postsReducer, categoriesReducer});

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategories()),
    getAllPosts: () => dispatch(postsActions.getAllPosts()),
    getCategoryPosts: category => dispatch(postsActions.getCategoryPosts(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(homeStyle)(ButtonAppBar));