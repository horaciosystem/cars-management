import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadCars } from '../reducers/cars-reducer';

class Pagination extends Component {

  getItemStyle(page) {
    const actualPage = this.props.carsState.pagination.page;
    if (page === actualPage) 
      return 'pagination-link is-current';

    return 'pagination-link';
  }

  navigateToPage(page) {
    this.props.loadCars(page);
  }

  render() {    
    const { totalPages, page } = this.props.carsState.pagination;
    const pages = Array.apply(0, Array(totalPages)).map((_, i) => i);    
    return (
      <nav className="pagination is-centered">        
        <ul className="pagination-list">
          {pages && pages.map(pageNumber =>
            <li 
              key={`page-${pageNumber}`}
              onClick={() => this.navigateToPage(pageNumber + 1)}>
              <a className={this.getItemStyle(pageNumber + 1)} >
                {pageNumber + 1}
              </a>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    carsState: state.cars
  };
}

const mapDispatchToProps = dispatch => ({
   loadCars: bindActionCreators(loadCars, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);