import React, { useEffect, useState } from "react";
import { Button, Col, Input, Label, Row } from "reactstrap";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import bdAdmin from "../../api/bdAdmin";
import ComprasTable from "./ComprasTable";
import ComprasForm from "./ComprasForm";
import ComprasExcel from "./ComprasExcel";
const URL = "v1/compras";
const URLPROVEEDOR = "v1/proveedor";
const URLPRODUCTO = "v1/productos";
const URLALMACEN = "v1/almacen";
const URLEXCEL = "v1/importar-compra";

const Compras = () => {
    const token = localStorage.getItem("accessToken");
    const [dataAlmacen, setDataAlmacen] = useState();
    const [dataProveedor, setDataProveedor] = useState()
    const [dataProductos, setDataProductos] = useState()
    const [data, setData] = useState();
    const [search, setSearch] = useState();
    const [filter, setFilter] = useState();
    const [modal, setModal] = useState(false);
    const [modalExcel, setModalExcel] = useState(false)
    const [item, setItem] = useState()
    const [excelFile, setExcelFile] = useState()
    const [actualizacion, setActualizacion] = useState(false);
    const { handleSubmit, control, setValue, register, reset, formState: { errors } } = useForm();
    const { handleSubmit: handleSubmitExcel, register: registerExcel, reset: resetExcel } = useForm();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "detalles"
    })

    const [refresh, setRefresh] = useState(false);
    const defaultValuesExcel = {
        factura: '',
        fecha: '',
        cliente_id: '',
        almacen_id: '',
        proveedor_id: '',
    }
    const defaulValuesForm = {
        factura: '',
        fecha: '',
        cliente_id: '',
        almacen_id: '',
        proveedor_id: '',
        detalles: [{ item: '', cantidad: 0, precio_unitario: 0 }]
    };

    const getAuthHeaders = () => ({
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    const toggle = () => {
        setActualizacion(false);
        reset(defaulValuesForm);
        setModal(!modal);
    };
    const toggleActualizacion = () => {
        setModal(!modal);
    };
    const toggleExcel = () => {
        setModalExcel(!modalExcel)
    }

    useEffect(() => {
        bdAdmin.get(URLALMACEN, getAuthHeaders())
            .then((res) => { setDataAlmacen(res.data); })
            .catch((err) => { });
        bdAdmin.get(URLPROVEEDOR, getAuthHeaders())
            .then((res) => { setDataProveedor(res.data); })
            .catch((err) => { });
        bdAdmin.get(URLPRODUCTO, getAuthHeaders())
            .then((res) => { setDataProductos(res.data); })
            .catch((err) => { });
    }, [])

    useEffect(() => {
        bdAdmin
            .get(`${URL}`, getAuthHeaders())
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => { });
    }, [refresh]);
    useEffect(() => {
        setFilter(
            data?.filter(
                (e) =>
                    e?.item?.toLowerCase()
                        .indexOf(search?.toLowerCase()) !== -1
            )
        );
    }, [search]);

    const handleFilter = (e) => {
        setSearch(e.target.value);
    };
    const crearCompra = (data) => {
        bdAdmin
            .post(URL, data, getAuthHeaders())
            .then((res) => {
                reset(defaulValuesForm);
                toggle.call();
                setRefresh(!refresh);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Compra creado",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((err) => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Contacte con soporte",
                    showConfirmButton: false,
                });
            });
    };


    const actualizarCompra = (id, data) => {
        bdAdmin
            .post(`${URL}`, newData, getAuthHeaders())
            .then((res) => {
                reset(defaulValuesForm);
                toggle.call();
                setRefresh(!refresh);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Compra Actualizado",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((err) => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Contacte con soporte",
                    showConfirmButton: false,
                });
            });
    };
    const eliminarCompra = (id) => {
        return MySwal.fire({
            title: "¿Estás seguro de eliminar?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: "btn btn-outline-danger ms-1",
            },
            buttonsStyling: false,
        }).then(function (result) {
            if (result.value) {
                bdAdmin
                    .delete(`${URL}/${id}`, getAuthHeaders())
                    .then((res) => {
                        setRefresh(!refresh);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Compra Eliminado",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
                    .catch((err) => {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Contacte con soporte",
                            showConfirmButton: false,
                        });
                    });
            }
        });
    };

    // Tomara los datos que tiene un registro
    const actualizarCompraId = (id) => {
        toggleActualizacion.call();
        setActualizacion(true);
        bdAdmin
            .get(`${URL}/${id}`, getAuthHeaders())
            .then((res) => {
                reset(res.data);
            })
            .catch((err) => null);
    };

    // Si es actualizacion llamara a actualizarPaciente pero si es false crear un Consultorio
    const submit = (data) => {
        if (actualizacion) {
            actualizarCompra(data.id, data);
        } else {
            crearCompra(data);
        }
    };

    const submitExcel = (data) => {
        const newData = new FormData()
        newData.append('factura', data.factura)
        newData.append('fecha', data.fecha)
        newData.append('proveedor', data.proveedor_id)
        newData.append('almacen', data.almacen_id)
        newData.append('archivo', excelFile)


        bdAdmin.post(URLEXCEL, newData, getAuthHeaders())
            .then((res) => {
                resetExcel(defaultValuesExcel)
                toggleExcel.call()
                setRefresh(!refresh)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Producto creado",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((err) => {
                console.log(err)
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Contacte con soporte",
                    showConfirmButton: false,
                });
            });

    }
    return (
        <>
            <h3>Compras</h3>
            <Row className="mb-2">
                <Col sm="6">
                    <Label className="me-1" for="search-input">
                        Buscar
                    </Label>
                    <Input
                        className="dataTable-filter"
                        type="text"
                        bsSize="sm"
                        id="search-input"
                        placeholder="buscar por nombre y apellidos"
                        onChange={handleFilter}
                    />
                </Col>
                <Col sm="2"></Col>
                <Col sm="2" className="mt-2">
                    <Button color="success" onClick={toggleExcel}>
                        + Subir Excel
                    </Button>
                </Col>
                <Col sm="2" className="mt-2">
                    <Button color="primary" onClick={toggle}>
                        + Agregar
                    </Button>
                </Col>
            </Row>
            <ComprasTable
                data={data}
                filter={filter}
                search={search}
                actualizarCompraId={actualizarCompraId}
                eliminarCompra={eliminarCompra}
            />
            <ComprasExcel
                toggleExcel={toggleExcel}
                modal={modalExcel}
                handleSubmit={handleSubmitExcel}
                submit={submitExcel}
                register={registerExcel}
                dataAlmacen={dataAlmacen}
                dataProveedor={dataProveedor}
                setExcelFile={setExcelFile}
            />
            <ComprasForm
                toggle={toggle}
                modal={modal}
                handleSubmit={handleSubmit}
                submit={submit}
                register={register}
                reset={reset}
                getAuthHeaders={getAuthHeaders}
                errors={errors}
                fields={fields}
                append={append}
                remove={remove}
                dataAlmacen={dataAlmacen}
                dataProveedor={dataProveedor}
                dataProductos={dataProductos}
                item={item}
                setItem={setItem}
                setValue={setValue}
                Controller={Controller}
                control={control}
            />
        </>
    )
}

export default Compras