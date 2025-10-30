import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Banner } from '@/types';
import { readableTextColor } from '@/utils/color';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface BannerCardProps {
  banner: Banner;
  onPress?: () => void;
  compact?: boolean;
}

export const BannerCard: React.FC<BannerCardProps> = ({ banner, onPress, compact = false }) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const bg = banner.backgroundColor || colors.primary;
  const textColor = readableTextColor(bg);

  const height = compact ? 140 : 180;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.container, { backgroundColor: bg, height }]}
    >
      <View style={styles.inner}>
        <View style={styles.left}>
          {banner.discount ? (
            <View style={[styles.discount, { backgroundColor: 'rgba(255,255,255,0.14)' }]}>
              <Text style={[styles.discountText, { color: textColor }]}>{banner.discount}</Text>
            </View>
          ) : null}

          <Text style={[styles.title, { color: textColor }]} numberOfLines={2}>{banner.title}</Text>

          {banner.subtitle ? (
            <Text style={[styles.subtitle, { color: textColor }]} numberOfLines={2}>{banner.subtitle}</Text>
          ) : null}

          {banner.actionText ? (
            <View style={styles.actionWrap} pointerEvents="box-none">
              <View style={[styles.actionButton, { backgroundColor: 'rgba(255,255,255,0.98)' }]}>
                <Text style={[styles.actionText, { color: bg }]}>{banner.actionText}</Text>
              </View>
            </View>
          ) : null}
        </View>

        <View style={styles.right}>
          <Image
            source={typeof banner.image === 'number' ? banner.image : { uri: banner.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    width: '100%',
    height: 180,
    // shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    // elevation for Android
    elevation: 3,
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  left: {
    width: '60%',
  },
  right: {
    width: '40%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  discount: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  actionWrap: {
    marginTop: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
  },
  image: {
    width: 120,
    height: 120,
  },
});

