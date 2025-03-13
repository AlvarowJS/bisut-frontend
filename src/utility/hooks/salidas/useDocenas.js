import React from 'react'

const URL = "/v1/docena-piezas";
export const useDocenas = () => {

    convertidor = async (data) => {
        try {
            console.log(data, "?")
            // const res = await bdAdmin.post(URL, data, getAuthHeaders())
            // return res.data
        } catch (error) {
            console.log(error)
        }
    }

  return {
    
  }
}
