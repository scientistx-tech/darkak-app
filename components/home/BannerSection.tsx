import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import { BannerCard } from '@/components/banner/banner-card';
import { Colors, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { getSliderRequest } from '@/redux/actions/slider.action';
import { RootState } from '@/redux/store';
import type { Banner } from '@/types';

export function BannerSection() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const dispatch = useDispatch();

  const screenWidth = Dimensions.get('window').width;
  const bannerWidth = screenWidth - Spacing.base * 2;

  // Correct ref typing
  const flatListRef = useRef<FlatList<Banner>>(null);
  const [bannerIndex, setBannerIndex] = useState(0);

  const sliderState = useSelector((state: RootState) => state.sliderAll);

  //  API → Banner mapping
  const banners: Banner[] =
    sliderState?.sliderData?.map((item: any) => ({
      id: String(item.id),
      title: item.title,
      subtitle: item.details,
      image: item.banner,
      discount: item.offer_name,
      actionText: 'Shop Now',
      backgroundColor: ['#4F46E5', '#3B82F6'],
    })) ?? [];

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getSliderRequest());
    }, [dispatch]),
  );

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [banners.length]);

  useEffect(() => {
    if (!flatListRef.current) return;

    flatListRef.current.scrollToOffset({
      offset: bannerIndex * (bannerWidth + Spacing.md),
      animated: true,
    });
  }, [bannerIndex, bannerWidth]);

  if (!banners.length) return null;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}                
        horizontal
        data={banners}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        decelerationRate="fast"
        snapToAlignment="center"
        snapToInterval={bannerWidth + Spacing.md}
        contentContainerStyle={styles.bannerList}
        renderItem={({ item }) => (
          <View style={{ width: bannerWidth, marginRight: Spacing.sm }}>
            <BannerCard banner={item} />
          </View>
        )}
      />

      {/* 🔹 Dots indicator */}
      <View style={styles.dotsContainer}>
        {banners.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.dot,
              {
                backgroundColor:
                  idx === bannerIndex ? colors.primary : '#D6E1F2',
              },
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
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
  },
});
