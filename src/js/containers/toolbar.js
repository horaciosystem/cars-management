import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debounce from 'lodash/fp/debounce';
import { filterCars } from '../reducers/cars-reducer';

export class Toolbar extends Component {
    constructor(props) {
    	super(props);
			this.onFilterCars = debounce(300, this.onFilterCars.bind(this));
			this.state = {searchValue: ''};
    }

		handleSearchChange = (event) => {
			const searchValue = event.target.value;
			this.setState({searchValue});
			this.onFilterCars(searchValue);
  	}

		onFilterCars = (query) => {
			this.props.filterCars(query);
		}

		render() {
			return ( 
				<div className="toolbar">
					<div>					
						<button 
							className="button is-medium is-success"
							onClick={() => this.props.toogleModal(null)}
						>
							Novo Carro
						</button>
					</div>
					<div>
						<input 
							className="input is-medium search" 
							type="text"
							placeholder="Pesquise por marca e/ou combustível"
							value={this.state.searchValue}
							onChange={this.handleSearchChange} />
					</div>
				</div>	
			);
		}
}

const mapDispatchToProps = dispatch => ({
   filterCars: bindActionCreators(filterCars, dispatch),
});

export default connect(null, mapDispatchToProps)(Toolbar);

