import React from 'react'
import { Badge, Card } from 'reactstrap'
import DataTable from 'react-data-table-component'
import './KardexTable.css' // Importa los estilos personalizados

const KardexTable = ({ data }) => {
  const columns = [
    {
        sortable: true,
        name: 'ID',
        minWidth: '50px',
        maxWidth: '100px',
        selector: row => row?.id
    },
    {
      sortable: true,
      name: 'Fecha',
      minWidth: '100px',
      maxWidth: '150px',
      selector: row => row?.fecha
    },
    {
      sortable: true,
      name: 'Documento',
      minWidth: '150px',
      maxWidth: '200px',
      selector: row => row?.documento
    },
    {
      sortable: true,
      name: 'Operación',
      minWidth: '150px',
      maxWidth: '200px',
      selector: row => row?.operacion.nombre
    },
    {
      sortable: true,
      name: (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
          Cantidad Entrada
        </div>
      ),
      minWidth: '100px',
      maxWidth: '150px',
      selector: row => row?.cantidadEntrada
    },
    {
      sortable: true,
      name: (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
          Valor Unitario Entrada
        </div>
      ),
      minWidth: '100px',
      maxWidth: '150px',
      selector: row => row?.vuEntrada
    },
    {
      sortable: true,
      name: (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
          Valor Total de Entrada
        </div>
      ),
      minWidth: '100px',
      maxWidth: '150px',
      selector: row => row?.vtEntrada
    },
    {
      sortable: true,
      // name: 'Cantidad de Salida',
      name: (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
          Cantidad de Salida
        </div>
      ),
      minWidth: '100px',
      maxWidth: '150px',
      selector: row => row?.cantidadSalida
    },
    {
      sortable: true,      
      name: (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
          Valor Unitario de Salida
        </div>
      ),
      minWidth: '100px',
      maxWidth: '150px',
      wrap: true,
      selector: row => row?.vuSalida
    },
    {
      sortable: true,
      name: (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
          Valor total de salida
        </div>
      ),
      minWidth: '100px',
      maxWidth: '150px',
      selector: row => row?.vtSalida
    },
    {
      sortable: true,
      // name: 'Cantidad de saldo',
      name: (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
          Cantidad de Saldo
        </div>
      ),
      minWidth: '100px',
      maxWidth: '150px',
      wrap: true,
      selector: row => row?.cantidadSaldo
      
    },
    {
      sortable: true,
      name: (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
          Valor Unitario Saldo
        </div>
      ),
      minWidth: '100px',
      maxWidth: '150px',
      selector: row => row?.vuSaldo
    },
    {
      sortable: true,
      name: (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
          Valor Total Saldo
        </div>
      ),
      minWidth: '100px',
      maxWidth: '150px',
      selector: row => row?.vtSaldo
    }
  ]

  return (
    <Card className='mt-2'>
      <DataTable
        noHeader
        pagination
        className='react-dataTable'
        columns={columns}
        subHeaderWrap	
        subHeader
        data={data}
      />
    </Card>
  )
}

export default KardexTable
