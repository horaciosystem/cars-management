import React, { Component } from 'react';
import CarList from '../containers/car-list';
import ToolBar from '../containers/toolbar';
import MainHeader from '../components/main-header';
import CarForm from '../containers/car-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  
  createCar,
} from '../reducers/cars-reducer';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    }

    this.hadleToogleModal = this.hadleToogleModal.bind(this);
  }

  hadleToogleModal() {
    this.setState((prevState, props) => {
      return {
        modalIsOpen: !prevState.modalIsOpen
      }
    })
  }

  onCreateCar(car) {
    this.props.createCar(car);
    this.hadleToogleModal();
  }

  render() {
    const modalIsOpen = this.state.modalIsOpen;
    return (
      <div className="main-container">
        <MainHeader />
        <ToolBar 
          onClickNewCar={() => this.hadleToogleModal() }
        />
        <CarList />   
        {this.state.modalIsOpen &&
          <CarForm
            title="Cadastrar Veículo"
            onSubmit={(car) => this.onCreateCar(car) }
            initialValues={null}
            toogleModal={() => this.hadleToogleModal() }
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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
