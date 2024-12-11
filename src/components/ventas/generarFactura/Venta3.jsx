import React from 'react'
import { Col, Row } from 'reactstrap'

const Venta3 = () => {
    return (
        <Row className="border border-secondary rounded p-1">
            <Col>
                <div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="pue"
                            id="pue"
                        />
                        <label className="form-check-label" htmlFor="pue">
                            PUE (Pago en una sola exhibición)
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="pue"
                            id="ppd"
                        />
                        <label className="form-check-label" htmlFor="ppd">
                            PPD (Pago en parcialidades o diferido)
                        </label>
                    </div>
                </div>
                <div>
                    Uso CFDI
                </div>
                <div>
                    <input type="checkbox" name="" id="" /> Enviar Mail
                </div>
            </Col>
            <Col>
                <Row>
                    <Col>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="tipofactura"
                                id="remision"
                            />
                            <label className="form-check-label" htmlFor="remision">
                                Efectivo
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
                                Tarjeta debito
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="tipofactura"
                                id="remision"
                            />
                            <label className="form-check-label" htmlFor="remision">
                                Tarjeta credito
                            </label>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="tipofactura"
                                id="factura"
                            />
                            <label className="form-check-label" htmlFor="factura">
                                Transferencia
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="tipofactura"
                                id="remision"
                            />
                            <label className="form-check-label" htmlFor="remision">
                                Cheque Nominativo
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
                                Por Definir
                            </label>
                        </div>
                    </Col>
                </Row>


            </Col>

        </Row>
    )
}

export default Venta3