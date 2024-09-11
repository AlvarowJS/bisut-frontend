import React from 'react'
import { Card } from "reactstrap";
import DataTable from "react-data-table-component";
import { Edit, Trash } from 'react-feather';
const ComprasTable = ({
  data, filter, search, actualizarCompraId, eliminarCompra
}) => {

  const columns = [
    {
      sortable: true,
      name: "ID",
      minWidth: "25px",
      maxWidth: "80px",
      selector: (row) => row?.id,
    },
    {
      sortable: true,
      name: "Factura",
      minWidth: "25px",
      selector: (row) => row?.factura,
    },
    {
      sortable: true,
      name: "Fecha",
      minWidth: "25px",
      selector: (row) => row?.fecha,
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
                      onClick={() => actualizarCompraId(row?.id)}
                  >
                      <Edit />
                  </button>
                  <button className='btn' style={{ backgroundColor: '#DC3545', color: 'white' }}
                      onClick={() => eliminarCompra(row?.id)}
                  >
                      <Trash />
                  </button>
              </div>
          )
      }
  }
  ]
  return (
    <>
           <Card>
                <DataTable
                    noHeader
                    pagination
                    className="react-datatable"
                    columns={columns}
                    data={search ? filter : data}
                />
            </Card>
    </>
  )
}

export default ComprasTable