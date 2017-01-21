import React, { Component } from 'react';
import Modal from 'react-modal';
import { Field, reduxForm } from 'redux-form';

const renderInput = field => {
  const style = (field.meta.touched && field.meta.error) ? 'input is-danger' : 'input'
  return (
    <div>
      <input {...field.input} type={field.type} className={style} />
      {field.meta.touched && field.meta.error &&
        <span className="error">{field.meta.error}</span>}
    </div>
  )
};

const upper = value => value && value.toUpperCase();

const validate = values => {
  const errors = {}

  if (!values.placa) {
    errors.placa = 'Campo requirido';
  } 

  if (!values.marca) {
    errors.marca = 'Campo requirido';
  } 

  if (!values.modelo) {
    errors.modelo = 'Campo requirido';
  } 

  return errors;
}

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(10, 10, 10, 0.86)'
  },
  content : {
    top                   : '10%',
    left                  : '20%',
    right                 : '20%',
    bottom                : '10%',
  }
};

class CarForm extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit(form) {
    return this.props.onSubmit(form)
      .then(() => this.props._toogleModal());
  }

  render() {
    const { title, initialValues, toogleModal, handleSubmit, modalIsOpen, error } = this.props;
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => toogleModal()}
        style={customStyles}
        contentLabel="Modal"
      >
       <form
          onSubmit={handleSubmit}          
        >
        <header className="modal-card-head">
          <p className="modal-card-title">{ title }</p>
          <button type="submit" className="button is-primary save-button">
            Salvar
          </button>
          <a className="button is-primary is-inverted"
            onClick={toogleModal}>
            Cancel
          </a>
        </header>
        <section className="modal-card-body">
          {error &&
            <div className="columns">
              <div className="column is-12 notification is-danger">
                {error}
              </div>
            </div>
          }
          <div className="columns">
            <div className="column is-4">
              <label htmlFor="placa" className="label">Placa</label>
              <Field name="placa" component={renderInput} type="text" normalize={upper} />
            </div>
            <div className="column is-4">
              <label htmlFor="marca" className="label">Marca</label>
              <Field name="marca" component={renderInput} type="text" />
            </div>
            <div className="column is-4">
              <label htmlFor="modelo" className="label">Modelo</label>
              <Field name="modelo" component={renderInput} type="text"/>
            </div>
          </div>
          <div className="columns">
            <div className="column is-4">
              <label htmlFor="valor" className="label">Valor</label>
              <Field name="valor" component={renderInput} type="number" />
            </div>
            <div className="column is-4">
              <label htmlFor="combustivel" className="label">Combustível</label>
              <span className="select">
                <Field name="combustivel" component="select">                  
                  <option value="Flex">Flex</option>
                  <option value="Gasolina">Gasolina</option>
                  <option value="Alcool">Álcool</option>
                </Field>
              </span>              
            </div>
            <div className="column is-4">
              <label htmlFor="imagem" className="label">Imagem</label>
              <Field name="imagem" component={renderInput} type="text" />
            </div>
          </div>
        </section>
        </form>
    </Modal>
    );
  }
}

export default reduxForm({
  form: 'carForm',
  validate
})(CarForm);
