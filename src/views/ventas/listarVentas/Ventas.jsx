import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Input, Label, Row } from "reactstrap";
import bdAdmin from '../../../api/bdAdmin';
import { getAuthHeaders } from '../../../utility/auth/auth';
import TablaVentas from '../../../components/ventas/listarVentas/TablaVentas';
import { useNavigate } from 'react-router-dom'
import Select from 'react-select';

const URL = "v1/ventas";
const Ventas = () => {
  const [data, setData] = useState()
  const [search, setSearch] = useState();
  const [filter, setFilter] = useState();
  const [tipo, setTipo] = useState()
  const navigate = useNavigate()
  const [fechaInicio, setFechaInicio] = useState()
  const [fechaFin, setFechaFin] = useState()

  const handleChangeFechaInicio = (event) => {
    setFechaInicio(event.target.value)
  }

  const handleChangeFechaFin = (event) => {
    setFechaFin(event.target.value)
  }

  useEffect(() => {
    bdAdmin.get(`${URL}?tipo=${tipo?.value}&fecha-inicio=${fechaInicio ?? ""}&fecha-fin=${fechaFin ?? ""}`, getAuthHeaders())
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [tipo, fechaInicio, fechaFin])

  const handleFilter = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setFilter(
      data?.filter(
        (e) =>
          e?.cliente?.nombre_completo.toLowerCase()
            .indexOf(search?.toLowerCase()) !== -1
      )
    );
  }, [search]);

  const verDetalles = (id) => {
    navigate(`/ventas/venta-lista/${id}`)
  }

  // const tipoOptions = dataAlmacen?.map(option => ({
  //   value: option?.id,
  //   label: option?.nombre
  // }));
  const tipoOptions = [
    {
      value: 1,
      label: "Remisión"
    },
    {
      value: 2,
      label: "Factura"
    },
    {
      value: 3,
      label: "Cotización"
    },
  ]
  const handleTipoChange = (selected) => {
    setTipo(selected);
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
        <Col sm="2">
          <Label>
            Fecha Inicio
          </Label>
          <Input
            type='date'
            onChange={handleChangeFechaInicio}
          />
        </Col>
        <Col sm="2">
          <Label>
            Fecha Inicio
          </Label>
          <Input
            type='date'
            onChange={handleChangeFechaFin}
          />
        </Col>
        <Col sm="2">
          <label htmlFor="">Tipo Documento</label>
          <Select
            id="tipo"
            value={tipo}
            onChange={handleTipoChange}
            options={tipoOptions}
            isSearchable={true}
            placeholder="No especifica"
          />
        </Col>
      </Row>
      <Card className="mt-1">
        {tipo ?
          <h5 className='text-center my-2'>Lista de {tipo?.label}</h5>
          : null
        }

        <TablaVentas
          data={data}
          filter={filter}
          search={search}
          verDetalles={verDetalles}
        />
      </Card>

    </>
  )
}

export default Ventas