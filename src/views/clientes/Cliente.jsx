import React, { useState } from "react";
import TablaCliente from "./TablaCliente";
import FormCliente from "./FormCliente";
import ClientesDiasProximos from "./ClientesDiasProximos";
import { Button, Col, Input, Label, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import { useClientes } from "../../utility/hooks/useClientes";
import clientesDefault from "../../utility/constants/clientesDefaults";

const Cliente = () => {
  const {
    clientes,
    tipos,
    proxDays,
    search,
    setSearch,
    filteredClientes,
    createCliente,
    updateCliente,
    deleteCliente,
    getClientId
  } = useClientes();

  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const [show, setShow] = useState(true);

  const toggle = () => {
    
    setActualizacion(false);
    reset(clientesDefault);
    setModal(!modal);
  };

  const toggleActualizacion = () => {
    setActualizacion(true)
    setModal(!modal);
  };

  const handleFilter = (e) => setSearch(e.target.value);

  const actualizaClienteId = (id) => {
    
    getClientId(id, reset, toggleActualizacion)
  }

  const submit = (data) => {
    if (actualizacion) {
      updateCliente(data.id, data, reset, toggle);
    } else {
      createCliente(data, reset, toggle);
    }
  };


  return (
    <>
      <h2>Cumpleaños cercanos:</h2>
      <button className="btn btn-success my-1" onClick={() => setShow(!show)}>
        {show ? "Ocultar Cumpleaños" : "Mostrar Cumpleaños"}
      </button>

      {show && proxDays?.map((proxDay) => <ClientesDiasProximos proxDay={proxDay} key={proxDay.id} />)}

      <h2>Clientes:</h2>
      <Row className="mb-1">
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
          <Button color="primary" onClick={toggle}>+ Agregar</Button>
        </Col>
      </Row>

      <TablaCliente
        data={filteredClientes}
        eliminarCliente={deleteCliente}     
        actualizaClienteId={actualizaClienteId}
      />

      <FormCliente
        toggle={toggle}
        modal={modal}
        handleSubmit={handleSubmit}
        submit={submit}
        register={register}
        reset={reset}
        errors={errors}
        dataTipos={tipos}
      />
    </>
  );
};

export default Cliente;
