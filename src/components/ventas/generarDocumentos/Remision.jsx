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
        fontSize: 10,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: 'center'
    },
    text: {
        fontSize: 7,
    },
    textTitle: {
        fontSize: 7,
        textAlign: 'center'
    },
    logo: {
        width: 100, // Ancho de la imagen
        height: 50, // Alto de la imagen
        marginBottom: 10,
    },
    logoChico: {
        width: 10, // Ancho de la imagen
        height: 10, // Alto de la imagen        
    },
    table: {
        display: "flex",
        flexDirection: "column",
        marginTop: 10,
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        paddingVertical: 4,
    },
    box: {
        borderWidth: 1,
    },
    rowIcon: {
        flexDirection: "row",
        paddingVertical: 2,
    },
    column: {
        flex: 1,
        fontSize: 6,
        paddingHorizontal: 1
    },
    header: {
        fontWeight: "bold",
    },
    columnCnt: { width: 25, fontSize: 6, textAlign: "center" }, // Ancho fijo para cantidad
    columnProducto: { width: 80, fontSize: 6, paddingHorizontal: 2 }, // Ancho fijo para producto
    columnPrecio: { width: 40, fontSize: 6, textAlign: "right" }, // Ancho fijo para precio
    columnTotal: { width: 40, fontSize: 6, textAlign: "right" },
});
const Remision = ({ data }) => {
    return (
        <Document>
            <Page size={[198.45, 'auto']} style={styles.page}>
                <Image style={styles.logo} src={"/logo.png"} />
                <View style={styles.section}>
                    <Text style={styles.title}>{data?.almacen?.nombre}</Text>
                    <Text style={styles.textTitle}>R.F.C. CUHC7005259A7</Text>
                    <Text style={styles.textTitle}>{data?.almacen?.direccion}</Text>
                    <Text style={styles.text}>TEL: {data?.almacen?.telefono}</Text>
                    <Text style={styles.text}>Nota: {data?.identificador}</Text>
                    <Text style={styles.text}>Fecha: {data?.fecha} - {data?.hora}</Text>
                    <Text style={styles.text}>Cliente: {data?.cliente?.nombre_completo}</Text>
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
                        <Text style={styles.text}>Total: ${data?.total}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Vendedor:</Text>
                        <Text style={styles.text}>{data?.user?.name}</Text>
                    </View>
                    <View style={styles.rowIcon}>
                        <Text style={styles.text}>Forma Pago:</Text>
                        <Text style={styles.text}>{data?.medio_pago}</Text>
                    </View>

                    <Text style={styles.text}>Vendedor: {data?.user?.name}</Text>
                    <Text style={styles.text}>Forma Pago: {data?.medio_pago}</Text>
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