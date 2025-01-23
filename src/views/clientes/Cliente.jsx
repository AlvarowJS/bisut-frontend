import React, { useEffect, useState } from 'react'
import TablaCliente from './TablaCliente'
import FormCliente from './FormCliente'
import bdAdmin from '../../api/bdAdmin'
import ClientesDiasProximos from './ClientesDiasProximos'
import { Button, Col, Input, Label, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
const URL = '/v1/clientes'
const URLTIPOS = '/v1/clientes-tipos'
const Cliente = () => {

  const [search, setSearch] = useState();
  const [data, setData] = useState()
  const [filter, setFilter] = useState();
  const [proxDays, setProxDays] = useState()
  const token = localStorage.getItem("accessToken");
  const [dataTipos, setDataTipos] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [actualizacion, setActualizacion] = useState(false);
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const [refresh, setRefresh] = useState(false);
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(true)

  const defaulValuesForm = {
    nombre_completo: "",
    rfc: "",
    direccion: "",
    colonia: "",
    delegacion: "",
    estado: "",
    cp: "",
    telefono: "",
    limite_credito: "",
    mail: "",
    fecha_nac: "",
    tipo_cliente: "",
    tipo_venta: "",
    dias_credito: "",
    contacto_nombre: "",
    contacto_telefono: "",
    contacto_email: "",
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
    bdAdmin.get(URL, getAuthHeaders())
      .then(
        res => {
          setData(res.data.data)
          setProxDays(res.data.upcoming)
        }
      )
  }, [refresh])

  useEffect(() => {
    bdAdmin.get(URLTIPOS, getAuthHeaders())
      .then(res => setDataTipos(res.data))
      .catch(err => {})
  }, [])
  

  useEffect(() => {
    setFilter(
      data?.filter(
        (e) =>
          e.nombre_completo.toLowerCase()
            .indexOf(search?.toLowerCase()) !== -1
      )
    );
  }, [search]);
  const handleFilter = (e) => {
    setSearch(e.target.value);
  };


  const crearCliente = (data) => {
    bdAdmin
      .post(URL, data, getAuthHeaders())
      .then((res) => {
        reset(defaulValuesForm);
        toggle.call();
        setRefresh(!refresh);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cliente creado",
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

  const actualizarCliente = (id, data) => {
    bdAdmin
      .put(`${URL}/${id}`, data, getAuthHeaders())
      .then((res) => {
        reset(defaulValuesForm);
        toggle.call();
        setRefresh(!refresh);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cliente Actualizado",
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

  const eliminarCliente = (id) => {
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
              title: "Cliente Eliminado",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {            
            Swal.fire({
              position: "center",
              icon: "error",
              title: err.response.data.message,
              showConfirmButton: false,
            });
          });
      }
    });
  };

  const actualizaClienteId = (id) => {
    toggleActualizacion.call();
    setActualizacion(true);
    bdAdmin
      .get(`${URL}/${id}`, getAuthHeaders())
      .then((res) => {
        console.log(res.data, "Ad")
        reset(res.data);
      })
      .catch((err) => null);
  };

  const submit = (data) => {
    if (actualizacion) {
      actualizarCliente(data.id, data);
    } else {
      crearCliente(data);
    }
  };

  const mostrarCumples = () => {
    setShow(!show)
  }

  return (
    <>
      <h2>
        Cumpleaños cercanos:
      </h2>
      
      
      <button
        className='btn btn-success my-1'
        onClick={mostrarCumples}
      >
        {
          show ? 'Ocultar Cumpleaños' : 'Mostras Cumpleaños'
        }
        
      </button>

      {
        show ? (
          proxDays?.map(proxDay => (
            <>
              <ClientesDiasProximos
                proxDay={proxDay}
              />
            </>
          ))
        ) : (
          null
        )
      }

      <h2>
        Clientes:
      </h2>
      <Row className='mb-1'>
        <Col sm="6">
          <Label className="me-1" for="search-input">
            Buscar
          </Label>
          <Input
            className="dataTable-filter"
            type="text"
            bsSize="sm"
            id="search-input"
            placeholder="buscar por nombre y apellidos"
            onChange={handleFilter}
          />
        </Col>
        <Col sm="4"></Col>

        <Col sm="2" className="mt-2">
          <Button color="primary" onClick={toggle}>

            + Agregar
          </Button>
        </Col>
      </Row>
      <TablaCliente
        data={data}
        search={search}
        filter={filter}
        actualizaClienteId={actualizaClienteId}
        eliminarCliente={eliminarCliente}
        
      />
      <FormCliente
        toggle={toggle}
        modal={modal}
        handleSubmit={handleSubmit}
        submit={submit}
        register={register}
        reset={reset}
        getAuthHeaders={getAuthHeaders}
        errors={errors}
        dataTipos={dataTipos}
      />
    </>
  )
}

export default Cliente