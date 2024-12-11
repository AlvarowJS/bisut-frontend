import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Table } from 'reactstrap';
import Select from 'react-select';
import { getAuthHeaders } from '../../../utility/auth/auth';
import bdAdmin from '../../../api/bdAdmin';
import Venta1 from '../../../components/ventas/generarFactura/Venta1';
import Venta2 from '../../../components/ventas/generarFactura/Venta2';
import Venta3 from '../../../components/ventas/generarFactura/Venta3';
import VentaCalculo from '../../../components/ventas/generarFactura/VentaCalculo';

const URLCLIENTES = '/v1/clientes';
const URLALMACEN = 'v1/almacen';
const URLPRODUCTO = 'v1/productos';
const URLUSERS = 'users';

const GenerarFactura = () => {
  const [cliente, setCliente] = useState('');
  const [almacen, setAlmacen] = useState('');
  const [item, setItem] = useState('');
  const [fecha, setFecha] = useState('');
  const [user, setUser] = useState('');
  const [dataClientes, setDataClientes] = useState();
  const [dataAlmacen, setDataAlmacen] = useState();
  const [dataProductos, setDataProductos] = useState();
  const [dataUsers, setDataUsers] = useState();
  const [rows, setRows] = useState([]);
  const [flete, setFlete] = useState(0);

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
    bdAdmin.get(URLUSERS, getAuthHeaders())
      .then(res => { setDataUsers(res.data) })
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

  const userOptions = dataUsers?.map(option => ({
    value: option?.id,
    label: option?.name
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

  const handleUserChange = (selected) => {
    setUser(selected);
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

  const calculateTotals = () => {
    const subtotal = rows.reduce((acc, row) => acc + row.importe, 0);
    const totalDescuentos = rows.reduce((acc, row) => acc + row.descuento, 0);
    const total = subtotal - totalDescuentos + parseFloat(flete || 0); // Total con flete incluido
    return { subtotal, totalDescuentos, total };
  };

  const { subtotal, totalDescuentos, total } = calculateTotals();

  return (
    <div style={{fontSize: 12}}>
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
      <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '5px' }}>

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
              <th>Acciones</th>
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
      </div>
      <Row>
        <Col sm="8">
          <Venta1

          />

          <Venta2
            userOptions={userOptions}
            handleUserChange={handleUserChange}
            user={user}
          />
          <Venta3

          />

        </Col>
        <Col sm="4">
          <VentaCalculo
            subtotal={subtotal}
            totalDescuentos={totalDescuentos}
            setFlete={setFlete}
            total={total}
            flete={flete}
          />
        </Col>
      </Row>
    </div>
  );
};

export default GenerarFactura;
