import React from 'react';
import * as PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EnhancedTableHead from './EnhancedTableHeader';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 960
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {
    
    handleRequestSort = (event, property) => {
        const localOrderBy = property;
        let localOrder = 'desc';
        const {orderBy, order} = this.props;
        if (orderBy === property && order === 'desc') {
            localOrder = 'asc';
        }
        this.props.handleRequestSort(localOrder, localOrderBy);
    };
    
    handleChangePage = (event, page) => this.props.handleChangePage(page);
    
    handleChangeRowsPerPage = event => this.props.handleChangeRowsPerPage(event.target.value);
    
    render() {
        const {classes, headers, data, order, orderBy, rowsPerPage, page} = this.props;
        const calculatedRowsPerPage = rowsPerPage === 'All' ? data.length : rowsPerPage;
        const renderedData = data.map(row => {
            const renderedColumns = headers.map(column => (
                <TableCell
                    key={column.id}
                    align={column.numeric ? 'right' : 'left'}
                    padding={column.disablePadding ? 'none' : 'default'}>
                    {row[column.id]}
                </TableCell>
            ));
            
            return (
                <TableRow key={row.id}>
                    {renderedColumns}
                </TableRow>
            );
        });
        const paginationOptions = [1, 5, 10, 15];
        const totalCount = data.length;
        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            rows={headers}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                        />
                        <TableBody>
                            {renderedData}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[...paginationOptions.filter(option => option < totalCount), totalCount]}
                    component="div"
                    count={totalCount}
                    rowsPerPage={calculatedRowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.oneOf([PropTypes.number, PropTypes.string]).isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
    handleRequestSort: PropTypes.func.isRequired,
};

export default withStyles(styles)(EnhancedTable);