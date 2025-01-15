import React, { useEffect, useState } from 'react'
import { Button, Col, Input, Label, Row } from "reactstrap";
import bdAdmin from '../../../api/bdAdmin';
import { getAuthHeaders } from '../../../utility/auth/auth';
import TablaVentas from '../../../components/ventas/listarVentas/TablaVentas';
import { useNavigate } from 'react-router-dom'
const URL = "v1/ventas";
const Ventas = () => {
  const [data, setData] = useState()
  const [search, setSearch] = useState();
  const [filter, setFilter] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    bdAdmin.get(URL, getAuthHeaders())
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

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
      </Row>
      <TablaVentas
        data={data}
        filter={filter}
        search={search}
        verDetalles={verDetalles}
      />

    </>
  )
}

export default Ventas