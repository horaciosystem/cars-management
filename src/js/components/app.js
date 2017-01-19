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
} from '../reducers/cars-reducer';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      carToUpdate: null
    }

    this.hadleToogleModal = this.hadleToogleModal.bind(this);
    this.onCreateCar = this.onCreateCar.bind(this);
    this.onUpdateCar = this.onUpdateCar.bind(this);
  }

  hadleToogleModal(car) {
    this.setState((prevState, props) => {
      return {
        modalIsOpen: !prevState.modalIsOpen,
        carToUpdate: car
      }
    })
  }

  onCreateCar(car) {
    this.props.createCar(car);
    this.hadleToogleModal(null);
  }

  onUpdateCar(car) {
    this.props.updateCar(car);
    this.hadleToogleModal(null);
  }

  render() {
    const {modalIsOpen, carToUpdate } = this.state;
    
    return (
      <div className="main-container">
        <MainHeader />
        <ToolBar 
          onClickNewCar={() => this.hadleToogleModal(null) }
        />
        <CarList 
          toogleModal={this.hadleToogleModal}
        />   
        {this.state.modalIsOpen &&
          <CarForm
            title={carToUpdate ? 'Editar Veículo' : 'Cadastrar Veículo'}
            onSubmit={carToUpdate ? this.onUpdateCar : this.onCreateCar}
            initialValues={carToUpdate ? carToUpdate : null}
            toogleModal={this.hadleToogleModal}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
