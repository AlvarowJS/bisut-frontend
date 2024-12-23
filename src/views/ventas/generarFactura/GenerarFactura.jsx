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
  const [importeTotal, setImporteTotal] = useState(0);
  const [metodoPago, setMetodoPago] = useState({
    efectivo: "",
    tarjeta: "",
    deposito: ""
  });

  useEffect(() => {
    bdAdmin.get(URLCLIENTES, getAuthHeaders())
      .then(res => { setDataClientes(res.data.data); })
      .catch((err) => { });
    bdAdmin.get(URLALMACEN, getAuthHeaders())
      .then((res) => { setDataAlmacen(res.data); })
      .catch((err) => { });

    bdAdmin.get(URLUSERS, getAuthHeaders())
      .then(res => { setDataUsers(res.data) })
      .catch((err) => { });
  }, []);

  useEffect(() => {
    bdAdmin.get(`${URLPRODUCTO}?tiendaId=${almacen.value}`, getAuthHeaders())
      .then((res) => { setDataProductos(res.data); })
      .catch((err) => { });
  }, [almacen])


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
  const mostrarPrecioVenta = (selectItem, selectCliente) => {
    switch (selectCliente) {
      case 1:
        return selectItem.precio1
        break;
      case 2:
        return selectItem.precio2
        break;
      case 3:
        return selectItem.precio3
        break;
      default:
        break;
    }
  }
  // Tabla:

  const handleAddRow = () => {
    const repeatItem = rows.find(row => row.item === item.value)
    const selectedItem = dataProductos.find(product => product.item === item.value);
    const selectCliente = dataClientes.find(client => client.id === cliente.value).tipo_venta;
    const precioVenta = mostrarPrecioVenta(selectedItem, selectCliente)
    let updatedRows
    if (repeatItem) {
      updatedRows = rows.map(row => {
        if (row.item === item.value) {
          return {
            ...row,
            cantidad: row.cantidad + 1,
            importe: (row.cantidad + 1) * row.precioVenta,
          };
        }
        return row;
      });
      setRows(updatedRows);
    } else {
      const newItem = {
        item: selectedItem.item,
        descripcion: selectedItem.descripcion,
        precioVenta: precioVenta,
        cantidad: 1,
        stock: selectedItem.stock,
        importe: precioVenta,
        precioSuelto: selectedItem.precioSuelto,
        descuento: 0,
        totalItem: 0,
      };
      setRows([...rows, newItem]);
    }
  };

  useEffect(() => {
    setImporteTotal(rows?.reduce((sum, valImp) => sum + valImp.importe, 0))
  }, [rows])


  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };


  return (
    <div style={{ fontSize: 12 }}>
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
          <Button className="mt-2" onClick={handleAddRow} >Agregar Item</Button>
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
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  {row.item}
                </td>
                <td>
                  {row.descripcion}
                </td>
                <td>
                  {row.precioVenta}
                </td>
                <td>
                  <input
                    type="number"
                    value={row.cantidad}
                    className='form-control'
                    onChange={(e) => handleRowChange(index, 'cantidad', e.target.value)}
                  />
                </td>
                <td>{row.importe}</td>
                <td>{row.precioSuelto}</td>
                <td>{row.descuento}</td>
                <td>{row.totalItem}</td>
                <td>{row.stock}</td>
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
      <Row>
        <Col sm="8">
          <Venta1
            setMetodoPago={setMetodoPago}
            metodoPago={metodoPago}
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
            importeTotal={importeTotal}
          />
        </Col>
      </Row>
    </div>
  );
};

export default GenerarFactura;
