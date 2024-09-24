import React from 'react'
import { Card } from "reactstrap";
import DataTable from "react-data-table-component";
import { Edit, Trash } from 'react-feather';

const TablaCliente = ({
    data, search, filter, actualizaClienteId, eliminarCliente
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
            name: "nombre",
            minWidth: "25px",
            selector: (row) => row?.id,
            cell: (row) => {
                return <>{row?.nombre_completo}</>;
            },
        },
        {
            sortable: true,
            name: "Dirección",
            minWidth: "25px",
            selector: (row) => row?.direccion,
            cell: (row) => {
                return <>{row?.direccion}</>;
            },
        },
        {
            sortable: true,
            name: "Telefono",
            minWidth: "25px",
            selector: (row) => row?.telefono,
            cell: (row) => {
                return <>{row?.telefono}</>;
            },
        },
        {
            sortable: true,
            name: "Límite Credito",
            minWidth: "25px",
            selector: (row) => row?.limite_credito,
            cell: (row) => {
                return <>{row?.limite_credito}</>;
            },
        },
        {
            sortable: true,
            name: "Días Credito",
            minWidth: "25px",
            selector: (row) => row?.dias_credito,
            cell: (row) => {
                return <>{row?.dias_credito}</>;
            },
        },
        {
            sortable: true,
            name: "Estado",
            minWidth: "25px",
            selector: (row) => row?.estado,
            cell: (row) => {
                return <>{row?.estado}</>;
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
                    <div className='d-flex gap-1 my-1'>

                        <button className='btn btn-warning'
                            onClick={() => actualizaClienteId(row?.id)}
                        >
                            <Edit />
                        </button>
                        <button className='btn' style={{ backgroundColor: '#DC3545', color: 'white' }}
                            onClick={() => eliminarCliente(row?.id)}
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

export default TablaCliente