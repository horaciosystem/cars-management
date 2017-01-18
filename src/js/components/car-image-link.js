import React, { Component } from 'react';

export default class CarImageLink extends Component {
  render() {        
    let LinkComponent = null;
    if (this.props.image) {
      LinkComponent = (props) => <ImageLink image={props.image} />
    } else {
      LinkComponent = (props) => <NoImage />
    }
     
    return (
      <LinkComponent {...this.props} />
    );
  }
}

function ImageLink(props) {
  return (
    <a href={props.image}>
      Imagem
    </a> 
  );
}

function NoImage(props) {
  return (
    <p>Sem foto</p>
  );
}