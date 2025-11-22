import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProductDetails from './[id]'

const index = () => {
  return (
    <ScrollView>
      
    <View>
      <ProductDetails/>
      <View>
        <Text>Product Code: MA394031</Text>
        <Text>Warranty Type: darkak (7)</Text>
      </View>
    </View>
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})