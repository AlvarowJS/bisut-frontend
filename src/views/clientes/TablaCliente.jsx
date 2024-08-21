import React from 'react'
import { Card } from "reactstrap";
import DataTable from "react-data-table-component";

const TablaCliente = ({
    data
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
            name: "Estado",
            minWidth: "25px",            
            selector: (row) => row?.estado,
            cell: (row) => {
                return <>{row?.estado}</>;
            },
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
                    data={data}
                />
            </Card>
        </>
    )
}

export default TablaCliente