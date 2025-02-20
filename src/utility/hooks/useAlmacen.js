import React, { useEffect, useState } from 'react'
import bdAdmin from '../../api/bdAdmin'
import { getAuthHeaders } from '../auth/auth'
const URL = "/v1/almacen"
const useAlmacen = () => {
    const [almacens, setAlmacens] = useState([])    
    useEffect(() => {
        bdAdmin.get(URL, getAuthHeaders())
            .then(res => setAlmacens(res.data))
            .catch(err => console.log(err))

    }, [])

    const almacenOptions = almacens?.map(option => ({
        value: option?.id,
        label: option?.nombre
    }));

    return {
        almacens,
        almacenOptions,        
    }
}

export default useAlmacen