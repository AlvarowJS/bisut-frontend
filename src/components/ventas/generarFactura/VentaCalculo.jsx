import React from 'react'
import { Col, Row } from 'reactstrap'

const VentaCalculo = ({
    importeTotal, flete, setFlete, setIva, iva, descuento, setDescuento, medioPago
}) => {

    return (
        <Row className="border rounded mt-2 mx-1 p-1">
            <Col>
                <Row className="d-flex flex-nowrap">
                    <Col sm="4"><label htmlFor="">Importe: </label></Col>
                    <Col sm="2" className="my-2"></Col>
                    <Col sm="1">$</Col>
                    <Col sm="5">{importeTotal?.toFixed(2)}</Col>
                </Row>
                <Row className="d-flex flex-nowrap">
                    <Col sm="4"><label htmlFor="">Descuento: </label></Col>
                    <Col sm="2" className="my-2"></Col>
                    <Col sm="1">$</Col>
                    <Col sm="5">
                        {descuento}
                    </Col>
                </Row>
                <Row className="d-flex flex-nowrap">
                    <Col sm="4"><label htmlFor="">SubTotal: </label></Col>
                    <Col sm="2" className="my-2"></Col>
                    <Col sm="1">$</Col>
                    <Col sm="5">
                        {importeTotal?.toFixed(2) - descuento}
                    </Col>
                </Row>
                <Row className="d-flex flex-nowrap">
                    <Col sm="4"><label htmlFor="">% I.V.A.</label></Col>
                    <Col sm="2" className="my-2"></Col>
                    <Col sm="1">%</Col>
                    <Col sm="3">
                        <input type="number" className='form-control form-control-sm' value={iva}
                            onChange={(e) => setIva(e.target.value)}
                        />
                    </Col>
                    <Col sm="2">
                        {(iva / 100 * (importeTotal.toFixed(2) - descuento)).toFixed(2)}
                    </Col>

                </Row>
                <Row className="d-flex flex-nowrap">
                    <Col sm="4">
                        Flete:
                    </Col>
                    <Col sm="2" className="my-2"></Col>
                    <Col sm="1">$</Col>
                    <Col sm="5">
                        <input
                            type='number'
                            value={flete}
                            className='form-control form-control-sm'
                            onChange={(e) => setFlete(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row className="d-flex flex-nowrap">
                    <Col sm="4"><label htmlFor="">Total: </label></Col>
                    <Col sm="2" className="my-2"></Col>
                    <Col sm="1">$</Col>
                    <Col sm="5">
                        {
                            (
                                (iva / 100 * Number(importeTotal - descuento)) +
                                (Number(importeTotal - descuento)) +
                                (Number(flete))
                            ).toFixed(2)
                        }
                    </Col>
                </Row>
                <Row className="d-flex flex-nowrap">
                    <Col sm="4"><label htmlFor="">Cambio: </label></Col>
                    <Col sm="2" className="my-2"></Col>
                    <Col sm="1">$</Col>
                    <Col sm="5">
                        {
                            (() => {
                                const resultado = (
                                    Number(medioPago?.medio_pago_monto)
                                ).toFixed(2) - (
                                    (iva / 100 * Number(importeTotal - descuento)) +
                                    (Number(importeTotal - descuento)) +
                                    (Number(flete))
                                ).toFixed(2);

                                return resultado >= 0 ? resultado : null;
                            })()
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default VentaCalculo