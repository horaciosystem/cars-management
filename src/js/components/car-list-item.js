import React, { Component } from 'react';
import CarImageLink from './car-image-link';
import { currency } from '../utils';

export default class CarListItem extends Component {

  shouldComponentUpdate(nextProps, nextState) {
		return nextProps.car !== this.props.car;
	}
  render() {
    const {car, onEdit, onDelete} = this.props;
    const {
      placa, modelo, marca,
      imagem, combustivel, valor      
    } = car.toJS();

    return(
      <tr className="car-list-item">
        <td>{placa}</td>
        <td>{modelo}</td>
        <td>{marca}</td>
        <td>
          <CarImageLink image={imagem} />
        </td>
        <td>{combustivel}</td>
        <td>{currency(valor)}</td>
        <td>
          <div className="car-item-buttons">
            <a onClick={() => onEdit(car)}>
              Editar
            </a>                          
            <a onClick={() => onDelete(car.get('id'))}>
              Excluir
            </a>
          </div>
        </td>
      </tr>
    );
  }
}