import React from 'react'
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
const FormCliente = ({
  modal, toggle, handleSubmit, register, submit, toggleActualizacion, errors, dataTipos
}) => {
  return (

    <Modal isOpen={modal} toggle={toggle || toggleActualizacion} size='lg'>
      <ModalHeader>
        Registrar Cliente
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <Row>
            <Col>
              <div className='form-group'>
                <label htmlFor="nombre_completo">Nombre completo</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder='Ingrese nombre completo'
                  {...register('nombre_completo')}
                />
              </div>
            </Col>
            <Col>
              <div className='form-group'>
                <label htmlFor="rfc">RFC</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder='Ingrese RFC'
                  {...register('rfc')}
                />
              </div>
            </Col>
          </Row>
          <Row className='my-2'>
            <Col>
              <div className='form-group'>
                <label htmlFor="direccion">Dirección</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder='Ingrese dirección'
                  {...register('direccion')}
                />
              </div>
            </Col>
            <Col>
              <div className='form-group'>
                <label htmlFor="colonia">Colonia</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder='Ingrese colonia'
                  {...register('colonia')}
                />
              </div>
            </Col>
            <Col>
              <div className='form-group'>
                <label htmlFor="delegacion">Delegación</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder='Ingrese delegación'
                  {...register('delegacion')}
                />
              </div>
            </Col>
            <Col>
              <div className='form-group'>
                <label htmlFor="estado">Estado</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder='Ingrese estado'
                  {...register('estado')}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='form-group'>
                <label htmlFor="cp">Código Postal</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder='Ingrese código postal'
                  {...register('cp')}
                />
              </div>
            </Col>
            <Col>
              <div className='form-group'>
                <label htmlFor="telefono">Teléfono</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder='Ingrese su número de celular'
                  {...register('telefono')}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='form-group my-2'>
                <label htmlFor="limite_credito">Límite de Crédito</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder='Ingrese límite de crédito'
                  {...register('limite_credito')}
                />
              </div>
            </Col>
            <Col>
              <div className='form-group my-2'>
                <label htmlFor="dias_credito">Días de Crédito</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder='Ingrese Diás de crédito'
                  {...register('dias_credito')}
                />
              </div>
            </Col>
            <Col>
              <div className='form-group my-2'>
                <label htmlFor="tipo_venta">Tipo de Venta</label>
                <select className='form-select' id='tipo_venta' {...register("tipo_venta")}>
                  <option value="1">Precio 1</option>
                  <option value="2">Precio 2</option>
                  <option value="3">Precio 3</option>
                </select>
              </div>
            </Col>
          </Row>

          <Row className='mb-2'>
            <Col>
              <div className='form-group'>
                <label htmlFor="mail">Email</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder='Ingrese correo'
                  {...register('mail')}
                />
              </div>
            </Col>
            <Col>
              <div className='form-group'>
                <label htmlFor="fecha_nac">Fecha de Nacimiento</label>
                <input
                  className="form-control"
                  type="date"
                  {...register('fecha_nac')}
                />
              </div>
            </Col>
            <Col>
              <div className='form-group'>
                <label htmlFor="fecha_nac">Tipo de Cliente</label>
                <select className='form-select' id='tipo_cliente_id' {...register("tipo_cliente_id")}>
                  {
                    dataTipos?.map(tipo => (
                      <option key={tipo?.id} value={tipo?.id}>{tipo?.nombre}</option>
                    ))
                  }
                </select>
              </div>
            </Col>
          </Row>
          <Row className="mb-1">
            <h4>Datos del contacto</h4>
            <Col>
              <div className='form-group'>
                <label htmlFor="contacto_nombre">Nombre</label>
                <input
                  className="form-control"
                  type="text"
                  {...register('contacto_nombre')}
                />
              </div>
            </Col>
            <Col>
              <div className='form-group'>
                <label htmlFor="contacto_telefono">Telefono</label>
                <input
                  className="form-control"
                  type="text"
                  {...register('contacto_telefono')}
                />
              </div>
            </Col>
            <Col>
              <div className='form-group'>
                <label htmlFor="contacto_email">Email</label>
                <input
                  className="form-control"
                  type="email"
                  {...register('contacto_email')}
                />
              </div>
            </Col>
          </Row>
          <button className='btn btn-primary mb-2'>Enviar</button>
        </form>
      </ModalBody>
    </Modal>

  )
}

export default FormCliente