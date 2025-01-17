import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import bdAdmin from '../../../api/bdAdmin';
import { getAuthHeaders } from '../../../utility/auth/auth';
import { Card, Col, Row } from 'reactstrap';
import Detallesventa from '../../../components/ventas/listarVentas/Detallesventa';
const URL = "v1/ventas";
const DetallesVenta = () => {
    const id = useParams();
    const [data, setData] = useState()
    useEffect(() => {
        bdAdmin.get(`${URL}/${id.id}`, getAuthHeaders())
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

    console.log(data, "as")
    return (
        <>
            <Card className="p-1">
                <div className='d-flex justify-content-between align-items-center gap-2 '>
                    <div>
                        <h4 className='text-center'>Tipo factura:
                            {
                                data?.tipo_factura == 1 ?
                                    " Remisión"
                                    : data?.tipo_factura == 2 ?
                                        " Factura"
                                        : data?.tipo_factura == 3 ?
                                            " Cotización"
                                            : null
                            } - {data?.identificador}
                        </h4>
                    </div>
                    <div>
                        <button className='btn' style={{ backgroundColor: "red", color: "white" }}>
                            {
                                data?.tipo_factura == 1 ?
                                    "exportar Remisión"
                                    : data?.tipo_factura == 2 ?
                                        "Exportar Factura"
                                        : data?.tipo_factura == 3 ?
                                            "Exportar Cotización"
                                            : null
                            }
                        </button>
                    </div>

                </div>
                <Row>
                    <Col>
                        <p>Cliente: {data?.cliente?.nombre_completo} - {data?.cliente?.telefono}</p>
                        <p>Tienda: {data?.almacen?.nombre} - {data?.almacen?.direccion}</p>
                        <p>Vendedor: {data?.user?.name} - {data?.user?.phone}</p>
                    </Col>
                    <Col>
                        <p>Fecha: {data?.fecha}</p>
                        <p>Hora: {data?.hora}</p>
                    </Col>
                </Row>
            </Card>

            <Row>
                <Col sm="8">
                    <Card className="p-1">
                        <h4>Detalles:</h4>
                        <Row>
                            <Col><p style={{ fontWeight: "bold" }}>Item</p></Col>
                            <Col><p style={{ fontWeight: "bold" }}>Descripción</p></Col>
                            <Col><p style={{ fontWeight: "bold" }}>Cantidad</p></Col>
                            <Col><p style={{ fontWeight: "bold" }}>Precio suelto</p></Col>
                            <Col><p style={{ fontWeight: "bold" }}>Precio venta</p></Col>
                            <Col><p style={{ fontWeight: "bold" }}>Stock</p></Col>
                            <Col><p style={{ fontWeight: "bold" }}>Descuento</p></Col>
                            <Col><p style={{ fontWeight: "bold" }}>Total</p></Col>
                        </Row>
                        {
                            data?.detalles_venta?.map(detalle => (
                                <Detallesventa
                                    key={detalle.id}
                                    detalle={detalle}
                                />
                            ))
                        }
                    </Card>
                </Col>
                <Col sm="4">
                    <Card className="p-2">
                        <p>Importe: ${data?.importe}</p>
                        <p>Descuento: ${data?.descuento}</p>
                        <p>Sub total: ${data?.subTotal}</p>
                        <p>Iva: ${data?.iva}</p>
                        <p>Flete: ${data?.flete}</p>
                        <p>Total: ${data?.total}</p>
                    </Card>
                </Col>
            </Row >
        </>
    )
}

export default DetallesVenta