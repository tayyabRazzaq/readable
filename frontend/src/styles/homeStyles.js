import {grayColor, white, transition} from './style';


const homeStyle = theme => ({
    root: {...theme.root},
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    grow: {...theme.grow},
    appBar: {
        backgroundColor: grayColor,
        color: white
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    sideNav: {
        ...transition,
        color: white,
        whiteSpace: 'nowrap',
        float: 'left',
        position: 'static',
        // position: 'fixed',
        top: '0',
        left: '0',
        bottom: '0',
        zIndex: 99,
        overflowY: 'auto',
        height: '100vh',
        margin: '0 0 0 -245px',
        width: '245px',
        background: grayColor,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
        [theme.breakpoints.down('md')]: {
            boxShadow: 'none !important',
        }
    },
    sideNavToggle: {
        margin: '0',
        boxShadow: '5px 0 20px rgba(0,0,0,.1)',
    },
    navList: {
        padding: '90px 0 20px',
        color: white
    },
    itemGroup: {
        opacity: '0.6',
        paddingTop: '9px',
        paddingBottom: '9px',
        position: 'relative',
    },
    activeItem: {
        opacity: '1'
    },
});


export default homeStyle;