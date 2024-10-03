import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import bdAdmin from '../../api/bdAdmin';
import { Col, Row } from 'reactstrap';
import CompraDetalleItem from './CompraDetalleItem';
const URL = "v1/compras"

const CompraDetalle = () => {
    const token = localStorage.getItem("accessToken");
    const id = useParams();
    const [data, setData] = useState()
    const getAuthHeaders = () => ({
        headers: {
            Authorization: "Bearer " + token,
        },
    });


    useEffect(() => {
        bdAdmin.get(`${URL}/${id.id}`, getAuthHeaders())
            .then(res => {
                setData(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])



    return (
        <div>
            <Row>
                <Col>
                    <h3>Factura: {data?.factura}</h3>
                </Col>
                <Col>
                    <h3>Tienda: {data?.almacen.nombre}</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Fecha: {data?.fecha}</p>

                    <p>Total: {data?.total}</p>
                </Col>
            </Row>
            <Row>
                <h4>
                    Detalles de compra:
                </h4>

                <Row>
                    <Col>
                        <p style={{ fontWeight: "bold" }}>
                            Item
                        </p>
                    </Col>

                    <Col>
                        <p style={{ fontWeight: "bold" }}>
                            Descripción
                        </p>
                    </Col>

                    <Col>
                        <p style={{ fontWeight: "bold" }}>
                            Cantidad
                        </p>
                    </Col>
                    <Col>
                        <p style={{ fontWeight: "bold" }}>
                            Precio Unitario
                        </p>
                    </Col>
                    <Col>
                        <p style={{ fontWeight: "bold" }}>
                            Total
                        </p>
                    </Col>
                    {/* <Col>
                        <p style={{ fontWeight: "bold" }}>
                            Cajas
                        </p>
                    </Col> */}
                </Row>
                <hr />
                {
                    data?.detalles_compra?.map(detalle => (
                        <CompraDetalleItem
                            key={detalle.id}
                            detalle={detalle}
                        />
                    ))
                }
            </Row>
        </div>
    )
}

export default CompraDetalle