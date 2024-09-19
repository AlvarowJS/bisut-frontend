import React, { useEffect, useState } from 'react'
import KardexTable from './KardexTable'
import { Button, Col, Input, Label, Row } from 'reactstrap'
import KardexForm from './KardexForm'
import bdAdmin from '../../../api/bdAdmin'
import Select from "react-select";
const URL = "v1/kardex"
const URLPRODUCTO = "v1/productos"
const URLTIENDA = "v1/almacen"

const Kardex = () => {
    const [search, setSearch] = useState()

    // autorizacion
    const token = localStorage.getItem("accessToken");
    const getAuthHeaders = () => ({
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    // Filters
    const [fechaInicio, setFechaInicio] = useState()
    const [fechaFin, setFechaFin] = useState()
    const [productoId, setProductoId] = useState()
    const [tiendaId, setTiendaId] = useState()

    // Datos
    const [data, setData] = useState()
    const [productos, setProductos] = useState()
    const [tiendas, setTiendas] = useState()

    // Seleccionables
    const [producto, setProducto] = useState()
    const [tienda, setTienda] = useState()

    const handleFilter = (e) => {
        setSearch(e.target.value);
    }

    // useEffect(() => {
    //     bdAdmin.get(`${URL}?producto${productoId}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&tienda${tiendaId}`)
    //         .then(res => res.data)
    //         .catch(err => console.log(err))
    // }, [])

    const handleChallengeProducto = (selected) => {
        setProducto(selected)
        console.log(selected)
    }

    const handleChallengeTienda = (selected) => {
        setTienda(selected)
    }

    const handleChangeFechaInicio = (event) => {
        setFechaInicio(event.target.value)
    }

    const handleChangeFechaFin = (event) => {
        setFechaFin(event.target.value)
    }
    useEffect(() => {
        bdAdmin.get(URLPRODUCTO, getAuthHeaders())
            .then(res => setProductos(res.data))
            .catch(err => console.log(err))

        bdAdmin.get(URLTIENDA, getAuthHeaders())
            .then(res => setTiendas(res.data))
            .catch(err => console.log(err))
    }, [])

    const optionsProducto = productos?.map((option) => ({
        value: option?.id,
        label: option?.item + ' ' + option?.descripcion
    }))

    const optionsTienda = tiendas?.map((option) => ({
        value: option?.id,
        label: option?.nombre
    }))




    const buscarKardex = () => {
        bdAdmin.get(`${URL}?producto=${producto?.value ?? ''}&fechaInicio=${fechaInicio ?? ''}&fechaFin=${fechaFin ?? ''}&tienda=${tienda?.value ?? ''}`, getAuthHeaders())
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <h3>Kardex</h3>
            <Row>
                <Col sm="3">
                    <Label className="me-1" for="search-input">
                        Tienda
                    </Label>
                    <Select
                        id="tienda"
                        value={tienda}
                        onChange={handleChallengeTienda}
                        options={optionsTienda}
                        isSearchable={true}
                        placeholder="No especifica"
                    />
                </Col>
                <Col sm="3">
                    <Label className="me-1" for="search-input">
                        Producto
                    </Label>
                    <Select
                        id="producto"
                        value={producto}
                        onChange={handleChallengeProducto}
                        options={optionsProducto}
                        isSearchable={true}
                        placeholder="No especifica"
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
                    <Button style={{marginTop: 22}} color="warning" onClick={buscarKardex}>
                        Filtrar
                        </Button>
                </Col>
            </Row>
            {/* <Row className="mb-2">
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
            </Row> */}
            <KardexTable
                data={data}
            // filter={filter}
            // search={search}

            />

        </>
    )
}

export default Kardex