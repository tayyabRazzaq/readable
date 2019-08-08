import { createMuiTheme } from '@material-ui/core/styles';

const fontMontserrat = 'Montserrat, sans-serif';

export default createMuiTheme({
    typography: {
        fontFamily: fontMontserrat,
        useNextVariants: true,
    },
    root: {
        flexGrow: 1,
        // fontWeight: '500',
        typography: {
            fontFamily: fontMontserrat,
        },
    },
    grow: {
        flexGrow: 1,
    },
});