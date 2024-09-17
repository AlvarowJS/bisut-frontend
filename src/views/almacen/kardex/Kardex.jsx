import React, { useEffect, useState } from 'react'
import KardexTable from './KardexTable'
import { Col, Input, Label, Row } from 'reactstrap'
import KardexForm from './KardexForm'
import bdAdmin from '../../../api/bdAdmin'
const URL = "v1/kardex"
const URLPRODUCTO = "v1/productos"
const URLTIENDA = "v1/almacen"

const Kardex = () => {
    const [search, setSearch] = useState()
    

    // Filters
    const [fechaInicio, setFechaInicio] = useState()
    const [fechaFin, setFechaFin] = useState()
    const [productoId, setProductoId] = useState()
    const [tiendaId, setTiendaId] = useState()

    // Datos
    const [data, setData] = useState()
    const [productos, setProductos] = useState()
    const [tiendas, setTiendas] = useState()

    const handleFilter = (e) => {
        setSearch(e.target.value);
    }

    // useEffect(() => {
    //     bdAdmin.get(`${URL}?producto${productoId}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&tienda${tiendaId}`)
    //         .then(res => res.data)
    //         .catch(err => console.log(err))
    // }, [])
    useEffect(() => {
        bdAdmin.get(URLPRODUCTO)
            .then(res => setProductos(res.data))
            .catch(err => console.log(err))

        bdAdmin.get(URLTIENDA)
            .then(res => setTiendas(res.data))
            .catch(err => console.log(err))
    }, [])
    

    const buscarKardex = () => {
        bdAdmin.get(`${URL}?producto${productoId}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&tienda${tiendaId}`)
            .then(res => res.data)
            .catch(err => console.log(err))
    }
    return (
        <>
            <h3>Kardex</h3>
            <Row>
                <Col sm="3">
                    Fecha Inicio 
                </Col>
                <Col sm="3">
                    Fecha Fin
                </Col>
                <Col sm="3">
                    Producto
                </Col>
                <Col sm="3">
                    Tienda
                </Col>

            </Row>
            <Row className="mb-2">
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

                </Col>
            </Row>
            <KardexTable
                data={data}
            // filter={filter}
            // search={search}

            />

        </>
    )
}

export default Kardex