import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

// Review Type
interface Review {
  id: string;
  productName: string;
  productImage?: string;
  rating: number;
  reviewText?: string;
  date: string;
  status: 'pending' | 'completed' | 'followup';
  orderId: string;
}

interface MyReviewComponentProps {
  onBack: () => void;
}

type ReviewTab = 'toReview' | 'toFollowUp' | 'history';

const MyReviewComponent: React.FC<MyReviewComponentProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<ReviewTab>('toReview');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5); // 5 reviews per page

  // Mock data for different tabs
  const mockReviews: { [key in ReviewTab]: Review[] } = {
    toReview: [
      {
        id: '1',
        productName: 'Wireless Bluetooth Headphones',
        rating: 0,
        date: '2024-03-15',
        status: 'pending',
        orderId: 'ORD-12345'
      },
      {
        id: '2',
        productName: 'Smart Watch Series 5',
        rating: 0,
        date: '2024-03-12',
        status: 'pending',
        orderId: 'ORD-12346'
      },
      {
        id: '3',
        productName: 'USB-C Fast Charger',
        rating: 0,
        date: '2024-03-10',
        status: 'pending',
        orderId: 'ORD-12347'
      }
    ],
    toFollowUp: [
      {
        id: '4',
        productName: 'Laptop Backpack',
        rating: 4,
        reviewText: 'Good quality but could be better',
        date: '2024-03-08',
        status: 'followup',
        orderId: 'ORD-12348'
      },
      {
        id: '5',
        productName: 'Wireless Mouse',
        rating: 3,
        reviewText: 'Average performance',
        date: '2024-03-05',
        status: 'followup',
        orderId: 'ORD-12349'
      },
      {
        id: '6',
        productName: 'Mechanical Keyboard',
        rating: 5,
        reviewText: 'Excellent typing experience!',
        date: '2024-03-03',
        status: 'followup',
        orderId: 'ORD-12350'
      }
    ],
    history: [
      {
        id: '7',
        productName: 'Phone Case',
        rating: 4,
        reviewText: 'Fits perfectly and good protection',
        date: '2024-03-01',
        status: 'completed',
        orderId: 'ORD-12351'
      },
      {
        id: '8',
        productName: 'Power Bank 20000mAh',
        rating: 5,
        reviewText: 'Long lasting battery, very satisfied',
        date: '2024-02-28',
        status: 'completed',
        orderId: 'ORD-12352'
      },
      {
        id: '9',
        productName: 'Wireless Earbuds',
        rating: 4,
        reviewText: 'Good sound quality, comfortable fit',
        date: '2024-02-25',
        status: 'completed',
        orderId: 'ORD-12353'
      },
      {
        id: '10',
        productName: 'Tablet Stand',
        rating: 3,
        reviewText: 'Sturdy but could be more adjustable',
        date: '2024-02-22',
        status: 'completed',
        orderId: 'ORD-12354'
      },
      {
        id: '11',
        productName: 'Bluetooth Speaker',
        rating: 5,
        reviewText: 'Amazing sound quality!',
        date: '2024-02-20',
        status: 'completed',
        orderId: 'ORD-12355'
      },
      {
        id: '12',
        productName: 'Phone Charger Cable',
        rating: 2,
        reviewText: 'Stopped working after 2 weeks',
        date: '2024-02-18',
        status: 'completed',
        orderId: 'ORD-12356'
      }
    ]
  };

  // Render star ratings
  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <MaterialIcons
            key={star}
            name={star <= rating ? "star" : "star-border"}
            size={16}
            color={star <= rating ? "#FFD700" : "#ccc"}
          />
        ))}
      </View>
    );
  };

  // Get tab data based on active tab
  const getTabData = () => {
    return mockReviews[activeTab];
  };

  // Simulate API call
  const fetchReviews = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [activeTab]);

  // Pagination logic
  const currentTabData = getTabData();
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = currentTabData.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(currentTabData.length / reviewsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleTabChange = (tab: ReviewTab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when tab changes
  };

  const handleWriteReview = (reviewId: string) => {
    console.log('Write review for:', reviewId);
    // Navigate to review writing screen
  };

  const handleEditReview = (reviewId: string) => {
    console.log('Edit review:', reviewId);
    // Navigate to review editing screen
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading reviews...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>My Review</Text>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'toReview' && styles.activeTab
            ]}
            onPress={() => handleTabChange('toReview')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'toReview' && styles.activeTabText
            ]}>
              To Review
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'toFollowUp' && styles.activeTab
            ]}
            onPress={() => handleTabChange('toFollowUp')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'toFollowUp' && styles.activeTabText
            ]}>
              To Follow-Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'history' && styles.activeTab
            ]}
            onPress={() => handleTabChange('history')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'history' && styles.activeTabText
            ]}>
              History
            </Text>
          </TouchableOpacity>
        </View>

        {/* Reviews List */}
        {currentReviews.length === 0 ? (
          <View style={styles.emptyContainer}>
            <FontAwesome name="comments-o" size={64} color="#ccc" />
            <Text style={styles.emptyText}>
              {activeTab === 'toReview' && 'No products to review'}
              {activeTab === 'toFollowUp' && 'No follow-up reviews'}
              {activeTab === 'history' && 'No review history'}
            </Text>
          </View>
        ) : (
          <View style={styles.reviewsContainer}>
            {currentReviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.productName}>{review.productName}</Text>
                  <Text style={styles.orderId}>{review.orderId}</Text>
                </View>

                <View style={styles.reviewContent}>
                  {review.rating > 0 ? (
                    <View style={styles.ratingContainer}>
                      {renderStars(review.rating)}
                      <Text style={styles.ratingText}>{review.rating}/5</Text>
                    </View>
                  ) : (
                    <Text style={styles.pendingText}>Pending Review</Text>
                  )}

                  {review.reviewText && (
                    <Text style={styles.reviewText}>{review.reviewText}</Text>
                  )}

                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>

                <View style={styles.reviewActions}>
                  {activeTab === 'toReview' && (
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleWriteReview(review.id)}
                    >
                      <Text style={styles.actionButtonText}>Write Review</Text>
                    </TouchableOpacity>
                  )}

                  {activeTab === 'toFollowUp' && (
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleEditReview(review.id)}
                    >
                      <Text style={styles.actionButtonText}>Edit Review</Text>
                    </TouchableOpacity>
                  )}

                  {activeTab === 'history' && (
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleEditReview(review.id)}
                    >
                      <Text style={styles.actionButtonText}>View Details</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Pagination - Show only if there are reviews */}
        {currentReviews.length > 0 && (
          <View style={styles.paginationContainer}>
            <View style={styles.pagination}>
              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  currentPage === 1 && styles.disabledButton
                ]}
                onPress={prevPage}
                disabled={currentPage === 1}
              >
                <Text style={styles.paginationSymbol}>〈</Text>
              </TouchableOpacity>

              <View style={styles.pageInfo}>
                <Text style={styles.pageText}>
                  {currentPage} of {totalPages}
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  currentPage === totalPages && styles.disabledButton
                ]}
                onPress={nextPage}
                disabled={currentPage === totalPages}
              >
                <Text style={styles.paginationSymbol}>〉</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 16,
    paddingTop: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '500',
  },
  reviewsContainer: {
    marginBottom: 20,
  },
  reviewCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  orderId: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#e9ecef',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  reviewContent: {
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  pendingText: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: '600',
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  reviewActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  paginationContainer: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    padding: 4,
  },
  paginationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  paginationSymbol: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pageInfo: {
    paddingHorizontal: 20,
  },
  pageText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
});

export default MyReviewComponent;