import React from 'react'
import { Col, Row } from 'reactstrap'
import Select from 'react-select';

const Venta2 = ({
    userOptions, handleUserChange, user, register, errors
}) => {
    return (
        <Row className="border rounded p-1">

            <Col className="d-flex" sm="3">
                <label htmlFor="puntos">Puntos </label>
                <input type="text" className="form-control" {...register('puntos')} />
            </Col>
            <Col sm="2">
                <input type="checkbox" className="form-check-input" {...register('regalo')} />
                Regalo
            </Col>
            <Col className="d-flex gap-2" sm="7">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="tipofactura"
                        id="remision"
                        value="1"
                        {...register('tipo_factura', {
                            required: 'Debes elegir una opción',
                        })}
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
                        value="2"
                        {...register('tipo_factura')}
                    />
                    <label className="form-check-label" htmlFor="factura">
                        Factura
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="cotizacion"
                        id="factura"
                        value="3"
                        {...register('tipo_factura')}
                    />
                    <label className="form-check-label" htmlFor="cotizacion">
                        Cotización
                    </label>
                </div>
            </Col>

        </Row>
    )
}

export default Venta2