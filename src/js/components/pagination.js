import React, { Component } from 'react';

export default class Pagination extends Component {

  getItemStyle(page) {
    const actualPage = this.props.carsState.pagination.page;
    if (page === actualPage) 
      return 'pagination-link is-current';

    return 'pagination-link';
  }

  render() {
    const { carsState, loadCars } = this.props;
    const { totalPages, page } = carsState.pagination;
    const pages = Array.apply(0, Array(totalPages)).map((_, i) => i);    
    return (
      <nav className="pagination is-centered">        
        <ul className="pagination-list">
          {pages && pages.map(pageNumber =>
            <li 
              key={`page-${pageNumber}`}
              onClick={() => loadCars(pageNumber + 1)}>
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