import React from 'react'
import { Document, Page, Image, Text, View, StyleSheet } from "@react-pdf/renderer"
const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        padding: 20
    },
    section: {
        marginBottom: 10
    },
    title: {
        fontSize: 10,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: 'center'
    },
    text: {
        fontSize: 7
    },
    textTitle: {
        fontSize: 7,
        textAlign: 'center'
    },
    logo: {
        width: 100,
        height: 50
        // marginBottom: 10
    },
    logoChico: {
        width: 10,
        height: 10,
        marginRight: 5
    },
    table: {
        display: "flex",
        flexDirection: "column",
        marginTop: 10
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        paddingVertical: 4
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'

    },
    box: {
        borderWidth: 1,
        padding: 3,
        fontSize: 6
    },
    rowIcon: {
        flexDirection: "row",
        paddingVertical: 2
    },
    container: {
        flexDirection: "row",
        width: "100%"
    },
    column: {
        flex: 1,
        // border: "1px solid black",
        padding: 5,
        fontSize: 8
    },
    label: {
        fontWeight: "bold"
        // border: "1px solid black"
    },
    header: {
        fontWeight: "bold"
    },
    columnNormal: {
        width: 30,
        fontSize: 6
    },
    total: {
        fontWeight: "bold",
        fontSize: 10,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#000"

    },
    columnCnt: { width: 25, fontSize: 6, textAlign: "center" },
    columnProducto: { width: 80, fontSize: 6, paddingHorizontal: 2 },
    columnPrecio: { width: 40, fontSize: 6, textAlign: "right" },
    columnTotal: { width: 40, fontSize: 6, textAlign: "right" }
})
const Remision = ({ data }) => {
    return (
        <Document>
            <Page size={[198.45, 'auto']} style={styles.page}>
                <View style={styles.section}>
                    <Image style={styles.logo} src={"/logo.png"} />
                    <Text style={styles.title}>{data?.almacen?.nombre}</Text>
                    <Text style={styles.textTitle}>R.F.C. CUHC7005259A7</Text>
                    <Text style={styles.textTitle}>{data?.almacen?.direccion}</Text>
                    <Text style={styles.textTitle}>TEL: {data?.almacen?.telefono}</Text>
                    <View style={styles.container}>
                        <View style={styles.column}>
                            <Text style={styles.label}>Nota:</Text>
                            <Text style={styles.label}>Fecha:</Text>
                            <Text style={styles.label}>Cliente:</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.text}>{data?.identificador}</Text>
                            <Text style={styles.text}>{data?.fecha} - {data?.hora}</Text>
                            <Text style={styles.text}>{data?.cliente?.nombre_completo}</Text>
                        </View>
                    </View>

                    <View style={styles.table}>
                        {/* Encabezado de la tabla */}
                        <View style={[styles.row, styles.header]}>
                            <Text style={styles.columnCnt}>Cnt</Text>
                            <Text style={styles.columnProducto}>Producto</Text>
                            <Text style={styles.columnPrecio}>Precio</Text>
                            <Text style={styles.columnTotal}>Total</Text>
                        </View>

                        {/* Filas con los detalles */}
                        {data?.detalles_venta?.map((detalle, index) => (
                            <View key={index} style={styles.row}>
                                <Text style={styles.columnCnt}>{detalle.cantidad_venta}</Text>
                                <Text style={styles.columnProducto}>{detalle.item} - {detalle.descripcion}</Text>
                                <Text style={styles.columnPrecio}>${detalle.precio_venta}</Text>
                                <Text style={styles.columnTotal}>{detalle.importe}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.container}>
                        <View style={styles.column}>
                            <Text style={styles.total}>Total:</Text>
                            <Text style={styles.label}>Vendedor:</Text>
                            <Text style={styles.label}>Forma Pago:</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.total}>${data?.total}</Text>
                            <Text>{data?.user?.name}</Text>
                            <Text>{data?.medio_pago}</Text>
                        </View>

                    </View>


                    <View style={styles.box}>
                        <Text style={styles.textTitle}>NO SE ACEPTAN CAMBIOS NI DEVOLUCONES</Text>
                        <Text style={styles.textTitle}>ESTE DOCUMENTO ES SIMPLIFICADO PARA EFECTOS FISCALES </Text>
                        <Text style={styles.textTitle}>ESTE TICKET SE REPORTA EN EL CFDI GLOBAL DEL DIA</Text>
                    </View>

                    <View style={styles.rowIcon}>
                        <Image style={styles.logoChico} src={"/whatsapp.png"} />
                        <Text style={styles.text}> {data?.almacen?.telefono}</Text>
                    </View>
                    <View style={styles.rowIcon}>
                        <Image style={styles.logoChico} src={"/facebook.png"} />
                        <Text style={styles.text}>Echo Beauty Store</Text>
                    </View>
                    <View style={styles.rowIcon}>
                        <Image style={styles.logoChico} src={"/instagram.png"} />
                        <Text style={styles.text}>@echobeautystore</Text>
                    </View>
                    <View style={styles.rowIcon}>
                        <Image style={styles.logoChico} src={"/tiktok.png"} />
                        <Text style={styles.text}>@echobeautystore</Text>
                    </View>
                    <View style={styles.rowIcon}>
                        <Image style={styles.logoChico} src={"/correo.png"} />
                        <Text style={styles.text}>echobeautystore@gmail.com</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default Remision