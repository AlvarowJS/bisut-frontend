import React, { useState } from 'react'
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import Select from 'react-select';
const DocenaPiezaForm = ({
  modal, toggle, handleSubmit, submit, register,
  setProductoEmisor, setProductoReceptor, productoOptions, setAlmacen,
  productoEmisor, productoReceptor, almacen, almacenOptions,
  stock, productoSelect

}) => {
  const [cajas, setCajas] = useState(0);

  return (
    <Modal isOpen={modal} toggle={toggle} size='xl'>
      <ModalHeader>
        Convertidor de dozena a pieza
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <Row>
            <div>
              <label htmlFor="producto">Tienda o almacen</label>
              <Select
                id="almacen"
                value={almacen}
                onChange={setAlmacen}
                options={almacenOptions}
                isSearchable={true}
                placeholder="Seleccione una tienda"
              />
            </div>
          </Row>
          <Row>
            <Col>
              <div>
                <label htmlFor="docena">Producto en Cajas</label>
                <Select
                  id="almacen"
                  value={productoEmisor}
                  onChange={setProductoEmisor}
                  options={productoOptions}
                  isSearchable={true}
                  placeholder="Seleccione producto en caja"
                />

              </div>
            </Col>

            <Col>
              <div>
                <label htmlFor="pieza">Producto en Piezas</label>
                <Select
                  id="almacen"
                  value={productoReceptor}
                  onChange={setProductoReceptor}
                  options={productoOptions}
                  isSearchable={true}
                  placeholder="Seleccione producto por pieza"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                Stock: {stock}
              </div>
              <div>
                Cantidad x Caja: {productoSelect?.piezasPaquete}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <label htmlFor="precio">Cajas</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder='Ingrese precio'
                  {...register('cajas')}
                  onChange={(e) => setCajas(Number(e.target.value))}
                />
              </div>
            </Col>
            <Col>
              <div>
                <label htmlFor="precio">Piezas</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder='Ingrese precio'
                  // value={productoSelect.piezasPaquete * cajas}
                  value={(productoSelect?.piezasPaquete || 0) * cajas}

                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <button className="btn btn-primary mt-2" type="submit">
                Convertir
              </button>
            </Col>
          </Row>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default DocenaPiezaForm