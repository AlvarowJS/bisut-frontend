import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import * as XLSX from 'xlsx';
import './style.css';
import { Col, Row } from 'reactstrap';
import bdAdmin from '../../api/bdAdmin';
const URLPROVEEDOR = "v1/proveedor";
const URLALMACEN = "v1/almacen";
const URL = "v1/compras";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const SubirCompra = () => {
    const [excelData, setExcelData] = useState([]);
    const [editedData, setEditedData] = useState([]);
    const [dataAlmacen, setDataAlmacen] = useState();
    const [dataProveedor, setDataProveedor] = useState();
    const [almacen, setAlmacen] = useState()
    const [proveedor, setProveedor] = useState()
    const [factura, setFactura] = useState('')
    const [fecha, setFecha] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    const token = localStorage.getItem("accessToken");
    const getAuthHeaders = () => ({
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    useEffect(() => {
        bdAdmin.get(URLALMACEN, getAuthHeaders())
            .then((res) => { setDataAlmacen(res.data); })
            .catch((err) => { });
        bdAdmin.get(URLPROVEEDOR, getAuthHeaders())
            .then((res) => { setDataProveedor(res.data); })
            .catch((err) => { });
    }, [])

    const handleAlmacenChange = (selected) => {
        setAlmacen(selected)
    }
    const handleProveedorChange = (selected) => {
        setProveedor(selected)
    }
    const handleFacturaChange = (event) => {
        setFactura(event.target.value);
    };

    const handleFechaChange = (event) => {
        setFecha(event.target.value);
    };

    const almacenOptions = dataAlmacen?.map(option => ({
        value: option?.id,
        label: option?.nombre
    }));

    const proveedorOptions = dataProveedor?.map(option => ({
        value: option?.id,
        label: option?.nombre
    }));



    const expectedColumns = [
        'item', 'descripcion', 'cajas', 'cantidadxCaja', 'cantidad',
        'precio_unitario', 'familia_id', 'grupo_id', 'marca_id', 'unidad',
        'precioLista', 'precio1', 'precio2', 'precio3', 'precioSuelto',
        'precioPaquete', 'tono', 'fiscal'
    ];

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });

            const sheetName = workbook.SheetNames[0];
            const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

            const dataFromSecondRow = worksheet.slice(1);

            // Asegurarse de que cada fila tenga exactamente 19 columnas
            const filledData = dataFromSecondRow.map(row => {
                const filledRow = [...row];
                while (filledRow.length < expectedColumns.length) {
                    filledRow.push(""); // Rellenar con vacío si falta
                }
                // Si hay más de 19 columnas, las recortamos
                return filledRow.slice(0, expectedColumns.length);
            });

            setExcelData(filledData);
            setEditedData(filledData);
        };

        reader.readAsBinaryString(file);
    };

    const handleInputChange = (rowIndex, colIndex, value) => {
        const updatedData = [...editedData];
        updatedData[rowIndex][colIndex] = value;
        setEditedData(updatedData);
    };

    const handleSubmit = async () => {
        try {
            if (!factura || !fecha || !almacen?.value || !proveedor?.value || editedData.length === 0) {
                setErrorMessage('Por favor, complete todos los campos requeridos y cargue los datos del Excel.');
                return;  // Evitar que continúe si falta algo
            }

            const detalles = editedData.map(row => {
                const obj = {};
                expectedColumns.forEach((col, index) => {
                    obj[col] = row[index];  // Asignar cada valor al campo correcto
                });
                return {
                    item: obj.item,
                    cantidad: obj.cantidad,
                    precio_unitario: obj.precio_unitario
                }; // Solo los campos necesarios para 'detalles'
            });

            // Construir el objeto final con los datos de factura, fecha, almacen y proveedor
            const payload = {
                factura: factura,
                fecha: fecha,
                almacen_id: almacen?.value,  // Extraer solo el ID
                proveedor_id: proveedor?.value,  // Extraer solo el ID
                detalles: detalles
            };

            bdAdmin
                .post(URL, payload, getAuthHeaders())
                .then((res) => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Compra creado",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setErrorMessage('');
                })
                .catch((err) => {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Contacte con soporte",
                        showConfirmButton: false,
                    });
                });

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClear = () => {
        setFactura('');
        setFecha('');  
        setAlmacen(null);
        setProveedor(null);
        setExcelData([]);
        setEditedData([]);
        setErrorMessage('');
    };


    return (
        <div className="container mt-1">
            <h2 className="mb-1">Cargar y editar Excel</h2>

            <Row>
                <Col>
                    <div className='form-group'>
                        <label>Ingrese Factura</label>
                        <input
                            type="text"
                            className='form-control'
                            value={factura}
                            onChange={handleFacturaChange}
                            required
                        />
                    </div>
                </Col>
                <Col>
                    <div className='form-group'>
                        <label>Fecha</label>
                        <input
                            type='date'
                            className='form-control'
                            value={fecha}
                            onChange={handleFechaChange}
                            required
                        />
                    </div>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col>
                    <div className='form-group'>
                        <label>
                            Almacen
                        </label>
                        <Select
                            id="almacen"
                            value={almacen}
                            onChange={handleAlmacenChange}
                            options={almacenOptions}
                            isSearchable={true}
                            placeholder="No especifica"
                        />

                    </div>
                </Col>
                <Col>
                    <div className='form-group'>
                        <label>
                            Proveedor
                        </label>
                        <Select
                            id="proveedor"
                            value={proveedor}
                            onChange={handleProveedorChange}
                            options={proveedorOptions}
                            isSearchable={true}
                            placeholder="No especifica"
                        />
                    </div>
                </Col>
            </Row>

            <input
                type="file"
                className="form-control"
                onChange={handleFileUpload}
                accept=".xls,.xlsx"
            />
            <Row>
                <Col sm="8">
                    {errorMessage && (
                        <div className="alert alert-danger mt-3" style={{ color: "red" }}>{errorMessage}</div>
                    )}
                </Col>
                <Col sm="2">
                    <button type='submit' className="btn btn-primary mt-3" onClick={handleSubmit}>
                        Enviar Datos
                    </button>
                </Col>
                <Col sm="2">
                    <button className="btn btn-info mt-3" onClick={handleClear}>
                        Limpiar datos
                    </button>
                </Col>
            </Row>




            {excelData.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover">
                        <thead className="thead-dark">
                            <tr>
                                {expectedColumns.map((columnName, index) => (
                                    <th key={index} className="custom-width-150 text-center">{columnName}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {editedData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, colIndex) => (
                                        <td key={colIndex}>
                                            <input
                                                type="text"
                                                value={cell || ''}
                                                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                                                style={{ border: '0px solid black' }}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}


        </div>
    );
};


export default SubirCompra;
