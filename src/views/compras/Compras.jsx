import React from 'react'
import ComprasTable from './ComprasTable'
import React, { useEffect, useState } from "react";
import { Button, Col, Input, Label, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import bdAdmin from "../../../api/bdAdmin";
import CompraTable from "./CompraTable";
import CompraForm from "./CompraForm";
const URL = "v1/Compras";

const Compras = () => {
    const token = localStorage.getItem("accessToken");
    const [data, setData] = useState();
    const [search, setSearch] = useState();
    const [filter, setFilter] = useState();
    const [modal, setModal] = useState(false);
    const [actualizacion, setActualizacion] = useState(false);
    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const [refresh, setRefresh] = useState(false);
    const defaulValuesForm = {
        factura: "",
        fecha: "",
        total: "",
        cliente_id: ""
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
            .post(URL, newData, getAuthHeaders())
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
            .post(`${URLFOTO}`, newData, getAuthHeaders())
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
    return (
        <>
            <ComprasTable
                data={data}
                filter={filter}
                search={search}
                actualizarCompraId={actualizarCompraId}
                eliminarCompra={eliminarCompra}
            />
        </>
    )
}

export default Compras