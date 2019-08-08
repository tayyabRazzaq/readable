import React from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';


const PostTableHeader = ({ order, orderBy, rows, onRequestSort }) => {

    const headers = rows.map((row, index) => (
        <TableCell
            key={row.id}
            align={index !== 0 ? 'center' : ''}
            sortDirection={orderBy === row.id ? order : false}
        >
            <Tooltip
                title="Sort"
                enterDelay={300}>
                <TableSortLabel
                    active={orderBy === row.id}
                    disabled={!row.order}
                    direction={order}
                    onClick={e => onRequestSort(e, row.id)}>
                    {row.label}
                </TableSortLabel>
            </Tooltip>
        </TableCell>
    ));

    return (
        <TableHead>
            <TableRow>
                {headers}
            </TableRow>
        </TableHead>
    );
};

PostTableHeader.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rows: PropTypes.array.isRequired,
};

export default PostTableHeader;