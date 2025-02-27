import React from 'react'
import { Col, Row } from 'reactstrap'

const VentaPago = ({
    register, errors
}) => {
    return (
        <div>
            <Row>
                <Col>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="tipopago"
                            id="efectivo"
                            value="efectivo"
                            {...register("tipo_pago", { required: "Selecciona un método de pago" })}
                        />
                        <label className="form-check-label" htmlFor="efectivo">
                            Efectivo
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="tipopago"
                            id="debito"
                            value="debito"
                            {...register("tipo_pago", { required: "Selecciona un método de pago" })}
                        />
                        <label className="form-check-label" htmlFor="debito">
                            Tarjeta debito
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="tipopago"
                            id="credito"
                            value="credito"
                            {...register("tipo_pago", { required: "Selecciona un método de pago" })}
                        />
                        <label className="form-check-label" htmlFor="credito">
                            Tarjeta credito
                        </label>
                    </div>
                </Col>
                <Col>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="tipopago"
                            id="transferencia"
                            value="transferencia"
                            {...register("tipo_pago", { required: "Selecciona un método de pago" })}
                        />
                        <label className="form-check-label" htmlFor="transferencia">
                            Transferencia
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="tipopago"
                            id="cheque"
                            value="cheque"
                            {...register("tipo_pago", { required: "Selecciona un método de pago" })}
                        />
                        <label className="form-check-label" htmlFor="cheque">
                            Cheque Nominativo
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="tipopago"
                            id="xdefinir"
                            value="xdefinir"
                            {...register("tipo_pago", { required: "Selecciona un método de pago" })}
                        />
                        <label className="form-check-label" htmlFor="xdefinir">
                            Por Definir
                        </label>
                    </div>
                    {errors.tipo_pago && <p className="text-warning">{errors.tipo_pago.message}</p>}

                </Col>
            </Row>
        </div>
    )
}

export default VentaPago