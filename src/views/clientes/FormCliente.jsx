import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
const FormCliente = ({
    modal, toggle, handleSubmit, register, submit, toggleActualizacion, errors
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle || toggleActualizacion} size='lg'>
  <ModalHeader>
    Registrar Cliente
  </ModalHeader>
  <ModalBody>
    <form onSubmit={handleSubmit(submit)}>
      <div className='form-group my-2'>
        <label htmlFor="nombre_completo">Nombre completo</label>
        <input
          className="form-control"
          type="text"
          placeholder='Ingrese nombre completo'
          {...register('nombre_completo')}
        />
      </div>

      <div className='form-group my-2'>
        <label htmlFor="rfc">RFC</label>
        <input
          className="form-control"
          type="text"
          placeholder='Ingrese RFC'
          {...register('rfc')}
        />
      </div>

      <div className='form-group my-2'>
        <label htmlFor="direccion">Dirección</label>
        <input
          className="form-control"
          type="text"
          placeholder='Ingrese dirección'
          {...register('direccion')}
        />
      </div>

      <div className='form-group my-2'>
        <label htmlFor="colonia">Colonia</label>
        <input
          className="form-control"
          type="text"
          placeholder='Ingrese colonia'
          {...register('colonia')}
        />
      </div>

      <div className='form-group my-2'>
        <label htmlFor="delegacion">Delegación</label>
        <input
          className="form-control"
          type="text"
          placeholder='Ingrese delegación'
          {...register('delegacion')}
        />
      </div>

      <div className='form-group my-2'>
        <label htmlFor="estado">Estado</label>
        <input
          className="form-control"
          type="text"
          placeholder='Ingrese estado'
          {...register('estado')}
        />
      </div>

      <div className='form-group my-2'>
        <label htmlFor="cp">Código Postal</label>
        <input
          className="form-control"
          type="text"
          placeholder='Ingrese código postal'
          {...register('cp')}
        />
      </div>

      <div className='form-group my-2'>
        <label htmlFor="telefono">Teléfono</label>
        <input
          className="form-control"
          type="text"
          placeholder='Ingrese su número de celular'
          {...register('telefono')}
        />
      </div>

      <div className='form-group my-2'>
        <label htmlFor="limite_credito">Límite de Crédito</label>
        <input
          className="form-control"
          type="number"
          placeholder='Ingrese límite de crédito'
          {...register('limite_credito')}
        />
      </div>

      <div className='form-group my-2'>
        <label htmlFor="mail">Email</label>
        <input
          className="form-control"
          type="email"
          placeholder='Ingrese correo'
          {...register('mail')}
        />
      </div>

      <div className='form-group my-2'>
        <label htmlFor="fecha_nac">Fecha de Nacimiento</label>
        <input
          className="form-control"
          type="date"
          {...register('fecha_nac')}
        />
      </div>

      <button className='btn btn-primary mb-2'>Enviar</button>
    </form>
  </ModalBody>
</Modal>

  )
}

export default FormCliente