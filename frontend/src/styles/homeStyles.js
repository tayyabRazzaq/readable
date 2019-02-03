import {grayColor, white} from './style';


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
    }
});


export default homeStyle;