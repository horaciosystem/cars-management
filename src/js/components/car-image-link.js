import React, { Component } from 'react';

export default class CarImageLink extends Component {
  
  shouldComponentUpdate(nextProps, nextState) {
		return nextProps.image !== this.props.image;
	}

  render() {        
    const image = this.props.image;
     
    return (
      <div>
        {image 
          ? <a href={image} target="_blank"> Imagem </a> 
          : <p>Sem foto</p>}
      </div>
    );
  }
}