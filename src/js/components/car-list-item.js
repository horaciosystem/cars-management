import React, { Component } from 'react';
import CarImageLink from './car-image-link';

export default class CarListItem extends Component {
  render() {
    const {car, onEdit, onDelete} = this.props;
    const {
      placa, modelo, marca,
      imagem, combustivel, valor      
    } = car;

    return(
      <tr className="foo">
        <td>{placa}</td>
        <td>{modelo}</td>
        <td>{marca}</td>
        <td>
          <CarImageLink image={imagem} />
        </td>
        <td>{combustivel}</td>
        <td>{valor}</td>
        <td>
          <div className="car-item-buttons">
            <a onClick={() => onEdit(car)}>
              Editar
            </a>                          
            <a onClick={() => onDelete(car.id)}>
              Excluir
            </a>
          </div>
        </td>
      </tr>
    );
  }
}