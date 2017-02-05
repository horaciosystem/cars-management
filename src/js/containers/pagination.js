import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadCars } from '../reducers/cars-reducer';

class Pagination extends Component {

  getItemStyle(page) {
    const actualPage = this.props.carsState.getIn(['pagination', 'page']);
    if (page === actualPage) 
      return 'pagination-link is-current';

    return 'pagination-link';
  }

  navigateToPage(page) {
    this.props.loadCars(page);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.carsState.get('pagination') !== this.props.carsState.get('pagination');
  }

  render() {    
    const { totalPages, page } = this.props.carsState.get('pagination').toJS();
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

const mapDispatchToProps = dispatch => ({
   loadCars: bindActionCreators(loadCars, dispatch),
});

export default connect(null, mapDispatchToProps)(Pagination);