import React from 'react'
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

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
        textAlign: "center"
    },
    text: {
        fontSize: 12,
    },
    table: {
        display: "flex",
        flexDirection: "column",
        borderWidth: 1,
        borderColor: "#000",
        marginTop: 10
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        paddingVertical: 4
    },
    header: {
        backgroundColor: "#D3D3D3",
        fontWeight: "bold",
    },
    subheader: {
        fontSize: 12
    },
    columnItem: { width: "30%", fontSize: 10, textAlign: "center" },
    columnDescripcion: { width: "40%", fontSize: 10, paddingHorizontal: 4 },
    columnCant: { width: "10%", fontSize: 10, textAlign: "center" },
    columnPrecio: { width: "10%", fontSize: 10, textAlign: "right", paddingRight: 4 },
    columnImporte: { width: "10%", fontSize: 10, textAlign: "right", paddingRight: 4 },
    totalRow: {
        flexDirection: "row",
        // borderTopWidth: 1,
        borderTopColor: "#000",
        paddingVertical: 4,
        fontWeight: "bold"
    }
});

const Cotizacion = ({ data }) => {
    return (
        <Document>
            <Page size={[612, 'auto']} style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>ECHO BEAUTY STORE</Text>
                    <Text style={styles.title}>Cotización</Text>
                </View>
                <View style={styles.subheader}>
                    <Text>Folio: {data?.identificador}</Text>
                    <Text>Fecha: {data?.fecha}</Text>
                    <Text>Cliente: {data?.cliente?.nombre_completo}</Text>
                </View>

                {/* Tabla */}
                <View style={styles.table}>
                    {/* Encabezado */}
                    <View style={[styles.row, styles.header]}>
                        <Text style={styles.columnItem}>ITEM</Text>
                        <Text style={styles.columnDescripcion}>DESCRIPCIÓN</Text>
                        <Text style={styles.columnCant}>CANT</Text>
                        <Text style={styles.columnPrecio}>PRECIO</Text>
                        <Text style={styles.columnImporte}>IMPORTE</Text>
                    </View>

                    {/* Filas de la tabla */}
                    {data?.detalles_venta?.map((detalle, index) => (
                        <View key={index} style={styles.row}>
                            <Text style={styles.columnItem}>{detalle.item}</Text>
                            <Text style={styles.columnDescripcion}>{detalle.descripcion}</Text>
                            <Text style={styles.columnCant}>{detalle.cantidad_venta}</Text>
                            <Text style={styles.columnPrecio}>${detalle.precio_venta}</Text>
                            <Text style={styles.columnImporte}>${detalle.importe}</Text>
                        </View>
                    ))}

                    {/* Total */}
                    <View style={styles.totalRow}>
                        <Text style={styles.columnItem}></Text>
                        <Text style={styles.columnDescripcion}>Total</Text>
                        <Text style={styles.columnCant}></Text>
                        <Text style={styles.columnPrecio}></Text>
                        <Text style={styles.columnImporte}>${data?.total}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default Cotizacion;
