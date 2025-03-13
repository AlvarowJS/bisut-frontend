import React from 'react'
import bdAdmin from '../../../api/bdAdmin'
import { getAuthHeaders } from '../../auth/auth'
const URL = 'v1/almacen'
export const almacenService = async () => {
    try {
        const res = await bdAdmin.get(URL, getAuthHeaders())
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}
