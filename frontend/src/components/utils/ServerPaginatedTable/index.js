import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {getSorting, stableSort} from '../../../utils/helpers';
import EnhancedTable from './SortableTable';

class SortableTable extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            order: 'asc',
            orderBy: '',
            page: 0,
            rowsPerPage: 10,
        };
    }
    
    handleRequestSort = (localOrder, localOrderBy) => this.setState({order: localOrder, orderBy: localOrderBy});
    
    handleChangePage = page => this.setState({page});
    
    handleChangeRowsPerPage = rowsPerPage => this.setState({rowsPerPage});
    
    render() {
        const {posts} = this.props;
        const {page, rowsPerPage, order, orderBy} = this.state;
    
        const rows = [
            {id: 'title', numeric: false, disablePadding: true, label: 'Title'},
            {id: 'body', numeric: false, disablePadding: false, label: 'Body'},
            {id: 'author', numeric: false, disablePadding: false, label: 'Author'},
            {id: 'category', numeric: false, disablePadding: false, label: 'Category'},
            {id: 'voteScore', numeric: true, disablePadding: false, label: 'Score'},
        ];
        
        const calculatedRowsPerPage = rowsPerPage === 'All' || posts.length < rowsPerPage ? posts.length : rowsPerPage;
        const sortedData = stableSort(posts, getSorting(order, orderBy));
        const slicedData = sortedData.slice(
            page * calculatedRowsPerPage, page * calculatedRowsPerPage + calculatedRowsPerPage);
        
        
        return (
            <EnhancedTable
                data={slicedData}
                headers={rows}
                order={order}
                orderBy={orderBy}
                rowsPerPage={calculatedRowsPerPage}
                page={page}
                totalCount={posts.length}
                handleRequestSort={this.handleRequestSort}
                handleChangePage={this.handleChangePage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
        );
    }
}

SortableTable.propTypes = {
    posts: PropTypes.array.isRequired,
};

export default SortableTable;