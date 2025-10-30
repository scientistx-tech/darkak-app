import Button from '@/components/ui/button';
import { Header } from '@/components/ui/Header';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { mockProducts } from '@/data/mock-data';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,

  View,
} from 'react-native';

export default function ProductScreen() {
  const { id } = useLocalSearchParams() as { id?: string };
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const product = mockProducts.find((p) => p.id === id) ?? mockProducts[0];

  const formatPrice = (amount: number) => `${amount.toLocaleString('en-US', { minimumFractionDigits: 0 })} TK`;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="dark" />

      {/* Header */}
      <Header
        showBack
        onBack={() => router.back()}
        title="Product"
        rightIcon={<Ionicons name="git-compare-outline" size={20} color={colors.text} />}
        onRightPress={() => { /* share / more */ }}
      />



      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrap}>
          <View style={[styles.imageCard, { backgroundColor: product.backgroundColor ?? colors.surface }]}>
            <Image
              source={typeof product.image === 'number' ? product.image : { uri: product.image }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          {/* small pagination dots mock */}
          <View style={styles.dotsRow}>
            <View style={[styles.dot, { backgroundColor: colors.primary }]} />
            <View style={[styles.dot, { backgroundColor: '#D6E1F2' }]} />
            <View style={[styles.dot, { backgroundColor: '#D6E1F2' }]} />
          </View>
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginTop: Spacing.md,
        }}>
          <Button
            variant="outline"
            title="12GB/128GB"
            icon={<FontAwesome name="angle-down" size={18} color="#FFFFFF" />}
            onPress={() => console.log('pressed')}
            style={{ flex: 1, marginRight: Spacing.sm }}
          />
          <Button
            variant="outline"
            title="BLACK"
            icon={<FontAwesome name="angle-down" size={18} color="#FFFFFF" />}
            onPress={() => console.log('pressed')}
            style={{ paddingHorizontal: 18, flex: 1, marginLeft: Spacing.sm }}
          />
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#5694FF",
            width: 36,
            height: 36,
            borderRadius: 28,
            marginLeft: Spacing.sm,
          }}>
            <Entypo name="heart" size={22} color='#FFFFFF' />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={[styles.brand, { color: colors.textSecondary }]}>{product.brand}</Text>
          <Text style={[styles.name, { color: colors.text }]}>{product.name}</Text>

          <View style={styles.rowBetween}>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color={colors.ratingActive} />
              <Text style={[styles.ratingText, { color: colors.text }]}>{product.rating.toFixed(1)}</Text>
              <Text style={[styles.reviewCount, { color: colors.textTertiary }]}>({product.reviewCount})</Text>
            </View>
            <Text style={[styles.price, { color: colors.primary }]}>{formatPrice(product.price)}</Text>
          </View>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Description</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>{product.description}</Text>

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* Bottom action bar */}
      <View style={[styles.bottomBar, { backgroundColor: colors.surface }]}>
        <Button
          variant="filled"
          title="BUY NOW"
          onPress={() => {}}
          style={styles.buyButton}
          textStyle={styles.buyText}
        />
        <Button
          variant="outline"
          title="ADD TO CART"
          onPress={() => {}}
          style={styles.cartButton}
          textStyle={styles.cartText}
        />
      </View>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth * 0.7;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
  },
  iconButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: Typography.fontSizes.lg, fontWeight: Typography.fontWeights.semibold },
  scrollContent: { paddingBottom: Spacing['4xl'], paddingHorizontal: Spacing.base },
  imageWrap: {
    alignItems: 'center',
    width: '100%',
    marginTop: Spacing.md,
  },
  imageCard: {
    width: '100%',
    height: imageSize,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.md,
  },
  image: { width: '100%', height: '100%' },
  dotsRow: { flexDirection: 'row', marginTop: Spacing.sm },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 6 },
  card: { marginTop: Spacing.md, paddingHorizontal: 0 },
  brand: { fontSize: Typography.fontSizes.xs, textTransform: 'uppercase', marginBottom: 6 },
  name: { fontSize: Typography.fontSizes['2xl'], fontWeight: Typography.fontWeights.bold, marginBottom: Spacing.sm },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: 6, fontSize: Typography.fontSizes.sm },
  reviewCount: { marginLeft: 6, fontSize: Typography.fontSizes.xs },
  price: { fontSize: Typography.fontSizes['2xl'], fontWeight: Typography.fontWeights.bold },
  sectionTitle: { marginTop: Spacing.md, marginBottom: Spacing.xs, fontSize: Typography.fontSizes.sm, fontWeight: Typography.fontWeights.semibold },
  description: { fontSize: Typography.fontSizes.base, lineHeight: 20 },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.sm,
    alignItems: 'center',
  },
  buyButton: {
    flex: 1,
    paddingVertical: Spacing.md,
      borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyText: { fontWeight: Typography.fontWeights.bold },
  cartButton: {
    marginLeft: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 50,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartText: { fontWeight: Typography.fontWeights.semibold 
  },
});
