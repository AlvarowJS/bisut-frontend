import React from 'react'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import bdAdmin from '../../../api/bdAdmin';
import { getAuthHeaders } from '../../auth/auth';
const MySwal = withReactContent(Swal);

const URL = "/v1/docena-piezas";
export const useDocenas = () => {

    const convertidor = async (data, toggle) => {
        try {
            const res = await bdAdmin.post(URL, data, getAuthHeaders())
            toggle();
            MySwal.fire("Conversión exitosa", "", "success");
            return res.data
            
        } catch (error) {
            console.log(error)
            MySwal.fire("Error", "Contacte con soporte", "error");
        }
    }

    return {
        convertidor
    }
}
