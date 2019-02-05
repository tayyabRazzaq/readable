import React from 'react';
import * as PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import {isEqual} from 'lodash';
import EnhancedTableToolbar from './EnhanceTableToolbar';
import EnhancedTableHead from './EnhancedTableHeader';
import {getSorting, stableSort} from '../../utils/helpers';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: '',
            selected: [],
            data: props.data,
            page: 0,
            rowsPerPage: 10,
        };
    }
    
    static getDerivedStateFromProps(props, state) {
        if (!isEqual(props.data, state.data)) {
            return {
                data: props.data,
            };
        }
        return null;
    }
    
    handleRequestSort = (event, property) => {
        const localOrderBy = property;
        let localOrder = 'desc';
        const {orderBy, order} = this.state;
        if (orderBy === property && order === 'desc') {
            localOrder = 'asc';
        }
        this.setState({order: localOrder, orderBy: localOrderBy});
    };
    
    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(prevState => ({selected: prevState.data.map(row => row.id)}));
            return;
        }
        this.setState({selected: []});
    };
    
    handleClick = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        
        this.setState({selected: newSelected});
    };
    
    handleChangePage = (event, page) => this.setState({page});
    
    handleChangeRowsPerPage = event => this.setState({rowsPerPage: event.target.value});
    
    isSelected = id => {
        const {selected} = this.state;
        return selected.indexOf(id) !== -1;
    };
    
    render() {
        const {classes, headers} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
        const calculatedRowsPerPage = rowsPerPage === 'All' ? data.length : rowsPerPage;
        const sortedData = stableSort(data, getSorting(order, orderBy));
        const slicedData = sortedData.slice(
            page * calculatedRowsPerPage, page * calculatedRowsPerPage + calculatedRowsPerPage);
        const renderedData = slicedData.map(row => {
            const isSelected = this.isSelected(row.id);
            
            const renderedColumns = headers.map(column => (
                <TableCell
                    key={column.id}
                    align={column.numeric ? 'right' : 'left'}
                    padding={column.disablePadding ? 'none' : 'default'}>
                    {row[column.id]}
                </TableCell>
            ));
            
            return (
                <TableRow
                    hover
                    onClick={event => this.handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isSelected}>
                    <TableCell padding="checkbox">
                        <Checkbox checked={isSelected}/>
                    </TableCell>
                    {renderedColumns}
                </TableRow>
            );
        });
        const paginationOptions = [5, 10, 15];
        const totalCount = data.length;
        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            rows={headers}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
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
};

export default withStyles(styles)(EnhancedTable);