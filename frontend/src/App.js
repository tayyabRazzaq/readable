import {AppBar, IconButton, List, ListItem, ListItemText, Toolbar, Typography, withStyles} from '@material-ui/core';
import {Menu as MenuIcon} from '@material-ui/icons';
import * as PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import routes from './routes';
import {getCategories} from './actions';
import homeStyle from './styles/homeStyles';

class MainApp extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            showSideBar: true
        };
    }
    
    componentDidMount() {
        this.props.getCategories();
    }
    
    toggleSideBar = () => this.setState(prevState => ({showSideBar: !prevState.showSideBar}));
    
    handleNavClick = key => key === '' ? this.props.history.push('/') : this.props.history.push(`/${key}`);
    
    render() {
    
        const {classes, history} = this.props;
        const categories = this.props.categoriesReducer.get('categories');
    
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
};

const mapStateToProps = ({categoriesReducer}) => ({categoriesReducer});

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(homeStyle)(MainApp));