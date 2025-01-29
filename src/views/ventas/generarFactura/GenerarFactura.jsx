import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Table } from 'reactstrap';
import Select from 'react-select';
import { getAuthHeaders } from '../../../utility/auth/auth';
import bdAdmin from '../../../api/bdAdmin';
import Venta1 from '../../../components/ventas/generarFactura/Venta1';
import Venta2 from '../../../components/ventas/generarFactura/Venta2';
import Venta3 from '../../../components/ventas/generarFactura/Venta3';
import VentaCalculo from '../../../components/ventas/generarFactura/VentaCalculo';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DateUtils } from '../../../utility/DateUtils';
import VentaFactura from '../../../components/ventas/generarFactura/VentaFactura';
import VentaPago from '../../../components/ventas/generarFactura/VentaPago';
const MySwal = withReactContent(Swal);

const URLCLIENTES = '/v1/clientes';
const URLALMACEN = 'v1/almacen';
const URLPRODUCTO = 'v1/productos';
const URLVENTA = 'v1/ventas';
const URLUSERS = 'users';

const GenerarFactura = () => {
  const [cliente, setCliente] = useState('');
  const [almacen, setAlmacen] = useState('');
  const [item, setItem] = useState('');
  const [fecha, setFecha] = useState(DateUtils());
  const [user, setUser] = useState('');
  const [dataClientes, setDataClientes] = useState();
  const [dataAlmacen, setDataAlmacen] = useState();
  const [dataProductos, setDataProductos] = useState();
  const [dataUsers, setDataUsers] = useState();
  const [rows, setRows] = useState([]);
  const [importeTotal, setImporteTotal] = useState(0);
  const [tipoDocumento, setTipoDocumento] = useState("1")
  const [metodoPago, setMetodoPago] = useState({
    efectivo: "",
    tarjeta: "",
    deposito: ""
  });
  const [medioPago, setMedioPago] = useState({
    medio_pago: "",
    medio_pago_monto: ""
  })
  const [flete, setFlete] = useState(0)
  const [descuento, setDescuento] = useState(0)
  const [SubTotal, setSubTotal] = useState(0)
  const [iva, setIva] = useState(16)
  // Forms:
  const { handleSubmit, control, setValue, register, reset, formState: { errors } } = useForm();
  const defaultValues = {
    factura: '',
    descuento: '',
    puntos: '',
    regalo: '',
    remision: '',
    venta_credito: '',
    fecha: '',
    tipo_factura: "1",
    almacen_id: '',
    cliente_id: '',
    user_id: '',
    detalles: [{ item: '', cantidad_venta: 0, precio_unitario: 0 }]
  };

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

  const handleTipoDocumento = (selected) => {
    setTipoDocumento(selected.target.value)
    console.log(selected.target.value)
  }
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
    const precio_venta = mostrarPrecioVenta(selectedItem, selectCliente)
    let updatedRows
    if (repeatItem) {
      updatedRows = rows.map(row => {
        if (row.item === item.value) {
          return {
            ...row,
            cantidad_venta: Number(row.cantidad_venta) + 1,
            importe: (Number(row.cantidad_venta) + 1) * row.precio_venta,
          };
        }
        return row;
      });
      setRows(updatedRows);
    } else {
      const newItem = {
        item: selectedItem.item,
        descripcion: selectedItem.descripcion,
        precio_venta: precio_venta,
        cantidad_venta: 1,
        stock: selectedItem.stock,
        importe: precio_venta,
        precio_suelto: selectedItem.precioSuelto,
        descuento: 0,
        total_item: 0,
      };
      setRows([...rows, newItem]);
    }
  };
  
  useEffect(() => {    
    setImporteTotal(rows?.reduce((sum, valImp) => sum + (valImp.cantidad_venta * Number(valImp.precio_venta)), 0))
    setDescuento(rows?.reduce((sum, valDesc) => Number(sum) + Number(valDesc.descuento), 0))
  }, [rows])

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];  
    updatedRows[index][field] = value; 
    setRows(updatedRows);
  };
  const crearVenta = (data) => {
    bdAdmin.post(URLVENTA, data, getAuthHeaders())
      .then(res => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Venta creado",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => { });
  }
  const submit = (data) => {
    const descuentoVal = Number(descuento)
    const subtotalVal = Number(importeTotal?.toFixed(2) - descuentoVal)
    const fleteVal = Number(flete)
    data.medio_pago = medioPago.medio_pago
    data.medio_pago_monto = medioPago.medio_pago_monto
    data.tipo_factura = tipoDocumento
    data.cliente_id = cliente.value
    data.almacen_id = almacen.value
    data.detalles = rows
    data.importe = importeTotal
    data.descuento = descuentoVal
    data.subtotal = subtotalVal
    data.iva = iva
    data.flete = fleteVal
    data.total = Number(((iva / 100 * subtotalVal) + subtotalVal + (fleteVal)).toFixed(2))
    data.fecha = fecha
    data.hora = new Date().toLocaleTimeString();
    crearVenta(data);
  }

  return (
    <div style={{ fontSize: 12 }}>
      <form onSubmit={handleSubmit(submit)}>
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
                    {row.precio_venta}
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.cantidad_venta}
                      className='form-control'
                      onChange={(e) => handleRowChange(index, 'cantidad_venta', e.target.value)}
                    />
                  </td>
                  <td>           
                    {
                      row.precio_venta * row.cantidad_venta
                    }
                  </td>
                  <td>{row.precio_suelto}</td>
                  <td>
                    <input
                      type="number"
                      value={row.descuento}
                      className='form-control'
                      onChange={(e) => handleRowChange(index, 'descuento', e.target.value)}
                    />
                  </td>
                  <td>
                    {
                      row.precio_venta * row.cantidad_venta - row.descuento
                    }
                  </td>
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
          <Col sm="7">
            <Venta1
              setMetodoPago={setMetodoPago}
              metodoPago={metodoPago}
              setMedioPago={setMedioPago}
              register={register}
            />

            <Venta2
              userOptions={userOptions}
              handleUserChange={handleUserChange}
              register={register}
              user={user}
              errors={errors}
              handleTipoDocumento={handleTipoDocumento}
              tipoDocumento={tipoDocumento}
            />
            <Row className="border border-top-0 rounded p-1">
              <Col>
                {
                  tipoDocumento == 2 ?
                    <VentaFactura register={register} /> :
                    null
                }

              </Col>
              <Col>
                {
                  tipoDocumento == 1 || tipoDocumento == 2 ?
                    <VentaPago register={register} /> :
                    null
                }

              </Col>
            </Row>
            {/* <Venta3
              register={register}
            /> */}

          </Col>
          <Col sm="5">
            <VentaCalculo
              importeTotal={importeTotal}
              flete={flete}
              setFlete={setFlete}
              setDescuento={setDescuento}
              setIva={setIva}
              iva={iva}
              descuento={descuento}
              medioPago={medioPago}
            />
            <button className='btn btn-success m-2' type='submit'>Generar</button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default GenerarFactura;
