import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Input, Label } from 'reactstrap'
import DocenaPiezaForm from '../../../components/ventas/docenaPieza/DocenaPiezaForm'
import useHandleRows from '../../../utility/hooks/useHandleRows'
import { useProducto } from '../../../utility/hooks/productos/useProducto'
import { useForm } from 'react-hook-form'
import useAlmacen from '../../../utility/hooks/useAlmacen'
import { DateUtils } from '../../../utility/DateUtils'
import { useDocenas } from '../../../utility/hooks/salidas/useDocenas'
import { DocenaPiezaTabla } from '../../../components/ventas/docenaPieza/DocenaPiezaTabla'

const DocenaPieza = () => {
    const [modal, setModal] = useState(false)
    const { productos, productoOptions } = useProducto()
    const { convertidor } = useDocenas()
    const { almacenOptions } = useAlmacen()
    const [filter, setFilter] = useState();
    const [search, setSearch] = useState();
    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const [productoEmisor, setProductoEmisor] = useState()
    const [productoReceptor, setProductoReceptor] = useState()
    const [almacen, setAlmacen] = useState()
    const [piezaCalc, setPiezaCalc] = useState()
    const [stock, setStock] = useState()
    const [productoSelect, setProductoSelect] = useState()
    const toggle = () => {
        setModal(!modal);
    };


    useEffect(() => {
        if (productoEmisor && almacen) {
            const productoSeleccionado = productos.find(p => p.id === productoEmisor.value);

            if (productoSeleccionado) {
                const almacenSeleccionado = productoSeleccionado.almacens?.[almacen.label];
                const grupoStock = productoSeleccionado.grupo?.stock;
                const stockFinal = almacenSeleccionado?.stock || grupoStock || 0;
                setStock(stockFinal);
                setProductoSelect(productoSeleccionado)
            }
        }
    }, [almacen, productoEmisor])

    useEffect(() => {
        setFilter(
            productos?.filter(
                (e) =>
                    e?.item?.toLowerCase()
                        .indexOf(search?.toLowerCase()) !== -1
            )
        )
    }, [search])

    const submit = (data) => {
        data.producto_id_emisor = productoEmisor.value
        data.producto_id_receptor = productoReceptor.value
        data.almacen_id = almacen.value
        data.fecha = DateUtils()
        convertidor(data, toggle)
    }

    const handleFilter = (e) => {
        setSearch(e.target.value);
    };

    return (
        <>
            <Card>
                <CardBody>
                    <Button onClick={toggle}>
                        Convertir de docena a pieza
                    </Button>
                </CardBody>
            </Card>
            <DocenaPiezaForm
                toggle={toggle}
                modal={modal}
                handleSubmit={handleSubmit}
                submit={submit}
                register={register}
                reset={reset}
                errors={errors}

                productoOptions={productoOptions}
                almacenOptions={almacenOptions}
                setAlmacen={setAlmacen}
                setProductoEmisor={setProductoEmisor}
                setProductoReceptor={setProductoReceptor}

                almacen={almacen}
                productoEmisor={productoEmisor}
                productoReceptor={productoReceptor}

                // stock
                stock={stock}
                productoSelect={productoSelect}
            />
            <Col sm="6">
                <Label className="me-1" for="siniearch-input">
                    Buscar
                </Label>
                <Input
                    className="dataTable-filter my-2"
                    type="text"
                    bsSize="sm"
                    id="search-input"
                    placeholder="buscar por producto"
                    onChange={handleFilter}
                />
            </Col>
            <DocenaPiezaTabla
                productos={productos}
                filter={filter}
                search={search}
            />
        </>
    )
}

export default DocenaPieza