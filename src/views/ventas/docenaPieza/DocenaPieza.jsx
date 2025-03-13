import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody } from 'reactstrap'
import DocenaPiezaForm from '../../../components/ventas/docenaPieza/DocenaPiezaForm'
import useHandleRows from '../../../utility/hooks/useHandleRows'
import { useProducto } from '../../../utility/hooks/productos/useProducto'
import { useForm } from 'react-hook-form'
import useAlmacen from '../../../utility/hooks/useAlmacen'

const DocenaPieza = () => {
    const [modal, setModal] = useState(false)
    const { productos, productoOptions } = useProducto()
    const { almacenOptions } = useAlmacen()
    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const [productoEmisor, setProductoEmisor] = useState()
    const [productoReceptor, setProductoReceptor] = useState()
    const [almacen, setAlmacen] = useState()
    const [piezaCalc, setPiezaCalc] = useState()

    const toggle = () => {
        setModal(!modal);
    };

    const submit = (data) => {
        console.log(data)
    }

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
            />
        </>
    )
}

export default DocenaPieza