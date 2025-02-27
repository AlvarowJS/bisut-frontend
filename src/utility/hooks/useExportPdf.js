import React from 'react'
import Remision from '../../components/ventas/generarDocumentos/Remision';
import Factura from '../../components/ventas/generarDocumentos/Factura';
import Cotizacion from '../../components/ventas/generarDocumentos/Cotizacion';
import { pdf } from "@react-pdf/renderer";
export const useExportPdf = () => {

    const handleViewPDF = async(data) => {
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
    }

    return {
        handleViewPDF
    }

}
