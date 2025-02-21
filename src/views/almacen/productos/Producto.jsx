import React, { useEffect, useState } from "react";
import { Button, Col, Input, Label, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from 'react-select';
const MySwal = withReactContent(Swal);
import bdAdmin from "../../../api/bdAdmin";
import ProductoTable from "./ProductoTable";
import ProductoForm from "./ProductoForm";
import ProductoTransferencia from "../../../components/productos/ProductoTransferencia";
import useHandleRows from "../../../utility/hooks/useHandleRows";
import { getAuthHeaders } from "../../../utility/auth/auth";
import productosDefault from "../../../utility/constants/productosDefault";
import { DateUtils } from "../../../utility/DateUtils";
const URL = "v1/productos";
const URLFOTO = "v1/producto-foto";
const URLFAMILIA = "v1/familias";
const URLGRUPO = "v1/grupos";
const URLMARCA = "v1/marcas";
const URLALMACEN = 'v1/almacen';

const Producto = () => {
  // const { productos, filter, search, handleFilter } = useHandleRows()
  const [almacenEmisor, setAlmacenEmisor] = useState()
  const [almacenReceptor, setAlmacenReceptor] = useState()
  const [fecha, setFecha] = useState(DateUtils())
  const [refresh, setRefresh] = useState(false);
  const { rows, setRows, handleAddRow, handleRowChange,
    productoOptions, item, handleItemChange,
    productos, filter, search, handleFilter, submitTransferencia } = useHandleRows(almacenEmisor, almacenReceptor, fecha, refresh)
  const [modal, setModal] = useState(false);
  const [modalTransferencia, setModalTransferencia] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  // get for selects 
  const [dataFamilia, setDataFamilia] = useState()
  const [dataGrupo, setDataGrupo] = useState()
  const [dataMarca, setDataMarca] = useState()
  // Fotos
  const [foto, setFoto] = useState()
  
  const toggle = () => {
    setActualizacion(false);
    reset(productosDefault);
    setModal(!modal);
  };

  const toggleActualizacion = () => {
    setModal(!modal);
  };


  const transferirProducto = () => {
    setModalTransferencia(!modalTransferencia)
  }
  useEffect(() => {
    bdAdmin.get(URLALMACEN, getAuthHeaders())
      .then(res => {
        setDataAlmacen(res.data)
      })
      .catch(err => { })
    bdAdmin.get(URLFAMILIA, getAuthHeaders())
      .then(res => {
        setDataFamilia(res.data)
        console.log(res.data)
      })
      .catch(err => { })
    bdAdmin.get(URLGRUPO, getAuthHeaders())
      .then(res => {
        setDataGrupo(res.data)
        console.log(res.data)
      })
      .catch(err => { })
    bdAdmin.get(URLMARCA, getAuthHeaders())
      .then(res => {
        console.log(res.data)
        setDataMarca(res.data)
      })
      .catch(err => { })
  }, [])

  const crearProducto = (data) => {

    const newData = new FormData()
    newData.append('item', data.item ?? "")
    newData.append('descripcion', data.descripcion ?? "")
    newData.append('precio1', data.precio1 ?? "")
    newData.append('precio2', data.precio2 ?? "")
    newData.append('precio3', data.precio3 ?? "")
    newData.append('precio4', data.precio4 ?? "")
    newData.append('precioUnitario', data.precioUnitario ?? "")
    newData.append('precioLista', data.precioLista ?? "")
    newData.append('precioSuelto', data.precioSuelto ?? "")
    newData.append('precioEspecial', data.precioEspecial ?? "")
    newData.append('piezasPaquete', data.piezasPaquete ?? "")
    newData.append('familia_id', data.familia_id ?? "")
    newData.append('grupo_id', data.grupo_id ?? "")
    newData.append('marca_id', data.marca_id ?? "")
    newData.append('minimo', data.minimo ?? "")
    newData.append('maximo', data.maximo ?? "")
    newData.append('foto', foto)

    bdAdmin
      .post(URL, newData, getAuthHeaders())
      .then((res) => {
        reset(productosDefault);
        toggle.call();
        setRefresh(!refresh);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Producto creado",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {

        Swal.fire({
          position: "center",
          icon: "error",
          title: "Contacte con soporte",
          showConfirmButton: false,
        });
      });
  };


  const actualizarProducto = (id, data) => {
    const newData = new FormData()
    newData.append('id', id ?? "")
    newData.append('item', data.item ?? "")
    newData.append('descripcion', data.descripcion ?? "")
    newData.append('precio1', data.precio1 ?? "")
    newData.append('precio2', data.precio2 ?? "")
    newData.append('precio3', data.precio3 ?? "")
    newData.append('precio4', data.precio4 ?? "")
    newData.append('precioUnitario', data.precioUnitario ?? "")
    newData.append('precioLista', data.precioLista ?? "")
    newData.append('precioSuelto', data.precioSuelto ?? "")
    newData.append('precioEspecial', data.precioEspecial ?? "")
    newData.append('piezasPaquete', data.piezasPaquete ?? "")
    newData.append('familia_id', data.familia_id ?? "")
    newData.append('grupo_id', data.grupo_id ?? "")
    newData.append('marca_id', data.marca_id ?? "")
    newData.append('minimo', data.minimo ?? "")
    newData.append('maximo', data.maximo ?? "")
    newData.append('foto', foto ?? "")
    bdAdmin
      .post(`${URLFOTO}`, newData, getAuthHeaders())
      .then((res) => {
        reset(productosDefault);
        toggle.call();
        setRefresh(!refresh);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Producto Actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Contacte con soporte",
          showConfirmButton: false,
        });
      });
  };
  const eliminarProducto = (id) => {
    return MySwal.fire({
      title: "¿Estás seguro de eliminar?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        bdAdmin
          .delete(`${URL}/${id}`, getAuthHeaders())
          .then((res) => {
            setRefresh(!refresh);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Producto Eliminado",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Contacte con soporte",
              showConfirmButton: false,
            });
          });
      }
    });
  };

  // Tomara los datos que tiene un registro
  const actualizarProductoId = (id) => {
    toggleActualizacion.call();
    setActualizacion(true);
    bdAdmin
      .get(`${URL}/${id}`, getAuthHeaders())
      .then((res) => {
        reset(res.data);
      })
      .catch((err) => null);
  };

  // Si es actualizacion llamara a actualizarPaciente pero si es false crear un Consultorio
  const submit = (data) => {
    if (actualizacion) {
      actualizarProducto(data.id, data);
    } else {
      crearProducto(data);
    }
  };
  return (
    <>

      <Row>
        <Col sm="6">
          <Label className="me-1" for="siniearch-input">
            Buscar
          </Label>
          <Input
            className="dataTable-filter"
            type="text"
            bsSize="sm"
            id="search-input"
            placeholder="buscar por producto"
            onChange={handleFilter}
          />
        </Col>
        <Col>
        </Col>
        <Col sm="2" className="mt-2">
          <Button onClick={transferirProducto} color="primary">
            Transferir Producto
          </Button>
        </Col>

        <Col sm="2" className="mt-2">
          <Button onClick={toggle} color="primary">
            + Agregar
          </Button>
        </Col>
      </Row>
      <ProductoTable
        data={productos}
        filter={filter}
        search={search}
        actualizarProductoId={actualizarProductoId}
        eliminarProducto={eliminarProducto}
      />
      <ProductoForm
        setFoto={setFoto}
        toggle={toggle}
        modal={modal}
        handleSubmit={handleSubmit}
        submit={submit}
        register={register}
        reset={reset}
        getAuthHeaders={getAuthHeaders}
        errors={errors}
        dataFamilia={dataFamilia}
        dataGrupo={dataGrupo}
        dataMarca={dataMarca}
      />

      <ProductoTransferencia
        modalTransferencia={modalTransferencia}
        transferirProducto={transferirProducto}
        rows={rows}
        setRows={setRows}
        handleAddRow={handleAddRow}
        handleRowChange={handleRowChange}
        productoOptions={productoOptions}
        item={item}
        handleItemChange={handleItemChange}
        almacenEmisor={almacenEmisor}
        almacenReceptor={almacenReceptor}
        setAlmacenEmisor={setAlmacenEmisor}
        setAlmacenReceptor={setAlmacenReceptor}
        submitTransferencia={submitTransferencia}
        setFecha={setFecha}
        fecha={fecha}
      />
    </>
  )
}

export default Producto