import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import bdAdmin from '../../../api/bdAdmin';
import { getAuthHeaders } from '../../../utility/auth/auth';
import { Card, Col, Row } from 'reactstrap';
import Detallesventa from '../../../components/ventas/listarVentas/Detallesventa';
import { pdf } from "@react-pdf/renderer";
import Remision from '../../../components/ventas/generarDocumentos/Remision';
import Factura from '../../../components/ventas/generarDocumentos/Factura';
import Cotizacion from '../../../components/ventas/generarDocumentos/Cotizacion';
const URL = "v1/ventas";

const DetallesVenta = () => {
    const id = useParams();
    const [data, setData] = useState()

    useEffect(() => {
        bdAdmin.get(`${URL}/${id.id}`, getAuthHeaders())
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

    // Exportar PDFs
    const handleViewPDF = async () => {
        try {

            let PDFComponent = null;
            console.log(data?.tipo_factura, "?s")
            if (data?.tipo_factura == 1) {
                PDFComponent = <Remision data={data} />;
            } else if (data?.tipo_factura == 2) {
                console.log("entro")
                PDFComponent = <Factura data={data} />;
            } else if (data?.tipo_factura == 3) {
                PDFComponent = <Cotizacion data={data} />;
            } else {
                console.error("Tipo de factura no válido");
                return;
            }
            const blob = await pdf(PDFComponent).toBlob();
            const url = window.URL.createObjectURL(blob);
            window.open(url, "_blank");
        } catch (error) {
            console.error("Error al generar el PDF:", error);
        }
    };
    return (
        <>
            <Card className="p-1">
                <div className='d-flex justify-content-between align-items-center gap-2 '>
                    <div>
                        <h4 className='text-center'>Tipo de Documento:
                            {
                                data?.tipo_factura == 1 ?
                                    " Remisión"
                                    : data?.tipo_factura == 2 ?
                                        " Factura"
                                        : data?.tipo_factura == 3 ?
                                            " Cotización"
                                            : null
                            } - {data?.identificador}
                        </h4>
                    </div>
                    <div>
                        <button className='btn' style={{ backgroundColor: "red", color: "white" }}
                            onClick={handleViewPDF}
                        >
                            {
                                data?.tipo_factura == 1 ?
                                    "exportar Remisión"
                                    : data?.tipo_factura == 2 ?
                                        "Exportar Factura"
                                        : data?.tipo_factura == 3 ?
                                            "Exportar Cotización"
                                            : null
                            }
                        </button>
                    </div>

                </div>
                <Row>
                    <Col>
                        <p>Cliente: {data?.cliente?.nombre_completo} - {data?.cliente?.telefono}</p>
                        <p>Tienda: {data?.almacen?.nombre} - {data?.almacen?.direccion}</p>
                        <p>Vendedor: {data?.user?.name} - {data?.user?.phone}</p>
                    </Col>
                    <Col>
                        <p>Fecha: {data?.fecha}</p>
                        <p>Hora: {data?.hora}</p>
                    </Col>
                </Row>
            </Card>

            <Row>
                <Col sm="8">
                    <Card className="p-1">
                        <h4>Detalles:</h4>
                        <Row>
                            <Col><p style={{ fontWeight: "bold" }}>Item</p></Col>
                            <Col><p style={{ fontWeight: "bold" }}>Descripción</p></Col>
                            <Col><p style={{ fontWeight: "bold" }}>Cantidad</p></Col>
                            <Col><p style={{ fontWeight: "bold" }}>Precio suelto</p></Col>
                            <Col><p style={{ fontWeight: "bold" }}>Precio venta</p></Col>
                            <Col><p style={{ fontWeight: "bold" }}>Stock</p></Col>
                            <Col><p style={{ fontWeight: "bold" }}>Descuento</p></Col>
                            <Col><p style={{ fontWeight: "bold" }}>Total</p></Col>
                        </Row>
                        {
                            data?.detalles_venta?.map(detalle => (
                                <Detallesventa
                                    key={detalle.id}
                                    detalle={detalle}
                                />
                            ))
                        }
                    </Card>
                </Col>
                <Col sm="4">
                    <Card className="p-2">
                        <p>Importe: ${data?.importe}</p>
                        <p>Descuento: ${data?.descuento}</p>
                        <p>Sub total: ${data?.subTotal}</p>
                        <p>Iva: ${data?.iva}</p>
                        <p>Flete: ${data?.flete}</p>
                        <p>Total: ${data?.total}</p>
                    </Card>
                </Col>
            </Row >
        </>
    )
}

export default DetallesVenta