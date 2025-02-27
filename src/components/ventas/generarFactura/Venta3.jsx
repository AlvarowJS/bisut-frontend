import React from 'react'
import { Col, Row } from 'reactstrap'

const Venta3 = ({
    register
}) => {
    // S01 Sin Efectos Fiscales
    // G01 Adquisición de mercancías
    // G03 Gastos en general
    return (
        <Row className="border border-top-0 rounded p-1">
            <Col>
                <div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="modopago"
                            id="pue"
                            value="pue"
                            {...register('modo_pago')}
                        />
                        <label className="form-check-label" htmlFor="pue">
                            PUE (Pago en una sola exhibición)
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="modopago"
                            id="ppd"
                            value="ppd"
                            {...register('modo_pago')}
                        />
                        <label className="form-check-label" htmlFor="ppd">
                            PPD (Pago en parcialidades o diferido)
                        </label>
                    </div>
                </div>
                <div className='d-flex my-1'>
                    Uso CFDI
                    <select name="cfdi" id="cfdi" className='form-select form-select-sm' {...register('cfdi')}>
                        <option value="S01">S01</option>
                        <option value="G01">G01</option>
                        <option value="G03">G03</option>
                    </select>
                </div>
                <div>
                    <input type="checkbox" className="form-check-input" name="email" id="email" {...register('email')} /> Enviar Mail
                </div>
            </Col>
            <Col>
                <Row>
                    <Col>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="tipopago"
                                id="efectivo"
                                value="efectivo"
                                {...register("tipo_pago", { required: "Seleccione un método de pago" })}

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
                                {...register("tipo_pago", { required: "Seleccione un método de pago" })}

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
                                {...register("tipo_pago", { required: "Seleccione un método de pago" })}

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
                                {...register("tipo_pago", { required: "Seleccione un método de pago" })}

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
                                {...register("tipo_pago", { required: "Seleccione un método de pago" })}

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
                                {...register("tipo_pago", { required: "Seleccione un método de pago" })}

                            />
                            <label className="form-check-label" htmlFor="xdefinir">
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