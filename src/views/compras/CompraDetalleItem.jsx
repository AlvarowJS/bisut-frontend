import React from 'react'
import { Col, Row } from 'reactstrap'

const CompraDetalleItem = ({
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
                {detalle?.cantidad}
            </Col>
            <Col>
                {detalle?.precio_unitario}
            </Col>
            <Col>
                {detalle?.total}
            </Col>
            {/* <Col>
                {detalle?.cajas}
            </Col> */}
            
        </Row>
        <hr />
    </>
  )
}

export default CompraDetalleItem