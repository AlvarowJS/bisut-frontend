import React from 'react'
import { Col, Row } from 'reactstrap'
const VentaFactura = ({
    register
}) => {
    // S01 Sin Efectos Fiscales
    // G01 Adquisición de mercancías
    // G03 Gastos en general
    return (
        <>
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

        </>
    )
}

export default VentaFactura