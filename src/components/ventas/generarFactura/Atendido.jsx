import React from 'react'
import { Col, Row } from 'reactstrap'

const Atendido = () => {
    return (
        <Row className="mt-1">
            <Col sm="3" className="d-flex">

                <label htmlFor="">Efectivo </label>
                <input type="text" className="form-control form-control-sm" />

            </Col>
            <Col sm="3" className="d-flex">
                <label htmlFor="">Tarjeta </label>
                <input type="text" className="form-control form-control-sm" />

            </Col>
            <Col sm="3" className="d-flex">
                <label htmlFor="">Deposito </label>
                <input type="text" className="form-control form-control-sm" />

            </Col>
            <Col sm="3" className="d-flex gap-2">
                <label htmlFor="">Deposito </label>
                <input type="text" className="form-control form-control-sm" />

            </Col>
     
        </Row>
    )
}

export default Atendido