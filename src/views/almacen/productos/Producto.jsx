import React, { useEffect, useState } from "react";
import { Button, Col, Input, Label, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import bdAdmin from "../../../api/bdAdmin";
import ProductoTable from "./ProductoTable";
import ProductoForm from "./ProductoForm";
const URL = "v1/productos";
const URLFOTO = "v1/producto-foto";
const URLFAMILIA = "v1/familias";
const URLGRUPO = "v1/grupos";
const URLMARCA = "v1/marcas";

const Producto = () => {
  const token = localStorage.getItem("accessToken");
  const [data, setData] = useState();
  const [search, setSearch] = useState();
  const [filter, setFilter] = useState();
  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const [refresh, setRefresh] = useState(false);
  // get for selects 
  const [dataFamilia, setDataFamilia] = useState()
  const [dataGrupo, setDataGrupo] = useState()
  const [dataMarca, setDataMarca] = useState()
  // Fotos
  const [foto, setFoto] = useState()

  const defaulValuesForm = {
    item: "",
    descripcion: "",
    precio1: "",
    precio2: "",
    precio3: "",
    precioUnitario: "",
    precioLista: "",
    precioSuelto: "",
    precioEspecial: "",
    piezasPaquete: "",
    foto: "",
    familia_id: "",
    grupo_id: "",
    marca_id: "",
    foto: ""
  };
  const getAuthHeaders = () => ({
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const toggle = () => {
    setActualizacion(false);
    reset(defaulValuesForm);
    setModal(!modal);
  };

  const toggleActualizacion = () => {
    setModal(!modal);
  };

  useEffect(() => {
    bdAdmin.get(URLFAMILIA, getAuthHeaders())
      .then(res => {
        setDataFamilia(res.data)
      })
      .catch(err => { })
    bdAdmin.get(URLGRUPO, getAuthHeaders())
      .then(res => {
        setDataGrupo(res.data)
      })
      .catch(err => { })
    bdAdmin.get(URLMARCA, getAuthHeaders())
      .then(res => {
        setDataMarca(res.data)
      })
      .catch(err => { })
  }, [])

  useEffect(() => {
    bdAdmin
      .get(`${URL}`, getAuthHeaders())
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => { });
  }, [refresh]);

  useEffect(() => {
    setFilter(
      data?.filter(
        (e) =>
          e?.item?.toLowerCase()
            .indexOf(search?.toLowerCase()) !== -1
      )
    );
  }, [search]);

  const handleFilter = (e) => {
    setSearch(e.target.value);
  };
  const crearProducto = (data) => {

    const newData = new FormData()
    newData.append('item', data.item)
    newData.append('descripcion', data.descripcion)
    newData.append('precio1', data.precio1)
    newData.append('precio2', data.precio2)
    newData.append('precio3', data.precio3)
    newData.append('precioUnitario', data.precioUnitario)
    newData.append('precioLista', data.precioLista)
    newData.append('precioSuelto', data.precioSuelto)
    newData.append('precioEspecial', data.precioEspecial)
    newData.append('piezasPaquete', data.piezasPaquete)
    newData.append('familia_id', data.familia_id)
    newData.append('grupo_id', data.familia_id)
    newData.append('marca_id', data.familia_id)
    newData.append('foto', foto)

    bdAdmin
      .post(URL, newData, getAuthHeaders())
      .then((res) => {
        reset(defaulValuesForm);
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
    newData.append('id', id)
    newData.append('item', data.item)
    newData.append('descripcion', data.descripcion)
    newData.append('precio1', data.precio1)
    newData.append('precio2', data.precio2)
    newData.append('precio3', data.precio3)
    newData.append('precioUnitario', data.precioUnitario)
    newData.append('precioLista', data.precioLista)
    newData.append('precioSuelto', data.precioSuelto)
    newData.append('precioEspecial', data.precioEspecial)
    newData.append('piezasPaquete', data.piezasPaquete)
    newData.append('familia_id', data.familia_id)
    newData.append('grupo_id', data.familia_id)
    newData.append('marca_id', data.familia_id)
    newData.append('foto', foto)
    bdAdmin
      .post(`${URLFOTO}`, newData, getAuthHeaders())
      .then((res) => {
        reset(defaulValuesForm);
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
          <Label className="me-1" for="search-input">
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
        <Col sm="4"></Col>

        <Col sm="2" className="mt-2">
          <Button onClick={toggle} color="primary">
            + Agregar
          </Button>
        </Col>
      </Row>
      <ProductoTable
        data={data}
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
    </>
  )
}

export default Producto