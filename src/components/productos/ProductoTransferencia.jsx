import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const ProductoTransferencia = ({
  transferirProducto, modalTransferencia
}) => {
  return (
    <>
      <Modal isOpen={modalTransferencia} toggle={transferirProducto} size='lg'>
        <ModalHeader>
          Transferir Producto
        </ModalHeader>
        <ModalBody>

          <label htmlFor="">Seleccione la tienda emisora</label>
          <input type="text" />
          <label htmlFor="">Seleccione la tienda receptora</label>
          <input type="text" />

          <label htmlFor="">Seleccione el producto</label>
          <input type="text" />
          <label htmlFor="">Seleccione la cantidad</label>
          <input type="text" />
        </ModalBody>
      </Modal>
    </>
  )
}

export default ProductoTransferencia