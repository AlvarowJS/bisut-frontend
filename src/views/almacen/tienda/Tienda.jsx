import React, { useEffect, useState } from "react";
import { Button, Col, Input, Label, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import bdAdmin from "../../../api/bdAdmin";
import TiendaTabla from "./TiendaTabla";
import TiendaForm from "./TiendaForm";
const URL = "v1/almacen";

const Tienda = () => {
    const token = localStorage.getItem("accessToken");
    const [data, setData] = useState();
    const [search, setSearch] = useState();
    const [filter, setFilter] = useState();
    const [modal, setModal] = useState(false);
    const [modalUbicacion, setModalUbicacion] = useState(false);
    const [actualizacion, setActualizacion] = useState(false);
    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const [refresh, setRefresh] = useState(false);
    const defaulValuesForm = {
        nombre: "",
        direccion: "",
        telefono: "",
        tipo: "",
        rfc: ""        
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
                    e.nombre.toLowerCase()
                        .indexOf(search?.toLowerCase()) !== -1
            )
        );
    }, [search]);

    const handleFilter = (e) => {
        setSearch(e.target.value);
    };
    const crearTienda = (data) => {
        bdAdmin
            .post(URL, data, getAuthHeaders())
            .then((res) => {
                reset(defaulValuesForm);
                toggle.call();
                setRefresh(!refresh);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Tienda creado",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((err) => {
                if (err.response.status == 422) {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Email registrado, por favor ingrese uno diferente",
                        showConfirmButton: false,
                    });
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Contacte con soporte",
                        showConfirmButton: false,
                    });
                }
            });
    };

    // Actualiza Consultorio (PUT)
    const actualizarTienda = (id, data) => {
        bdAdmin
            .put(`${URL}/${id}`, data, getAuthHeaders())
            .then((res) => {
                reset(defaulValuesForm);
                toggle.call();
                setRefresh(!refresh);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Tienda Actualizado",
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
    const eliminarTienda = (id) => {
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
                            title: "Tienda Eliminada",
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
    const actualizarTiendaId = (id) => {
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
            actualizarTienda(data.id, data);
        } else {
            crearTienda(data);
        }
    };
    return (
        <>

            <Row>
                <Col sm="6">
                    <Label className="me-1" for="search-input">
                        Buscar
                    </Label>
                    <Input
                        className="dataTable-filter"
                        type="text"
                        bsSize="sm"
                        id="search-input"
                        placeholder="buscar por nombre"
                        onChange={handleFilter}
                    />
                </Col>
                <Col sm="4"></Col>

                <Col sm="2" className="mt-2">
                    <Button onClick={toggle} color="primary">
                        + Agregar
                    </Button>
                </Col>
            </Row>
            <TiendaTabla
                data={data}
                filter={filter}
                search={search}
                actualizarTiendaId={actualizarTiendaId}
                eliminarTienda={eliminarTienda}
            />
            <TiendaForm
                toggle={toggle}
                modal={modal}
                handleSubmit={handleSubmit}
                submit={submit}
                register={register}
                reset={reset}
                getAuthHeaders={getAuthHeaders}
                errors={errors}
            />
        </>
    )
}

export default Tienda