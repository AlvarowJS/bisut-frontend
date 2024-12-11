import React from 'react'
import { Col, Row } from 'reactstrap'
import Select from 'react-select';

const Venta2 = ({
    userOptions, handleUserChange, user
}) => {
    return (
        <Row className="border border-secondary rounded p-1">
            <Col className="d-flex">

                <label htmlFor="">%Desc. </label>
                <input type="text" className="form-control form-control-sm" />

            </Col>
            <Col className="d-flex">
                <label htmlFor="">Puntos </label>
                <input type="text" className="form-control form-control-sm" />

            </Col>
            <Col>
                <input type="checkbox" className="form-check-input" />
                Regalo
            </Col>
            <Col className="d-flex gap-2">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="tipofactura"
                        id="remision"
                    />
                    <label className="form-check-label" htmlFor="remision">
                        Remisión
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="tipofactura"
                        id="factura"
                    />
                    <label className="form-check-label" htmlFor="factura">
                        Factura
                    </label>
                </div>
            </Col>
            <Col>
                <input type="checkbox" className="form-check-input" />
                Venta Credito
            </Col>
            <label>Atendido</label>
            <Select
                id="user"
                value={user}
                onChange={handleUserChange}
                options={userOptions}
                isSearchable={true}
                placeholder="No especifica"
            />
        </Row>
    )
}

export default Venta2