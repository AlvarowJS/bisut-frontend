import React, { useState } from 'react'
import { Button, Col, Modal, ModalBody, ModalHeader, Row, Table } from 'reactstrap'
import useAlmacen from '../../utility/hooks/useAlmacen'
import Select from 'react-select'
import useHandleRows from '../../utility/hooks/useHandleRows'

const ProductoTransferencia = ({
  transferirProducto, modalTransferencia, rows, setRows, handleAddRow,
  handleRowChange, productoOptions, item, handleItemChange,
  almacenEmisor, almacenReceptor, setAlmacenEmisor, setAlmacenReceptor,
  submitTransferencia, setFecha, fecha
}) => {
  const { almacenOptions } = useAlmacen()

  return (
    <>
      <Modal isOpen={modalTransferencia} toggle={transferirProducto} size='xl'>
        <ModalHeader>
          Transferir Producto
        </ModalHeader>
        <ModalBody>

          <Row>
            <Col>

              <div className='form-group my-2'>
                <label htmlFor="">Seleccione la tienda emisora</label>
                <Select
                  id="almacen"
                  value={almacenEmisor}
                  onChange={setAlmacenEmisor}
                  options={almacenOptions}
                  isSearchable={true}
                  placeholder="No especifica"
                />
              </div>
            </Col>
            <Col>

              <div className='form-group my-2'>
                <label htmlFor="">Seleccione la tienda receptora</label>
                <Select
                  id="almacen"
                  value={almacenReceptor}
                  onChange={setAlmacenReceptor}
                  options={almacenOptions}
                  isSearchable={true}
                  placeholder="No especifica"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <label htmlFor="">Fecha</label>
              <input
                type="date"
                onChange={(e) => setFecha(e.target.value)}
                value={fecha}
                className='form-control'

              />
            </Col>
          </Row>

          Productos:
          <Row>
            <Col sm="8">
              <Select
                id="item"
                value={item}
                onChange={handleItemChange}
                options={productoOptions}
                isSearchable={true}
                placeholder="No especifica"
              />
            </Col>
            <Col sm="4">
              <Button onClick={handleAddRow} >Agregar Item</Button>
            </Col>
          </Row>
          <div style={{ maxHeight: '800px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '5px' }}>

            <Table striped className="mt-2">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th>Tienda Emisor: {almacenEmisor?.label}</th>
                  <th>Tienda Receptor: {almacenReceptor?.label}</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {rows?.map((row, index) => (
                  <tr key={index}>
                    <td>
                      {row.item}
                    </td>
                    <td>
                      {row.descripcion}
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.cantidad}
                        className='form-control'
                        onChange={(e) => handleRowChange(index, 'cantidad', e.target.value)}
                      />
                    </td>
                    <td>{row.stockEmisor}</td>
                    <td>{row.stockReceptor}</td>
                    <td>
                      <Button color="danger" onClick={() => {
                        setRows(rows.filter((_, i) => i !== index));
                      }}>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <button onClick={() => submitTransferencia(transferirProducto, setAlmacenEmisor, setAlmacenReceptor)} className='btn btn-success my-2'>
            Transferir
          </button>
        </ModalBody>
      </Modal>
    </>
  )
}

export default ProductoTransferencia