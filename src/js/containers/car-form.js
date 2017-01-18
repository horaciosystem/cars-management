import React, { Component } from 'react';
import Modal from 'react-modal';
import { Field, reduxForm } from 'redux-form';

const renderInput = field => {
  const style = field.meta.error ? 'input is-small is-danger' : 'input is-small'
  return (
    <div>
      <input {...field.input} type={field.type} className={style} />
      {field.meta.touched && field.meta.error &&
        <span className="error">{field.meta.error}</span>}
    </div>
  )
};

const validate = values => {
  const errors = {}
  if (!values.codigo_empresa) {
    errors.codigo_empresa = 'Campo requirido';
  } else if (values.codigo_empresa < 0 || values.codigo_empresa > 999) {
    errors.codigo_empresa = 'Código inválido';
  }

  if (!values.grupo) {
    errors.grupo = 'Campo requirido';
  } else if (values.grupo.length != 5) {
    errors.grupo = 'Grupo inválido';
  }

  if (!values.alternativa) {
    errors.alternativa = 'Campo requirido';
  } else if (values.alternativa < 0 || values.alternativa > 99) {
    errors.alternativa = 'Alternativa inválida';
  }

  if (!values.mes_versao) {
    errors.mes_versao = 'Campo requirido';
  } else if (values.mes_versao < 1 || values.mes_versao > 12) {
    errors.mes_versao = 'Mês inválido';
  }

  if (!values.ano_versao) {
    errors.ano_versao = 'Campo requirido';
  } else if (values.ano_versao < 1111 || values.ano_versao > 9999) {
    errors.ano_versao = 'Ano inválido';
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
    this.state = {
      initialValues: this.props.initialValues
    }
  }

  onSubmit(form) {
    return this.props.onSubmit(form)
      .then(() => this.props._toogleModal());
  }

  render() {
    const { title, toogleModal, handleSubmit, modalIsOpen, error } = this.props;
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => toogleModal()}
        style={customStyles}
        contentLabel="Modal"
      >
       <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="username">Username</label>
          <Field
            name="username"                   // Specify field name
            component={renderInput}           // Specify render component above
            type="text"/>                     // "type" prop passed to renderInput
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <Field
            name="password"                   // Specify field name
            component={renderInput}           // Reuse same render component
            type="password"/>                 // "type" prop passed to renderInput
        </div>

        <button type="submit">Submit</button>
      </form>
    </Modal>
    );
  }
}

export default reduxForm({
  form: 'carForm'
})(CarForm);
