import React, { Component } from 'react';
import CarImageLink from './car-image-link';

export default class CarListItem extends Component {
  render() {
    const {
      placa, modelo, marca,
      imagem, combustivel, valor
    } = this.props.car;
    return(
      <tr>
        <td>{placa}</td>
        <td>{modelo}</td>
        <td>{marca}</td>
        <td>
          <CarImageLink image={imagem} />
        </td>
        <td>{combustivel}</td>
        <td>{valor}</td>
      </tr>
    );
  }
}