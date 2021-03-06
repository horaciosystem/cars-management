import React, { Component } from 'react';
import CarList from './car-list';
import ToolBar from './toolbar';
import MainHeader from '../components/main-header';
import CarForm from './car-form';
import Pagination from './pagination';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  
  createCar,
  updateCar,
  removeCar,
  loadCars,
  filterCars
} from '../reducers/cars-reducer';

if (process.env.NODE_ENV === 'dev') {
  const {whyDidYouUpdate} = require('why-did-you-update')
  whyDidYouUpdate(React);
}

export class App extends Component {
  state = {
    modalIsOpen: false,
    carToUpdate: null
  };

  handleToogleModal = (car) => {
    this.setState((prevState, props) => {
      return {
        modalIsOpen: !prevState.modalIsOpen,
        carToUpdate: car
      }
    });
  }

  onCreateCar = (car) => {
    this.props.createCar(car);
    this.handleToogleModal(null);
  }

  onUpdateCar = (car) => {
    this.props.updateCar(car);
    this.handleToogleModal(null);
  }

  onDeleteCar = (carId) => {
    this.props.removeCar(carId);    
  }

  render() {
    const {modalIsOpen, carToUpdate } = this.state;
    
    return (
      <div className="main-container">
        <MainHeader text="Logo" />
        <ToolBar 
          toogleModal={this.handleToogleModal}
        />
        <CarList 
          toogleModal={this.handleToogleModal}
          onDelete={this.onDeleteCar}
        />        
        {this.props.carsState.getIn(['pagination','totalPages']) > 1 &&
          <Pagination 
            carsState={this.props.carsState}
          />
        }
        {this.state.modalIsOpen &&
          <CarForm
            title={carToUpdate ? 'Editar Veículo' : 'Cadastrar Veículo'}
            onSubmit={carToUpdate ? this.onUpdateCar : this.onCreateCar}
            initialValues={carToUpdate ? carToUpdate.toJS() : {combustivel: 'Flex', valor: 0}}
            toogleModal={this.handleToogleModal}
            modalIsOpen
          />          
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    carsState: state.cars
  };
}

const mapDispatchToProps = dispatch => ({
   createCar: bindActionCreators(createCar, dispatch),
   updateCar: bindActionCreators(updateCar, dispatch),
   removeCar: bindActionCreators(removeCar, dispatch),
   loadCars: bindActionCreators(loadCars, dispatch),
   filterCars: bindActionCreators(filterCars, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
