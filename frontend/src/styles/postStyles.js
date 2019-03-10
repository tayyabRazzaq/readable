export default theme => ({
    root: {...theme.root},
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    grow: {...theme.grow},
    verticalGrow: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center'
    },
    voteIcon: {
        alignSelf: 'center'
    },
    voteIcoBtn: {
        width: '48px',
        alignItems: 'center',
        alignSelf: 'center'
    }
});
