import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CarListItem from '../components/car-list-item';

export class CarList extends Component {
    constructor(props) {
    	super(props);
    }

		shouldComponentUpdate(nextProps, nextState) {
			return nextProps.carsState !== this.props.carsState;
		}

		render() {			
			return ( 
				<div className="car-list">
					<table className="table is-narrow">
            <thead>
							<tr>
								<th className="table-header">Placa</th>
								<th className="table-header">Modelo</th>
								<th className="table-header">Marca</th>
								<th className="table-header">Foto</th>
								<th className="table-header">Combustivel</th>
								<th className="table-header">Valor</th>
								<th className="table-header"></th>								
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
			const pagination = this.props.carsState.get('pagination');
			return pagination.get('data').map(car =>								
				<CarListItem 
					key={`car-${car.get('id')}-${car.get('marca')}-${car.get('modelo')}`}
				 	car={car}
					onEdit={this.props.toogleModal}
					onDelete={this.props.onDelete}
				/>				
			);
		}
}

const mapStateToProps = (state) => {
  return {
    carsState: state.cars
  };
}

export default connect(mapStateToProps)(CarList);