import React from 'react'
import { Badge, Card } from 'reactstrap'
import DataTable from 'react-data-table-component'
const TablaVentas = ({
    data, search, filter,verDetalles
}) => {
    const columns = [
        {
            sortable: true,
            name: "Id",
            minWidth: "25px",
            maxWidth: "80px",
            selector: (row) => row?.identificador,
        },
        {
            sortable: true,
            name: "Tipo",
            minWidth: "80px",
            maxWidth: "100px",
            selector: (row) => {
                return <>
                    {row?.tipo_factura == 1 ? 'Remisión' : row?.tipo_factura == 2 ? 'Factura' : 'Cotización'}
                </>
            }

        },
        {
            sortable: true,
            name: "Almacen",
            minWidth: "25px",
            selector: (row) => row?.almacen?.nombre,
            cell: (row) => {
                return <>{row?.almacen?.nombre}</>;
            },
        },
        {
            sortable: true,
            name: "Cliente",
            minWidth: "25px",
            selector: (row) => row?.cliente.nombre_completo,
            cell: (row) => {
                return <>
                    {row?.cliente.nombre_completo}
                </>;
            },
        },
        {
            sortable: true,
            name: "Total",
            minWidth: "25px",
            selector: (row) => row?.total,
            cell: (row) => {
                return <>{row?.total}</>;
            },
        },
        {
            sortable: true,
            name: "Tipo Pago",
            minWidth: "25px",
            selector: (row) => row?.tipo_pago,
            cell: (row) => {
                return <>{row?.tipo_pago}</>;
            },
        },
        {
            sortable: true,
            name: "Vendedor",
            minWidth: "25px",
            selector: (row) => row?.user?.name,
            cell: (row) => {
                return <>{row?.user?.name}</>;
            },
        },
        {
            sortable: true,
            name: "Fecha",
            minWidth: "25px",
            selector: (row) => row?.fecha,
            cell: (row) => {
                return <>{row?.fecha}</>;
            },
        },
        {
            sortable: true,
            name: "Hora",
            minWidth: "25px",
            selector: (row) => row?.hora,
            cell: (row) => {
                return <>{row?.hora}</>;
            },
        },
        {
            name: 'Acciones',
            sortable: true,
            allowOverflow: true,
            minWidth: '200px',
            maxWidth: '400px',
            cell: row => {
                return (
                    <div className='my-1'>
                        <button className='btn btn-warning'
                            onClick={() => actualizaClienteId(row?.id)}
                        >
                            Enviar Factura
                        </button>
                        <button className='btn my-1' style={{ backgroundColor: 'skyblue', color: 'white' }}
                            onClick={() => eliminarCliente(row?.id)}
                        >
                            Enviar Correo
                        </button>
                        <button className='btn' style={{ backgroundColor: 'orange', color: 'white' }}
                            onClick={() => verDetalles(row?.id)}
                        >
                            Ver detalles
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

export default TablaVentas