import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import Select from 'react-select'
const ComprasForm = ({
  modal, toggle, handleSubmit, register, submit, toggleActualizacion,
  errors, fields, append, remove, dataProveedor, dataAlmacen, item, setItem,
  dataProductos, setValue, Controller, control
}) => {

  const handleChange = (selected) => {
    if (selected) {
      setValue(`detalles[${index}].item`, selected.value);
    }
  };

  const options = dataProductos?.map(option => ({
    value: option?.item,
    label: option?.item + ' ' + option?.descripcion
  }));
  return (
    <Modal isOpen={modal} toggle={toggle || toggleActualizacion} size='lg'>
      <ModalHeader>
        Registrar Compra
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
            <label htmlFor="almacen_id">Almacén</label>
            <select className="form-select" id="almacen_id" {...register("almacen_id")}>
              {
                dataAlmacen?.map(almacen => (
                  <option key={almacen?.id} value={almacen?.id}>{almacen?.nombre}</option>
                ))
              }
            </select>
          </div>

          <div className='form-group my-2'>
            <label htmlFor="proveedor_id">Proveedor</label>
            <select className="form-select" id="proveedor_id" {...register("proveedor_id")}>
              {
                dataProveedor?.map(proveedor => (
                  <option key={proveedor?.id} value={proveedor?.id}>{proveedor?.nombre}</option>
                ))
              }
            </select>
          </div>

          <h4>Detalles de la Compra</h4>

          {fields.map((field, index) => (
            <div key={field.id} className='d-flex gap-2'>
              <div className='form-group'>
                <label htmlFor={`detalles[${index}].item`}>Item</label>
                {/* Use Controller for Select */}
                <Controller
                  control={control}
                  name={`detalles[${index}].item`} // Register the item field
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={options}
                      value={options.find(c => c.value === value)} // set the selected value
                      onChange={(selectedOption) => onChange(selectedOption.value)} // update the value
                      isSearchable={true}
                      placeholder="Seleccione un producto"
                    />
                  )}
                />
              </div>

              <div className='form-group'>
                <label htmlFor={`detalles[${index}].cantidad`}>Cantidad</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder='Ingrese la cantidad'
                  {...register(`detalles[${index}].cantidad`)}
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor={`detalles[${index}].precio_unitario`}>Precio Unitario</label>
                <input
                  className="form-control"
                  type="number"
                  step="0.01"
                  placeholder='Ingrese el precio unitario'
                  {...register(`detalles[${index}].precio_unitario`)}
                  required
                />
              </div>
              <div className='form-group'>
                <button
                  type="button"
                  className="btn btn-danger mt-2"
                  onClick={() => remove(index)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <div className='my-2 d-flex gap-2'>
            <button type="button" className="btn btn-success" onClick={() => append({ item: '', cantidad: 0, precio_unitario: 0 })}>
              Agregar Detalle
            </button>

            <button className='btn btn-primary'>Enviar</button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default ComprasForm
