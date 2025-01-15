import React from 'react'
import { Col, Row } from 'reactstrap'
const Detallesventa = ({
    detalle
}) => {
    return (
        <>
            <Row>
                <Col>
                    {detalle?.item}
                </Col>
                <Col>
                    {detalle?.descripcion}
                </Col>

                <Col>
                    {detalle?.cantidad_venta}
                </Col>
                <Col>
                    {detalle?.precio_suelto}
                </Col>
                <Col>
                    {detalle?.precio_venta}
                </Col>
                <Col>
                    {detalle?.stock}
                </Col>                
                <Col>
                    {detalle?.descuento}
                </Col>   
                <Col>
                    {detalle?.importe}
                </Col>   
            </Row>
            <hr />
        </>

    )
}

export default Detallesventa