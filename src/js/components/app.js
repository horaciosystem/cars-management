import React, { Component } from 'react';
import CarList from '../containers/car-list';
import ToolBar from '../containers/toolbar';
import MainHeader from '../components/main-header';

export default class App extends Component {
  render() {
    return (
      <div className="main-container">
        <MainHeader />
        <ToolBar />
        <CarList />
      </div>
    )
  }
}
