import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Table } from 'reactstrap';
import Select from 'react-select';
import { getAuthHeaders } from '../../../utility/auth/auth';
import bdAdmin from '../../../api/bdAdmin';
import Extras from '../../../components/ventas/generarFactura/Extras';
import Atendido from '../../../components/ventas/generarFactura/Atendido';

const URLCLIENTES = '/v1/clientes';
const URLALMACEN = 'v1/almacen';
const URLPRODUCTO = 'v1/productos';

const GenerarFactura = () => {
  const [cliente, setCliente] = useState();
  const [almacen, setAlmacen] = useState();
  const [item, setItem] = useState('');
  const [fecha, setFecha] = useState('');
  const [dataClientes, setDataClientes] = useState();
  const [dataAlmacen, setDataAlmacen] = useState();
  const [dataProductos, setDataProductos] = useState();
  const [rows, setRows] = useState([]); // Estado para las filas de la tabla
  const [flete, setFlete] = useState(0); // Estado para el flete

  useEffect(() => {
    bdAdmin.get(URLCLIENTES, getAuthHeaders())
      .then(res => { setDataClientes(res.data.data); })
      .catch((err) => { });
    bdAdmin.get(URLALMACEN, getAuthHeaders())
      .then((res) => { setDataAlmacen(res.data); })
      .catch((err) => { });
    bdAdmin.get(URLPRODUCTO, getAuthHeaders())
      .then((res) => { setDataProductos(res.data); })
      .catch((err) => { });
  }, []);

  const clienteOptions = dataClientes?.map(option => ({
    value: option?.id,
    label: option?.nombre_completo
  }));

  const almacenOptions = dataAlmacen?.map(option => ({
    value: option?.id,
    label: option?.nombre
  }));

  const productoOptions = dataProductos?.map(option => ({
    value: option?.item,
    label: option?.item
  }));

  const handleAlmacenChange = (selected) => {
    setAlmacen(selected);
  };

  const handleClientChange = (selected) => {
    setCliente(selected);
  };

  const handleFechaChange = (event) => {
    setFecha(event.target.value);
  };

  const handleItemChange = (selected) => {
    setItem(selected);
  };

  const handleAddRow = () => {
    if (item) {
      const newRow = {
        item: item.value,
        descripcion: dataProductos.find(prod => prod.item === item.value)?.descripcion || '',
        precio_venta: dataProductos.find(prod => prod.item === item.value)?.precio1 || 0,
        cantidad: 1, // Cantidad por defecto
        importe: 0,
        caja: dataProductos.find(prod => prod.item === item.value)?.precioSuelto || 0,
        total_item: 0,
        precio_suelto: dataProductos.find(prod => prod.item === item.value)?.precioSuelto || 0,
        descuento: 0 // Inicialmente vacío
      };
      setRows([...rows, newRow]);
      setItem(''); // Limpiar la selección del ítem
    }
  };

  const handleQuantityChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].cantidad = value;
    updatedRows[index].importe = value * updatedRows[index].precio_venta; // Actualizar el importe
    updatedRows[index].total_item = updatedRows[index].importe - updatedRows[index].descuento; // Actualizar total item
    setRows(updatedRows);
  };

  const handleDiscountChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].descuento = value;
    updatedRows[index].total_item = updatedRows[index].importe - value; // Actualizar total item
    setRows(updatedRows);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index); // Filtrar la fila a eliminar
    setRows(updatedRows);
  };

  // Calcular subtotal, descuentos y total
  const calculateTotals = () => {
    const subtotal = rows.reduce((acc, row) => acc + row.importe, 0);
    const totalDescuentos = rows.reduce((acc, row) => acc + row.descuento, 0);
    const total = subtotal - totalDescuentos + parseFloat(flete || 0); // Total con flete incluido
    return { subtotal, totalDescuentos, total };
  };

  const { subtotal, totalDescuentos, total } = calculateTotals();

  return (
    <>
      <Row>
        <Col>
          <label htmlFor="">Seleccionar cliente</label>
          <Select
            id="cliente"
            value={cliente}
            onChange={handleClientChange}
            options={clienteOptions}
            isSearchable={true}
            placeholder="No especifica"
          />
        </Col>
        <Col>
          <label htmlFor="">Seleccionar Tienda</label>
          <Select
            id="almacen"
            value={almacen}
            onChange={handleAlmacenChange}
            options={almacenOptions}
            isSearchable={true}
            placeholder="No especifica"
          />
        </Col>
        <Col>
          <label>Item</label>
          <Select
            id="item"
            value={item}
            onChange={handleItemChange}
            options={productoOptions}
            isSearchable={true}
            placeholder="No especifica"
          />
        </Col>
        <Col>
          <Button className="mt-2" onClick={handleAddRow}>Agregar Item</Button>
        </Col>
        <Col>
          <div className='form-group'>
            <label>Fecha</label>
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

      {/* Tabla para mostrar los ítems */}
      <Table striped className="mt-2">
        <thead>
          <tr>
            <th>Item</th>
            <th>Descripción</th>
            <th>Precio Venta</th>
            <th>Cantidad</th>
            <th>Importe</th>
            <th>Precio Suelto</th>
            <th>Descuento</th>
            <th>Total Item</th>
            <th>Acciones</th> {/* Columna para las acciones */}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.item}</td>
              <td>{row.descripcion}</td>
              <td>{row.precio_venta}</td>
              <td>
                <input
                  type='number'
                  value={row.cantidad}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  min='1'
                />
              </td>
              <td>{row.importe}</td>
              <td>{row.caja}</td>
              <td>
                <input
                  type='number'
                  value={row.descuento}
                  onChange={(e) => handleDiscountChange(index, e.target.value)}
                />
              </td>
              <td>{row.total_item}</td>
              <td>
                <Button color="danger" onClick={() => handleDeleteRow(index)}>Eliminar</Button> {/* Botón eliminar */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <Extras
    
      />

      <Atendido
      
      />
      <Row className="mt-3">
        <Col sm="8">
        </Col>
        <Col sm="4">
          <div>Subtotal: {subtotal?.toFixed(2)}</div>
          <div>Descuento: {totalDescuentos?.toFixed(2)}</div>
          <div>Flete:
            <input
              type='number'
              value={flete}
              onChange={(e) => setFlete(e.target.value)}
            />
          </div>
          <div>Total: {total?.toFixed(2)}</div>
        </Col>
      </Row>
    </>
  );
};

export default GenerarFactura;
