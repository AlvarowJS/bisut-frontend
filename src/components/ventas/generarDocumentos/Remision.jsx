import React from 'react'
import { Document, Page, Image, Text, View, StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        padding: 20
    },
    section: {
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    text: {
        fontSize: 12,
    },
    logo: {
        width: 100, // Ancho de la imagen
        height: 50, // Alto de la imagen
        marginBottom: 10,
    }

});
const Remision = ({ data }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Image style={styles.logo} src={"/logo.png"} />
                <View style={styles.section}>
                    <Text style={styles.title}>{data?.almacen?.nombre}</Text>
                    <Text style={styles.title}>R.F.C. CUHC7005259A7</Text>
                    <Text style={styles.title}>{data?.almacen?.direccion}</Text>
                    <Text style={styles.text}>{data?.almacen?.telefono}</Text>
                    <Text style={styles.text}>Nota: {data?.identificador}</Text>
                    <Text style={styles.text}>Fecha: {data?.fecha} - {data?.hora}</Text>
                    <Text style={styles.text}>Cliente: {data?.cliente?.nombre}</Text>

                    <Text>Vendedor: {data?.user?.name}</Text>
                    <Text>Forma Pago: {data?.medio_pago}</Text>
                    <Text style={styles.title}>NO SE ACEPTAN CAMBIOS NI DEVOLUCONES</Text>
                    <Text style={styles.title}>ESTE DOCUMENTO ES SIMPLIFICADO PARA EFECTOS FISCALES ESTE TICKET SE REPORTA EN EL CFDI GLOBAL DEL DIA</Text>
                </View>
            </Page>
        </Document>
    )
}

export default Remision