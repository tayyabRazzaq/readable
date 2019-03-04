export default theme => ({
    root: {...theme.root},
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    grow: {...theme.grow},
});
