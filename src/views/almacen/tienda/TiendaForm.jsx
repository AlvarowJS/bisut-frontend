import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
const TiendaForm = ({
    modal, toggle, handleSubmit, register, submit, toggleActualizacion, errors
}) => {
    return (
        <Modal isOpen={modal} toggle={toggle || toggleActualizacion} size='lg'>
            <ModalHeader>
                Registrar Tienda
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
                        <label htmlFor="direccion">Ingrese la Dirección</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder='Ingrese la dirección'
                            {...register('direccion')}
                            required
                        />
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="telefono">Ingrese el Teléfono</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder='Ingrese el telefono'
                            {...register('telefono')}
                            required
                        />
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="tipo">Ingrese el tipo</label>
                        <select className="form-select" id="tipo" {...register("tipo")}>
                            <option value="1">Tienda</option>
                            <option value="0">Bodega</option>
                        </select>
                    </div>

                    <button className='btn btn-primary mb-2'>Enviar</button>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default TiendaForm