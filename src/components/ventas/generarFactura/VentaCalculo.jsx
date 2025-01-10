import React from 'react'
import { Col, Row } from 'reactstrap'

const VentaCalculo = ({
    importeTotal, flete, setFlete, setIva, iva, descuento, setDescuento
}) => {

    // ejemplo:
    // de la suma del importe son :
    // 100 pesos
    // el iva es 16%
    // flete lo puede ingresar a mano y serían por ejemplo 25 pesos
    // descuento se metería a mano 5 pesos
    // quedaría
    // 100
    // -5
    // 🟰95 pesos
    // *0.16
    // 🟰15.20
    // total sería 95+15.20🟰110.20 (fiscal)
    // Flete $25 grant total 🟰$135.20

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
            </Col>
        </Row>
    )
}

export default VentaCalculo