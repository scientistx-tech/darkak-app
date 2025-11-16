import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { faqData } from '@/data/mock-data';
import FooterQuestion from '../footerQuestion/FooterQuestion';

const FooterQuestionSection = () => {
  return (
     <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.faqHeaderSection}>
          <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
          <View style={styles.lineBreak} />
        </View>

        {faqData.map((item, index) => (
          <FooterQuestion key={index} question={item.question} answer={item.answer} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default FooterQuestionSection

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollViewContent: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  faqHeaderSection: {
    marginBottom: 20,
  },
  faqTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    paddingLeft: 5,
  },
  lineBreak: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
});
