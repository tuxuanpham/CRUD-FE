import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create PDF component
function handleExportToPDF({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Product ID</Text>
          <Text>Name of product</Text>
          <Text>Manufacturer</Text>
          <Text>Price</Text>
          <Text>Quantity</Text>
          <Text>Total price</Text>
        </View>
        {data.map(item => (
          <View key={item.id} style={styles.section}>
            <Text>{item.id}</Text>
            <Text>{item.name}</Text>
            <Text>{item.manufacturer}</Text>
            <Text>{item.price} USD</Text>
            <Text>{item.quantity}</Text>
            <Text>{item.quantity * item.price} USD</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}

export default handleExportToPDF