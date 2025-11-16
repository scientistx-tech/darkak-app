import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface ExpandableTextCardProps {
  initialText: string;
  expandedText: string;
}

const ExpandableTextCard: React.FC<ExpandableTextCardProps> = ({ initialText, expandedText }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    // Configure LayoutAnimation for smooth transitions
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  const renderBulletPoints = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.trim().startsWith('✅')) {
        return (
          <View key={index} style={styles.bulletPointRow}>
            <Text style={styles.bulletIcon}>⚫</Text>
            <Text style={styles.expandedContentText}>{line.replace('✅', '').trim()}</Text>
          </View>
        );
      }
      if (line.trim().length > 0 && !line.trim().startsWith('Looking for the best') && !line.trim().startsWith('World-Class Health & Beauty') && !line.trim().startsWith('Start your self-care') && !line.trim().startsWith('Why Darkak Mart') && !line.trim().startsWith('Start Your Daily Smart Shopping')) {
        return <Text key={index} style={styles.expandedContentSectionTitle}>{line}</Text>;
      }
      return <Text key={index} style={styles.expandedContentText}>{line}</Text>;
    });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.mainTitle}>
        Welcome to Darkak Mart | Bangladeshs Trusted Online Store for Smart Shopping
      </Text>

      <Text numberOfLines={isExpanded ? undefined : 6} style={styles.initialContentText}>
        {initialText}
        {/* If not expanded and initial text is shorter than total expanded text, show ellipses */}
        {!isExpanded && (
          <Text style={styles.ellipsis}>...</Text>
        )}
      </Text>

      {isExpanded && (
        <View style={styles.expandedContentContainer}>
          {renderBulletPoints(expandedText)}
        </View>
      )}

      <TouchableOpacity onPress={toggleExpand} style={styles.seeMoreButton}>
        <Text style={styles.seeMoreButtonText}>
          {isExpanded ? 'See Less' : 'See More'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 7,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  initialContentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 10,
  },
  ellipsis: {
    color: '#555',
    // position: 'absolute', // Not strictly needed with numberOfLines
    // bottom: 0,
    // right: 0,
    backgroundColor: 'white', // To make sure it overlays cleanly if needed
  },
  expandedContentContainer: {
    marginTop: 10,
  },
  expandedContentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 5, // Space between bullet points
    flexShrink: 1, // Allows text to wrap
  },
  expandedContentSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
  },
  bulletPointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align icon and text at the top
    marginBottom: 5,
  },
  bulletIcon: {
    fontSize: 16,
    color: '#000',
    marginRight: 8,
    // Ensure the bullet point aligns with the text baseline
    lineHeight: 24,
  },
  seeMoreButton: {
    alignSelf: 'flex-end', // Aligns button to the right
    marginTop: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    // No background or border to mimic the image
  },
  seeMoreButtonText: {
    color: '#007bff', // Blue color for the link
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ExpandableTextCard;