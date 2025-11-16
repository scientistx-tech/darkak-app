import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExpandableTextCard from '../footerUpeer/FooterUpper'
import { footerData } from '@/data/mock-data'

const FooterUpperSection = () => {
  return (
    <View style={appStyles.container}>
      <ExpandableTextCard
        initialText={footerData.initialWelcomeText}
        expandedText={footerData.fullExpandedText}
      />
    </View>
  )
}



const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light background for the overall app
    justifyContent: 'center',
  },
});

export default FooterUpperSection