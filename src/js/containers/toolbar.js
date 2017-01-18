import React, { Component } from 'react'

export default class Toolbar extends Component {
    constructor(props) {
    	super(props);
    }

		render() {
			return ( 
				<div className="toolbar">
					<div>					
						<button 
							className="button is-primary"
							onClick={() => this.props.onClickNewCar() }
						>
							Novo Carro
						</button>
					</div>
					<div>
						<input className="input" type="text" placeholder="Pesquisar" />
					</div>
				</div>	
			);
		}

}