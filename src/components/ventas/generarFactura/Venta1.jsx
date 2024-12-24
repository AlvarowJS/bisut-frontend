import React from 'react'
import { Col, Row } from 'reactstrap'

const Venta1 = ({
    setMetodoPago, metodoPago, register,setMedioPago
}) => {
    const handleInputChange = (name, value) => {
        // Limpia todos los inputs excepto el que se está editando
        setMetodoPago({
            efectivo: name === "efectivo" ? value : "",
            tarjeta: name === "tarjeta" ? value : "",
            deposito: name === "deposito" ? value : ""
        });
        setMedioPago({
            medio_pago: name,
            medio_pago_monto: value
        })
        console.log(name, value, "sad")
        
        
    };

    return (
        <Row className="border border-bottom-0 rounded mt-2 p-1">
            <Col sm="3" className="d-flex">
                <label htmlFor="efectivo">Efectivo </label>
                <input
                    type="text"
                    className="form-control form-control-sm"
                    value={metodoPago.efectivo}                    
                    onChange={(e) => handleInputChange("efectivo", e.target.value)}
                />
            </Col>
            <Col sm="3" className="d-flex">
                <label htmlFor="tarjeta">Tarjeta </label>
                <input
                    type="text"
                    className="form-control form-control-sm"
                    value={metodoPago.tarjeta}
                    onChange={(e) => handleInputChange("tarjeta", e.target.value)}
                />
            </Col>
            <Col sm="3" className="d-flex">
                <label htmlFor="deposito">Depósito </label>
                <input
                    type="text"
                    className="form-control form-control-sm"
                    value={metodoPago.deposito}
                    onChange={(e) => handleInputChange("deposito", e.target.value)}
                />
            </Col>
        </Row>
    )
}

export default Venta1