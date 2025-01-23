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
    },
    text: {
        fontSize: 12,
    }
});
const Factura = () => {

  return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Reporte de Factura</Text>
                    <Text style={styles.text}>Este es un ejemplo de documento en PDF.</Text>
                </View>
            </Page>
        </Document>
  )
}

export default Factura