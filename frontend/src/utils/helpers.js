const desc = (firstObject, secondObject, orderBy) => {
    if (secondObject[orderBy] < firstObject[orderBy]) {
        return -1;
    }
    if (secondObject[orderBy] > firstObject[orderBy]) {
        return 1;
    }
    return 0;
};

export const stableSort = (array, orderType) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = orderType(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
};

export const getSorting = (order, orderBy) => order === 'desc' ? (firstObject, secondObject) => desc(
    firstObject, secondObject, orderBy) : (a, b) => -desc(a, b, orderBy);

export const generateUID = () =>
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);