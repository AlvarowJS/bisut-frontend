import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const FormUsuario = ({
  modal, toggle, handleSubmit, register, submit, toggleActualizacion, errors,
  dataTiendas, dataRoles
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle || toggleActualizacion} size='lg'>
      <ModalHeader>
        Registrar Usuario
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <div className='form-group my-2'>
            <label htmlFor="">
              Nombre completo
            </label>
            <input
              className="form-control"
              type="text"
              placeholder='ingrese nombre completo'
              {...register('name')}
            />
          </div>

          <div className='form-group my-2'>
            <label htmlFor="">
              Teléfono
            </label>
            <input
              className="form-control"
              type="text"
              placeholder='Ingrese su número de celular'
              {...register('phone')}
            />
          </div>
          <div className='form-group my-2'>
            <label htmlFor="">
              ROL
            </label>
            <select className="form-select" id="role_id" {...register("role_id")}>              
              {
                dataRoles?.map(role => (
                  <option key={role?.id} value={role?.id}>{role?.name}</option>
                ))
              }
            </select>


          </div>
          <div className='form-group my-2'>
            <label htmlFor="">
              Tienda
            </label>
            <select className="form-select" id="almacen_id" {...register("almacen_id")}>              
              {
                dataTiendas?.map(almacen => (
                  <option key={almacen?.id} value={almacen?.id}>{almacen?.nombre}</option>
                ))
              }
            </select>
          </div>
          <div className='form-group my-2'>
            <label htmlFor="">
              Email
            </label>
            <input
              className="form-control"
              type="text"
              placeholder='ingrese correo'
              {...register('email')}
            />
          </div>
          <div className='form-group my-2'>
            <label htmlFor="">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              {...register('password', { required: true, minLength: 8 })}
            />
            {errors.password && errors.password.type === "required" && (
              <span className='text-warning'>Este campo es obligatorio</span>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <span className='text-warning'>La contraseña debe tener 8 caracteres como minimo</span>
            )}
          </div>
          <div className='form-group my-2'>
            <label htmlFor="">
              Estado
            </label>
            <select className="form-select" id="status" {...register('status')}  >
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
          </div>
          <button className='btn btn-primary mb-2'>Enviar</button>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default FormUsuario