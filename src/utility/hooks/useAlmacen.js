import React, { useEffect, useState } from 'react'
import { almacenService } from '../services/almacen/almacenService'
const useAlmacen = () => {
    const [almacens, setAlmacens] = useState([])
    useEffect(() => {

        const loadAlmacen = async () => {
            try {
                const data = await almacenService();
                setAlmacens(data)
            } catch (err) {

            }
        }
        loadAlmacen();
  

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