import React from 'react'
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
const ProductoForm = ({
  modal, toggle, handleSubmit, register, submit, toggleActualizacion, errors,
  dataFamilia, dataGrupo, dataMarca, setFoto
}) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFoto(file)
  };
  return (
    <>
      <Modal isOpen={modal} toggle={toggle || toggleActualizacion} size='xl'>
        <ModalHeader>
          Registrar Producto
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(submit)}>
            <div>
              <div className='form-group my-2'>
                <label htmlFor="item">Ingrese nombre del item</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder='Ingrese item completo'
                  {...register('item')}
                  required
                />
              </div>
              <div className='form-group my-2'>
                <label htmlFor="descripcion">Ingrese una Descripción</label>
                <textarea
                  className="form-control"
                  placeholder='Ingrese una descripción'
                  {...register('descripcion')}
                  required
                />
              </div>
            </div>
            <Row>
              <Col md={3} className='form-group'>
                <label htmlFor="precio1">Ingrese Precio 1</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder='Ingrese precio 1'
                  {...register('precio1')}
                  required
                />
              </Col>
              <Col md={3} className='form-group'>
                <label htmlFor="precio2">Ingrese Precio 2</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder='Ingrese precio 2'
                  {...register('precio2')}
                  required
                />
              </Col>
              <Col md={3} className='form-group'>
                <label htmlFor="precio3">Ingrese Precio 3</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder='Ingrese precio 3'
                  {...register('precio3')}
                  required
                />
              </Col>
              <Col md={3} className='form-group'>
                <label htmlFor="precio1">Ingrese Precio Unitario</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder='Ingrese precio unitario'
                  {...register('precioUnitario')}
                  required
                />
              </Col>
            </Row>

            <Row className='my-2'>

              <Col md={3} className='form-group'>
                <label htmlFor="precioLista">Ingrese Precio Lista</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder='Ingrese precio lista'
                  {...register('precioLista')}
                  required
                />
              </Col>
              <Col md={3} className='form-group'>
                <label htmlFor="precioSuelto">Ingrese Precio Suelto</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder='Ingrese precio suelto'
                  {...register('precioSuelto')}
                  required
                />
              </Col>
              <Col md={3} className='form-group'>
                <label htmlFor="precioEspecial">Ingrese Precio Especial</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder='Ingrese precio especial'
                  {...register('precioEspecial')}
                  required
                />
              </Col>
              <Col md={3} className='form-group'>
                <label htmlFor="piezasPaquete"> Piezas x Paquete</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder='Ingrese cuantas piezas x paquete'
                  {...register('piezasPaquete')}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="familia_id"> Familia</label>
                <select className="form-select" id="familia_id" {...register("familia_id")}>
                  <option key="" value="">Sin Familia</option>
                  {
                    dataFamilia?.map(familia => (
                      <option key={familia?.id} value={familia?.id}>{familia?.nombre}</option>
                    ))
                  }
                </select>
              </Col>
              <Col>
                <label htmlFor="grupo_id">Grupo</label>
                <select className="form-select" id="grupo_id" {...register("grupo_id")}>
                  <option key="" value="">Sin Grupo</option>
                  {
                    dataGrupo?.map(grupo => (
                      <option key={grupo?.id} value={grupo?.id}>{grupo?.nombre}</option>
                    ))
                  }
                </select>
              </Col>
              <Col>
                <label htmlFor="marca_id">Marca</label>
                <select className="form-select" id="marca_id" {...register("marca_id")}>
                  <option key="" value="">Sin marca</option>
                  {
                    dataMarca?.map(marca => (
                      <option key={marca?.id} value={marca?.id}>{marca?.nombre}</option>
                    ))
                  }
                </select>
              </Col>
            </Row>
            <Row className="my-2">
              <Col>
                <label htmlFor="piezasPaquete"> Foto del producto</label>
                <input
                  className="form-control"
                  type="file"
                  placeholder='Ingrese cuantas piezas x paquete'
                  {...register('foto')}
                  onChange={handleFileChange}
                />
              </Col>
            </Row>
            <button className='btn btn-primary mb-2'>Enviar</button>
          </form>
        </ModalBody>
      </Modal>
    </>
  )
}

export default ProductoForm