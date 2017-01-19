import React, { Component } from 'react';
import CarList from '../containers/car-list';
import ToolBar from '../containers/toolbar';
import MainHeader from '../components/main-header';
import CarForm from '../containers/car-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  
  createCar,
  updateCar,
  removeCar,
} from '../reducers/cars-reducer';

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      carToUpdate: null
    }

    this.handleToogleModal = this.handleToogleModal.bind(this);
    this.onCreateCar = this.onCreateCar.bind(this);
    this.onUpdateCar = this.onUpdateCar.bind(this);
    this.onDeleteCar = this.onDeleteCar.bind(this);
  }

  handleToogleModal(car) {
    this.setState((prevState, props) => {
      return {
        modalIsOpen: !prevState.modalIsOpen,
        carToUpdate: car
      }
    })
  }

  onCreateCar(car) {
    this.props.createCar(car);
    this.handleToogleModal(null);
  }

  onUpdateCar(car) {
    this.props.updateCar(car);
    this.handleToogleModal(null);
  }

  onDeleteCar(carId) {
    this.props.removeCar(carId);    
  }

  render() {
    const {modalIsOpen, carToUpdate } = this.state;
    
    return (
      <div className="main-container">
        <MainHeader />
        <ToolBar 
          onClickNewCar={this.handleToogleModal}
        />
        <CarList 
          toogleModal={this.handleToogleModal}
          onDelete={this.onDeleteCar}
        />   
        {this.state.modalIsOpen &&
          <CarForm
            title={carToUpdate ? 'Editar Veículo' : 'Cadastrar Veículo'}
            onSubmit={carToUpdate ? this.onUpdateCar : this.onCreateCar}
            initialValues={carToUpdate ? carToUpdate : null}
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
    cars: state.cars
  };
}

const mapDispatchToProps = dispatch => ({
   createCar: bindActionCreators(createCar, dispatch),
   updateCar: bindActionCreators(updateCar, dispatch),
   removeCar: bindActionCreators(removeCar, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
