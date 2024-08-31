import React from 'react'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import { Badge, Card } from 'reactstrap'

const ProveedorTable = ({
    data, filter, search,
    actualizarProveedorId, eliminarProveedor
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
            name: 'Nombre',
            minWidth: '25px',
            selector: row => row?.nombre
        },
        {
            sortable: true,
            name: 'Telefono',
            minWidth: '25px',
            selector: row => row?.telefono,
            cell: row => {
                return (
                    <>
                        {row?.telefono}
                    </>
                )
            }
        },
        {
            sortable: true,
            name: 'Dirección',
            minWidth: '25px',
            selector: row => row?.direccion,
            cell: row => {
                return (
                    <>
                        {row?.direccion}
                    </>
                )
            }
        },
        {
            sortable: true,
            name: 'CP',
            minWidth: '25px',
            selector: row => row?.telefono,
            cell: row => {
                return (
                    <>
                        {row?.telefono}
                    </>
                )
            }
        },
        {
            sortable: true,
            name: 'Correo',
            minWidth: '25px',
            selector: row => row?.mail,
            cell: row => {
                return (
                    <>
                        {row?.mail}
                    </>
                )
            }
        },
        {
            sortable: true,
            name: 'Estado',
            minWidth: '50px',
            selector: row => row?.estado,
            cell: row => {
                return (
                    <>
                        {
                            row?.estado == true ?

                                <Badge color='light-success'>
                                    Activo
                                </Badge>
                                :
                                <Badge color='light-warning'>
                                    Inactivo
                                </Badge>

                        }
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
                            onClick={() => actualizarProveedorId(row?.id)}
                        >
                            <Edit />
                        </button>
                        <button className='btn' style={{ backgroundColor: '#DC3545', color: 'white' }}
                            onClick={() => eliminarProveedor(row?.id)}
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

export default ProveedorTable