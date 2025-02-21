import React, { useEffect, useState } from 'react'
import bdAdmin from '../../api/bdAdmin';
import { getAuthHeaders } from '../auth/auth';
import useAlmacen from './useAlmacen';
const URLALL = "v1/listar-productos";
const URLTRANS = "v1/transferir-productos";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
const useHandleRows = (almacenEmisor, almacenReceptor, fecha, refresh) => {
    const [rows, setRows] = useState([]);
    const [item, setItem] = useState();
    const [filter, setFilter] = useState();
    const [search, setSearch] = useState();
    const [productos, setProductos] = useState([])
    const [newRefresh, setNewRefresh] = useState(false)
    const { almacenOptions } = useAlmacen()
    useEffect(() => {
        bdAdmin.get(URLALL, getAuthHeaders())
            .then(res => setProductos(res?.data))
            .catch(err => console.log(err))
    }, [newRefresh, refresh])

    useEffect(() => {
        setFilter(
            productos?.filter(
                (e) =>
                    e?.item?.toLowerCase()
                        .indexOf(search?.toLowerCase()) !== -1
            )
        )
    }, [search])

    useEffect(() => {
        if (!almacenEmisor && !almacenReceptor) return;

        const updatedRows = rows.map(row => {
            const selectedItem = productos.find(product => product.item === row.item);
            if (!selectedItem) return row;

            return {
                ...row,
                stockEmisor: almacenEmisor ? selectedItem.almacens?.[almacenEmisor.label]?.stock || 0 : 0,
                stockReceptor: almacenReceptor ? selectedItem.almacens?.[almacenReceptor.label]?.stock || 0 : 0
            };
        });

        setRows(updatedRows);
    }, [almacenEmisor, almacenReceptor]);


    const handleFilter = (e) => {
        setSearch(e.target.value);
    };

    const handleItemChange = (selected) => {
        setItem(selected);
    };

    const productoOptions = productos?.map(option => ({
        value: option?.item,
        label: option?.item + ' ' + option?.descripcion
    }));

    const handleRowChange = (index, field, value) => {
        const updateRows = [...rows]
        updateRows[index][field] = value
        setRows(updateRows)
    }
    const handleAddRow = () => {
        const repeatItem = rows?.find(row => row.item === item.value)
        const selectedItem = productos.find(product => product.item === item.value)
        let updateNewRows
        if (repeatItem) {
            updateNewRows = rows?.map(row => {
                if (row.item === item.value) {
                    console.log(row, "row")
                    console.log(item, "item")
                    return {
                        ...row,
                        cantidad: Number(row?.cantidad) + 1,
                        importe: (row?.cantidad + 1) * 1,
                        stockEmisor: almacenEmisor ? selectedItem.almacens?.[almacenEmisor.label]?.stock || 0 : 0,
                        stockReceptor: almacenReceptor ? selectedItem.almacens?.[almacenReceptor.label]?.stock || 0 : 0
                    }
                }
                return row
            })
        } else {
            const newItem = {
                producto_id: selectedItem.id,
                item: selectedItem.item,
                descripcion: selectedItem.descripcion,
                cantidad: 1,
                importe: 0,
                precio_suelto: 0,
                stockEmisor: almacenEmisor ? selectedItem.almacens?.[almacenEmisor.label]?.stock || 0 : 0,
                stockReceptor: almacenReceptor ? selectedItem.almacens?.[almacenReceptor.label]?.stock || 0 : 0
            };
            setRows([...rows, newItem]);
        }
    }

    const submitTransferencia = (transferirProducto, setAlmacenEmisor, setAlmacenReceptor) => {
        const dataSend = {
            'almacen_emisor': almacenEmisor.value,
            'almacen_receptor': almacenReceptor.value,
            'fecha': fecha,            
            'productos': rows.map(row => ({
                'producto_id': row.producto_id,
                'cantidad': row.cantidad
            }))
        }
        bdAdmin.post(URLTRANS, dataSend, getAuthHeaders())
            .then(res => {
                MySwal.fire("Transferencia completada", "", "success");
                transferirProducto()
                setNewRefresh(!newRefresh)
                setRows([])
                setAlmacenEmisor(null)
                setAlmacenReceptor(null)
            })
            .catch(err => console.log(err))
    }

    return {
        rows,
        setRows,
        handleAddRow,
        handleRowChange,
        productoOptions,
        handleItemChange,
        item,
        productos,
        handleFilter,
        filter,
        search,
        submitTransferencia
    }
}

export default useHandleRows