import React from 'react'
import { Card } from "reactstrap";
import DataTable from "react-data-table-component";
export const DocenaPiezaTabla = ({ productos, filter, search, }) => {
    const almacenesNombres = Array.from(
        new Set(productos?.flatMap(producto => Object.keys(producto.almacens || {})))
    );

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
            name: "Item",
            minWidth: "25px",
            selector: (row) => row?.item,
            cell: (row) => {
                return <>{row?.item}</>;
            },
        },
        {
            sortable: true,
            name: "Descripcion",
            minWidth: "25px",
            selector: (row) => row?.descripcion,
            cell: (row) => {
                return <>{row?.descripcion}</>;
            },
        },
        {
            sortable: true,
            name: "Piezas x Paquete",
            minWidth: "25px",
            selector: (row) => row?.piezasPaquete,
            cell: (row) => {
                return <>{row?.piezasPaquete}</>;
            },
        },
        ...almacenesNombres.map(nombreAlmacen => ({
            sortable: true,
            name: (
                <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
                    {nombreAlmacen}
                </div>
            ),
            minWidth: '100px',
            selector: row => row?.almacens?.[nombreAlmacen]?.stock || 0, // Si no hay stock, mostrar 0
            cell: row => <>{row?.almacens?.[nombreAlmacen]?.stock || 0}</>
        })),

    ]
    return (
        <>
            <Card>
                <DataTable
                    noHeader
                    pagination
                    className="react-datatable"
                    columns={columns}                    
                    data={search ? filter : productos}
                    searchable
                />
            </Card>
        </>
    )
}
