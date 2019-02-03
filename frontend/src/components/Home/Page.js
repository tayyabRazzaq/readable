import React from 'react';
import * as PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import homeStyle from '../../styles/homeStyles';

const ButtonAppBar = props => {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <AppBar
                position="static" color='default'
                classes={{
                    colorDefault: classes.appBar
                }}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Readable
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(homeStyle)(ButtonAppBar);