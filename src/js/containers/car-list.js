import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  
  loadCars
} from '../reducers/cars-reducer';

export class CarList extends Component {
    constructor(props) {
    	super(props);
    }

		render() {
			//TODO
			//render only the car's grid
      console.log(this.props.cars);
			return ( 
				<div className="car-list">
					<h2>cars grid</h2>
				</div>	
			);

		}
}

const mapStateToProps = (state) => {
  return {
    cars: state.cars
  };
}

const mapDispatchToProps = dispatch => ({
   loadCars: bindActionCreators(loadCars, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CarList);