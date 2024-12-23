import React from 'react'
import { Col, Row } from 'reactstrap'

const VentaCalculo = ({
    importeTotal, flete
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
        <Row className="border border-secondary rounded mt-2 mx-1 p-1">
            <Col>
                <div>
                    Importe: {importeTotal?.toFixed(2)}
                </div>
                <div>Descuento </div>
                <div>SubTotal </div>
                <Row className='d-flex'>
                    <Col>
                        <label htmlFor="">% I.V.A.</label>
                    </Col>
                    <Col>
                        <input type="text" className='form-control form-control-sm' />
                    </Col>
                    <Col>
                        
                    </Col>
                </Row>
                <div>Flete:
                    <input
                        type='number'
                        value={flete}
                        className='form-control form-control-sm'
                        onChange={(e) => setFlete(e.target.value)}
                    />
                </div>
                <div>Total: {importeTotal?.toFixed(2)}</div>
            </Col>
        </Row>
    )
}

export default VentaCalculo