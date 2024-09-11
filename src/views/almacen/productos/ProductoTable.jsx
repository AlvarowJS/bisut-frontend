import React from 'react'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import { Badge, Card } from 'reactstrap'
const ProductoTable = ({
  data, filter, search,
  actualizarProductoId, eliminarProducto
}) => {

  const columns = [
    {
      sortable: true,
      name: 'ID',
      minWidth: '25px',
      maxWidth: '80px',
      selector: row => row?.id
    },
    {
      sortable: true,
      name: 'Item',
      minWidth: '25px',
      selector: row => row?.item,
      cell: row => {
        return (
          <>
            {row?.item}
          </>
        )
      }
    },
    {
      sortable: true,
      name: 'Descripción',
      minWidth: '50px',
      selector: row => row?.descripcion,
      cell: row => {
        return (
          <>
            {row?.descripcion}
          </>
        )
      }
    },
    {
      sortable: true,
      name: 'Precio 1',
      minWidth: '25px',
      selector: row => row?.precio1,
      cell: row => {
        return (
          <>
            {row?.precio1}
          </>
        )
      }
    },
    {
      sortable: true,
      name: 'Precio 2',
      minWidth: '25px',
      selector: row => row?.precio2,
      cell: row => {
        return (
          <>
            {row?.precio2}
          </>
        )
      }
    },
    {
      sortable: true,
      name: 'Precio 3',
      minWidth: '25px',
      selector: row => row?.precio3,
      cell: row => {
        return (
          <>
            {row?.precio3}
          </>
        )
      }
    },
    {
      sortable: true,
      name: 'Precio Unitario',
      minWidth: '25px',
      selector: row => row?.precioUnitario,
      cell: row => {
        return (
          <>
            {row?.precioUnitario}
          </>
        )
      }
    },
    {
      sortable: true,
      name: 'Precio Lista',
      minWidth: '25px',
      selector: row => row?.precioLista,
      cell: row => {
        return (
          <>
            {row?.precioLista}
          </>
        )
      }
    },
    {
      sortable: true,
      name: 'Precio Suelto',
      minWidth: '25px',
      selector: row => row?.precioSuelto,
      cell: row => {
        return (
          <>
            {row?.precioSuelto}
          </>
        )
      }
    },
    {
      sortable: true,
      name: 'Precio Especial',
      minWidth: '25px',
      selector: row => row?.precioEspecial,
      cell: row => {
        return (
          <>
            {row?.precioEspecial}
          </>
        )
      }
    },
    {
      sortable: true,
      name: 'Piezas x Paquete',
      minWidth: '25px',
      selector: row => row?.piezasPaquete,
      cell: row => {
        return (
          <>
            {row?.piezasPaquete}
          </>
        )
      }
    },
    {
      sortable: true,
      name: 'Foto',
      minWidth: '25px',
      selector: row => row?.foto,
      cell: row => {
        return (
          <>
            <img src={
              `https://bisut.tms2.nuvola7.com.mx/storage/productos/${row?.item}/${row?.foto}`
            }
            width={100} height={100}
            className='my-1'
            alt="" />
            {/* {row?.foto} */}
          </>
        )
      }
    },
    {
      sortable: true,
      name: 'Familia',
      minWidth: '25px',
      selector: row => row?.familia?.nombre,
      cell: row => {
        return (
          <>
            {row?.familia?.nombre}
          </>
        )
      }
    },
    {
      sortable: true,
      name: 'Grupo',
      minWidth: '25px',
      selector: row => row?.grupo?.nombre,
      cell: row => {
        return (
          <>
            {row?.grupo?.nombre}
          </>
        )
      }
    },
    {
      sortable: true,
      name: 'marca',
      minWidth: '25px',
      selector: row => row?.marca?.nombre,
      cell: row => {
        return (
          <>
            {row?.marca?.nombre}
          </>
        )
      }
    },
    {
      name: 'Acciones',
      sortable: true,
      allowOverflow: true,
      minWidth: '200px',
      maxWidth: '400px',
      cell: row => {
        return (
          <div className='d-flex gap-1 my-1'>

            <button className='btn btn-warning'
              onClick={() => actualizarProductoId(row?.id)}
            >
              <Edit />
            </button>
            <button className='btn' style={{ backgroundColor: '#DC3545', color: 'white' }}
              onClick={() => eliminarProducto(row?.id)}
            >
              <Trash />
            </button>
          </div>
        )
      }
    }
  ]
  return (
    <Card className='mt-2'>
      <DataTable
        noHeader
        pagination
        className='react-datatable'
        columns={columns}
        data={search ? filter : data}
      />
    </Card>
  )
}

export default ProductoTable