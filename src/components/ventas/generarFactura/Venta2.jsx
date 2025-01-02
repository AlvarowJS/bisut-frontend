import React from 'react'
import { Col, Row } from 'reactstrap'
import Select from 'react-select';

const Venta2 = ({
    userOptions, handleUserChange, user, register
}) => {
    return (
        <Row className="border rounded p-1">

            <Col className="d-flex" sm="4">
                <label htmlFor="">Puntos </label>
                <input type="text" className="form-control form-control-sm" aria-label="Small" {...register('puntos')} />

            </Col>
            <Col sm="2">
                <input type="checkbox" className="form-check-input" {...register('regalo')} />
                Regalo
            </Col>
            <Col className="d-flex gap-2" sm="3">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="tipofactura"
                        id="remision"
                        value="remision"
                        {...register('tipo_factura')}
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
                        value="factura"
                        {...register('tipo_factura')}
                    />
                    <label className="form-check-label" htmlFor="factura">
                        Factura
                    </label>
                </div>
            </Col>
            <Col sm="3">
                <label>Atendido por: </label>
                <Select
                    id="user"
                    value={user}
                    onChange={handleUserChange}
                    options={userOptions}
                    isSearchable={true}
                    placeholder="No especifica"
                />
            </Col>
        </Row>
    )
}

export default Venta2