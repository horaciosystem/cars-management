import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadCars } from '../reducers/cars-reducer';
import CarListItem from '../components/car-list-item';

export class CarList extends Component {
    constructor(props) {
    	super(props);
    }

		render() {
			const cars = this.props.cars;
			return ( 
				<div className="car-list">
					<table className="table is-striped is-bordered">
            <thead>
							<tr>
								<th>Placa</th>
								<th>Modelo</th>
								<th>Marca</th>
								<th>Foto</th>
								<th>Combustivel</th>
								<th>Valor</th>
								<th></th>								
              </tr>
            </thead>
            <tbody>
            	{this.renderItems()}
            </tbody>
        	</table>
				</div>	
			);
		}

		renderItems(toogleModal, onDelete) {			
			return this.props.cars.map(car => 
				<CarListItem 
					key={`car${car.id}`}
				 	car={car}
					onEdit={this.props.toogleModal}
					onDelete={this.props.onDelete}
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