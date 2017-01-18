import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  
  loadCars
} from '../reducers/cars-reducer';
import CarListItem from '../components/car-list-item';

export class CarList extends Component {
    constructor(props) {
    	super(props);
    }

		render() {
			//TODO
			//render only the car's grid
			const { cars } = this.props;
			console.log('cars', cars);
      console.log(this.props.cars);
			return ( 
				<div className="car-list">
					<table className="table is-striped">
            <thead>
							<tr>
								<th>Placa</th>
								<th>Modelo</th>
								<th>Marca</th>
								<th>Foto</th>
								<th>Combustivel</th>
								<th>Valor</th>
              </tr>
            </thead>
            <tbody>
            	{this.renderItems()}
            </tbody>
        	</table>
				</div>	
			);
		}

		renderItems() {
			return this.props.cars.map(car => 
				<CarListItem 
					key={`car${car.id}`}
				 	car={car} 
				/>				
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