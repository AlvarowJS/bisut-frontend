import React from 'react'
import { Col, Row } from 'reactstrap'

const VentaCalculo = ({
    subtotal, totalDescuentos, setFlete, total, flete
}) => {
    return (
        <Row className="border border-secondary rounded mt-2 mx-1 p-1">
            <Col>
                <div>Importe {subtotal?.toFixed(2)}</div>
                <div>Descuento {totalDescuentos?.toFixed(2)}</div>
                <div>SubTotal {totalDescuentos?.toFixed(2)}</div>
                <div>% I.V.A. {totalDescuentos?.toFixed(2)}</div>
                <div>Flete:
                    <input
                        type='number'
                        value={flete}
                        onChange={(e) => setFlete(e.target.value)}
                    />
                </div>
                <div>Total: {total?.toFixed(2)}</div>
            </Col>
        </Row>
    )
}

export default VentaCalculo