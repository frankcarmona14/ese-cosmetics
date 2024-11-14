import * as React from 'react';
import { defineWidgetConfig } from '@medusajs/admin-sdk';
import { DetailWidgetProps, AdminCollection } from '@medusajs/framework/types';
import { Document, Page, Text, View, StyleSheet, Image, BlobProvider } from '@react-pdf/renderer';

// Definir estilos
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
  },
  section: {
    padding: 2,
  },
  text: {
    fontSize: 2,
  },
  title: {
    fontSize: 8,
    padding: 2,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    marginHorizontal: "auto",
    width: "15pt",
    height: "15pt",
  }
});

// Crear el componente de documento
const MyDocument = () => (
  <Document>
    <Page size="C10" style={styles.page}>
      <View style={styles.section}>
        <Image
          src="../../../static/logo-ese-cosmetics.png"
          style={styles.image}
        />
        <Text style={styles.title}>Inversiones Ese Cosmeticssss</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Factura de compra</Text>
        <Text style={styles.text}>Fecha: 2021-10-10</Text>
        <Text style={styles.text}>Cliente: Juan Perez</Text>
        <Text style={styles.text}>Dirección: Calle 123</Text>
        <Text style={styles.text}>Teléfono: 1234567890</Text>
      </View>
    </Page>
  </Document>
);
const OrderInvoiceWidget = ({
  data
}: DetailWidgetProps<AdminCollection>) => {

  console.log(data)

  return (
    <BlobProvider document={<MyDocument />}>
      {({ url, loading }) =>
        loading ? (
          'Generando PDF...'
        ) : (
          url && <a href={url} target="_blank" rel="noopener noreferrer">
            Ver Factura
          </a>
        )
      }
    </BlobProvider>
  )
}

export const config = defineWidgetConfig({
  zone: 'order.details.side.before',
})

export default OrderInvoiceWidget