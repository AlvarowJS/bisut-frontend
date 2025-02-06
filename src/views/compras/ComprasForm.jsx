import React from 'react'
import { Button, Col, Modal, ModalBody, ModalHeader, Row, Table } from 'reactstrap'
import Select from 'react-select'
const ComprasForm = ({
  modal, toggle, handleSubmit, register, submit, toggleActualizacion,
  errors, fields, dataProveedor, handleRowChange, handleAddRow, rows,
  dataProductos, handleAlmacenChange, almacenOptions, almacen, productoOptions,
  handleItemChange, item, importeTotal, fecha, handleFechaChange

}) => {

  return (
    <Modal isOpen={modal} toggle={toggle || toggleActualizacion} size='xl'>
      <ModalHeader>
        Registrar Compra
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <Row>
            <Col>
              <div className='form-group my-2'>
                <label htmlFor="factura">Factura</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder='Ingrese número de factura'
                  {...register('factura')}
                  required
                />
              </div>
            </Col>
            <Col>
              <div className='form-group my-2'>
                <label htmlFor="fecha">Fecha</label>
                <input
                  type='date'
                  className='form-control'
                  value={fecha}
                  onChange={handleFechaChange}
                  required
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='form-group my-2'>
                <label htmlFor="almacen_id">Almacén</label>
                <Select
                  id="almacen"
                  value={almacen}
                  onChange={handleAlmacenChange}
                  options={almacenOptions}
                  isSearchable={true}
                  placeholder="No especifica"
                />
              </div>
            </Col>
            <Col>
              <div className='form-group my-2'>
                <label htmlFor="proveedor_id">Proveedor</label>
                <select className="form-select" id="proveedor_id" {...register("proveedor_id")}>
                  {
                    dataProveedor?.map(proveedor => (
                      <option key={proveedor?.id} value={proveedor?.id}>{proveedor?.nombre}</option>
                    ))
                  }
                </select>
              </div>
            </Col>
          </Row>
          <h4>Detalles de la Compra</h4>
          <label>Item</label>
          <Row className="mb-2">
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
            <Col sm="2">
              <Button onClick={handleAddRow} >Agregar Item</Button>
            </Col>
            <Col sm="2">
              Importe Total: {importeTotal}
            </Col>
          </Row>
          <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '5px' }}>

            <Table striped className="mt-2">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Importe</th>
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
                    <td>
                      <input
                        type="number"
                        value={row.precio_suelto}
                        className='form-control'
                        onChange={(e) => handleRowChange(index, 'precio_suelto', e.target.value)}
                      />
                    </td>
                    <td>
                      {
                        row?.precio_suelto * row?.cantidad
                      }
                    </td>
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

          <div className='my-2 d-flex gap-2'>


            <button className='btn btn-primary'>Enviar</button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default ComprasForm
