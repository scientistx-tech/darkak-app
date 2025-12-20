import { BannerCard } from '@/components/banner/banner-card';
import { Colors, Spacing } from '@/constants/theme';
import { mockBanners } from '@/data/mock-data';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { getSliderRequest } from '@/redux/actions/slider.action';
import { RootState } from '@/redux/store';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export function BannerSection() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const screenWidth = Dimensions.get('window').width;
  const bannerWidth = screenWidth - Spacing.base * 2;
  const flatListRef = useRef<FlatList<any> | null>(null);
  const [bannerIndex, setBannerIndex] = useState(0);

  const dispatch = useDispatch();


  const sliderDataHeader = useSelector((state:RootState)=>state.sliderAll);

  console.log("slider data shown:---------",sliderDataHeader);


  useFocusEffect(
    React.useCallback(() => {
      dispatch(getSliderRequest());
    }, [dispatch]),
  );

  useEffect(() => {
    if (!mockBanners || mockBanners.length <= 1) return;
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % mockBanners.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!flatListRef.current) return;
    const offset = bannerIndex * (bannerWidth + Spacing.md);
    try {
      flatListRef.current.scrollToOffset({ offset, animated: true });
    } catch {
      // ignore scroll errors
    }
  }, [bannerIndex, bannerWidth]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={(r) => { flatListRef.current = r; }}
        horizontal
        data={mockBanners}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        decelerationRate="fast"
        snapToAlignment="center"
        snapToInterval={bannerWidth + Spacing.md}
        contentContainerStyle={styles.bannerList}
        renderItem={({ item }) => (
          <View style={{ width: bannerWidth, marginRight: Spacing.sm }}>
            <BannerCard banner={item} onPress={() => {}} />
          </View>
        )}
      />

      <View style={styles.dotsContainer}>
        {mockBanners.map((_, idx) => (
          <View
            key={`dot-${idx}`}
            style={[
              styles.dot,
              { backgroundColor: idx === bannerIndex ? colors.primary : '#D6E1F2' },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  bannerList: {
    paddingHorizontal: Spacing.base,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
  },
});
