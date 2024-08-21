import React, { useEffect, useState } from 'react'
import TablaCliente from './TablaCliente'
import FormCliente from './FormCliente'
import bdAdmin from '../../api/bdAdmin'

const URL = '/v1/clientes'
const Cliente = () => {

  const [data, setData] = useState()
  const token = localStorage.getItem("token");


  const getAuthHeaders = () => ({
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  useEffect(() => {
    bdAdmin.get(URL, getAuthHeaders())
    .then(
      res => {
        setData(res.data.data)
      }
    )

  }, [])


  return (
    <>
      <TablaCliente 
        data={data} 
      />
      <FormCliente />
    </>
  )
}

export default Cliente