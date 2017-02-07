import React, { Component } from 'react'

export default class MainHeader extends Component {

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.text !== this.props.text;
	}

		render() {
			return ( 
				<div className="header">
					<h1 className="title">{this.props.text}</h1>
				</div>	
			);

		}

}