import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
const ProveedorForm = ({
    modal, toggle, handleSubmit, register, submit, toggleActualizacion, errors
}) => {
    return (
        <>
            <Modal isOpen={modal} toggle={toggle || toggleActualizacion} size='lg'>
                <ModalHeader>
                    Registrar Grupo
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(submit)}>
                        <div className='form-group my-2'>
                            <label htmlFor="nombre">Ingrese Nombre</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder='Ingrese nombre completo'
                                {...register('nombre')}
                                required
                            />
                        </div>
                        <div className='form-group my-2'>
                            <label htmlFor="descripcion">Ingrese Telefono</label>
                            <input
                                className="form-control"
                                placeholder='Ingrese número de telefono'
                                {...register('telefono')}
                                required
                            />
                        </div>
                        <div className='form-group my-2'>
                            <label htmlFor="direccion">Ingrese Dirección</label>
                            <input
                                className="form-control"
                                placeholder='Ingrese la dirección del proveedor'
                                {...register('direccion')}
                                required
                            />
                        </div>
                        <div className='form-group my-2'>
                            <label htmlFor="codigo_postal">Ingrese el Código Postal</label>
                            <input
                                className="form-control"
                                placeholder='Ingrese el código postal'
                                {...register('codigo_postal')}
                                required
                            />
                        </div>
                        <div className='form-group my-2'>
                            <label htmlFor="descripcion">Ingrese Email</label>
                            <input
                                className="form-control"
                                placeholder='Ingrese una dirección de email'
                                {...register('mail')}
                                required
                            />
                        </div>
                        <div className='form-group my-2'>
                            <label htmlFor="descripcion">Estado</label>
                            <select className="form-select" id="tipo_cliente" {...register("estado")}>
                                <option value="1">Activo</option>
                                <option value="0">Desactivo</option>
                            </select>                           
                        </div>
                        <button className='btn btn-primary mb-2'>Enviar</button>
                    </form>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ProveedorForm