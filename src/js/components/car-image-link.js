import React, { Component } from 'react';

export default class CarImageLink extends Component {
  render() {
    const imagem = this.props.imagem;    
    return (
      {imagem &&      
        <a href={this.props.imagem}>
          Imagem
        </a>   
      : <p>Sem foto</p>
      }
    );
  }
}

function ImageLink(props) {
  return (
    <a href={this.props.imagem}>
      Imagem
    </a> 
  );
}

function NoImage(props) {
  return (
    
  );
}