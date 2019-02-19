import React from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';


class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        const {onRequestSort} = this.props;
        onRequestSort(event, property);
    };
    
    render() {
        const {order, orderBy, rows} = this.props;
        
        const headers = rows.map(row => (
            <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
            >
                <Tooltip
                    title="Sort"
                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}>
                    <TableSortLabel
                        active={orderBy === row.id}
                        direction={order}
                        onClick={this.createSortHandler(row.id)}>
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
    }
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rows: PropTypes.array.isRequired
};

export default EnhancedTableHead;