import React, { Component } from 'react';
import CarList from '../containers/car-list';
import ToolBar from '../containers/toolbar';
import MainHeader from '../components/main-header';
import CarForm from '../containers/car-form';

export default class App extends Component {
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
            onSubmit={() => console.log('teste')}
            initialValues={null}
            toogleModal={() => this.hadleToogleModal() }
            modalIsOpen
          />          
        }
      </div>
    )
  }
}
