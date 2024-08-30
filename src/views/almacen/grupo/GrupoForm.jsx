import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
const GrupoForm = ({
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
                            <label htmlFor="descripcion">Ingrese una Descripción</label>
                            <textarea
                                className="form-control"
                                placeholder='Ingrese una descripción'
                                {...register('descripcion')}
                                required
                            />
                        </div>

                        <button className='btn btn-primary mb-2'>Enviar</button>
                    </form>
                </ModalBody>
            </Modal>
        </>
    )
}

export default GrupoForm