import React, { useEffect, useState } from 'react'
import { productoService } from '../../services/productos/productoService';

export const useProducto = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProductos = async () => {
            try {
                const data = await productoService();
                setProductos(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadProductos();
    }, []); 

    const productoOptions = productos?.map(option => ({
        value: option?.id,
        label: option?.item + option?.descripcion
    }))    

    return {
        productos,
        loading,
        error,
        productoOptions
    }
}
