import React, { Component } from 'react';

export default class CarListItem extends Component {
  render() {
    const {
      placa, modelo, marca,
      foto, combustivel, valor
    } = this.props.car;
    return(
      <tr>
        <td>{placa}</td>
        <td>{modelo}</td>
        <td>{marca}</td>
        <td>{foto}</td>
        <td>{combustivel}</td>
        <td>{valor}</td>
      </tr>
    );
  }
}