import React from 'react'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import { Badge, Card } from 'reactstrap'
const ProductoTable = ({
  data, filter, search,
  actualizarProductoId, eliminarProducto
}) => {
  const almacenesNombres = Array.from(
    new Set(data?.flatMap(producto => Object.keys(producto.almacens || {})))
  );

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
      minWidth: '120px',
      maxWidth: '140px',
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
      // name: 'Descripción',
      name: (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
          Descripción
        </div>
      ),
      minWidth: '140px',
      maxWidth: '140px',
      selector: row => row?.descripcion,
      cell: row => {
        return (
          <>
            {row?.descripcion}
          </>
        )
      }
    },
    // Agregar dinámicamente columnas de almacenes
    ...almacenesNombres.map(nombreAlmacen => ({
      sortable: true,
      name: nombreAlmacen,
      minWidth: '100px',
      selector: row => row?.almacens?.[nombreAlmacen]?.stock || 0, // Si no hay stock, mostrar 0
      cell: row => <>{row?.almacens?.[nombreAlmacen]?.stock || 0}</>
    })),
    {
      sortable: true,
      name: (
        <div style={{
          writingMode: 'vertical-rl',
          textOrientation: 'downright',
          transform: 'rotate(180deg)',
        }}>
          Precio 1
        </div>
      ),
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
      name: (
        <div style={{
          writingMode: 'vertical-rl',
          textOrientation: 'downright',
          transform: 'rotate(180deg)',
        }}>
          Precio 2
        </div>
      ),
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
      name: (
        <div style={{
          writingMode: 'vertical-rl',
          textOrientation: 'downright',
          transform: 'rotate(180deg)',
        }}>
          Precio 3
        </div>
      ),
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
      name: (
        <div style={{
          writingMode: 'vertical-rl',
          textOrientation: 'downright',
          transform: 'rotate(180deg)',
        }}>
          Precio 4
        </div>
      ),
      minWidth: '25px',
      selector: row => row?.precio4,
      cell: row => {
        return (
          <>
            {row?.precio4}
          </>
        )
      }
    },
    {
      sortable: true,
      name: (
        <div style={{
          writingMode: 'vertical-rl',
          textOrientation: 'downright',
          transform: 'rotate(180deg)',
        }}>
          Piezas x Paquete
        </div>
      ),
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
      minWidth: '120px',
      maxWidth: '120px',
      selector: row => row?.foto,
      cell: row => {
        return (
          <>
            {
              row?.foto ? (
                <img src={
                  `https://bisut.tms2.nuvola7.com.mx/storage/productos/${row?.item}/${row?.foto}`
                }
                  width={100} height={100}
                  className='my-1'
                  alt="" />
              ) : ""
            }

          </>
        )
      }
    },
    {
      sortable: true,
      name: (
        <div style={{
          writingMode: 'vertical-rl',
          textOrientation: 'downright',
          transform: 'rotate(180deg)',
        }}>
          Marca
        </div>
      ),
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
      name: (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
          Acciones
        </div>
      ),
      allowOverflow: true,
      minWidth: '100px',
      maxWidth: '200px',
      cell: row => {
        return (
          <div className='d-flex gap-1 my-1'>

            <button className='btn btn-warning btn-sm'
              onClick={() => actualizarProductoId(row?.id)}
            >
              <Edit />
            </button>
            <button className='btn btn-sm' style={{ backgroundColor: '#DC3545', color: 'white' }}
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