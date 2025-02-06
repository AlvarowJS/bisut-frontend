import { useState, useEffect, useCallback } from "react";
import bdAdmin from "../../api/bdAdmin";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getAuthHeaders } from "../auth/auth";
import clientesDefault from "../constants/clientesDefaults";

const MySwal = withReactContent(Swal);
const URL = "/v1/clientes";
const URLTIPOS = "/v1/clientes-tipos";

export const useClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [proxDays, setProxDays] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredClientes, setFilteredClientes] = useState([]);
    const [refresh, setRefresh] = useState(false);
    
    // Cargar clientes
    useEffect(() => {
        bdAdmin.get(URL, getAuthHeaders()).then((res) => {
            setClientes(res.data.data);
            setProxDays(res.data.upcoming);
        });
    }, [refresh]);

    // Cargar tipos de clientes
    useEffect(() => {
        bdAdmin.get(URLTIPOS, getAuthHeaders()).then((res) => setTipos(res.data));
    }, []);

    // Filtrar clientes
    useEffect(() => {
        setFilteredClientes(
            clientes.filter((cliente) =>
                cliente.nombre_completo.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, clientes]);

    const createCliente = async (data, reset, toggle) => {
        try {
            await bdAdmin.post(URL, data, getAuthHeaders());
            reset(clientesDefault);
            toggle();
            setRefresh(!refresh);
            MySwal.fire("Cliente creado", "", "success");
        } catch {
            MySwal.fire("Error", "Contacte con soporte", "error");
        }
    };
    const getClientId = (id, reset, toogleActualizacion) => {        
        bdAdmin.get(`${URL}/${id}`, getAuthHeaders())
            .then(res => {
                reset(res.data)
                toogleActualizacion()
                setRefresh(!refresh)
            })
            .catch(err => console.log(err))

    }
    const updateCliente = async (id, data, reset, toggle) => {
        try {
            await bdAdmin.put(`${URL}/${id}`, data, getAuthHeaders());
            reset(clientesDefault);
            toggle();
            setRefresh(!refresh);
            MySwal.fire("Cliente actualizado", "", "success");
        } catch {
            MySwal.fire("Error", "Contacte con soporte", "error");
        }
    };

    const deleteCliente = async (id) => {
        const result = await MySwal.fire({
            title: "¿Eliminar cliente?",
            text: "No podrás revertirlo",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
        });

        if (result.isConfirmed) {
            try {
                await bdAdmin.delete(`${URL}/${id}`, getAuthHeaders());
                setRefresh(!refresh);
                MySwal.fire("Cliente eliminado", "", "success");
            } catch (err) {
                MySwal.fire("Error", err.response.data.message, "error");
            }
        }
    };

    return {
        clientes,
        tipos,
        proxDays,
        search,
        setSearch,
        filteredClientes,
        createCliente,
        updateCliente,
        deleteCliente,
        getClientId
    };
};

