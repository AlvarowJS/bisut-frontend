import React from 'react'
import { Input, Modal, ModalBody, ModalHeader } from 'reactstrap'

const ComprasExcel = ({
    toggleExcel, modal, handleSubmit, submit, register, dataProveedor, dataAlmacen,
    setExcelFile
}) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setExcelFile(file)
    };
    return (
        <Modal isOpen={modal} toggle={toggleExcel} size='lg'>
            <ModalHeader>
                Subir Excel
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(submit)}>
                    <div className='form-group my-2'>
                        <label htmlFor="factura">Factura</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder='Ingrese número de factura'
                            {...register('factura')}
                            required
                        />
                    </div>

                    <div className='form-group my-2'>
                        <label htmlFor="fecha">Fecha</label>
                        <input
                            className="form-control"
                            type="date"
                            {...register('fecha')}
                            required
                        />
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="fecha">Proveedor</label>
                        <select className="form-select" id="proveedor_id" {...register("proveedor_id")}>
                            {
                                dataProveedor?.map(proveedor => (
                                    <option key={proveedor?.id} value={proveedor?.id}>{proveedor?.nombre}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="fecha">Tienda</label>
                        <select className="form-select" id="almacen_id" {...register("almacen_id")}>
                            {
                                dataAlmacen?.map(almacen => (
                                    <option key={almacen?.id} value={almacen?.id}>{almacen?.nombre}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="fecha">Subir Excel</label>
                        <Input
                            type="file"
                            {...register('archivo')}
                            onChange={handleFileChange}
                        />
                    </div>

                    <button className='btn btn-primary'>Enviar</button>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default ComprasExcel