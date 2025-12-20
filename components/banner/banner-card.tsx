import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Banner } from '@/types';
import { readableTextColor } from '@/utils/color';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface BannerCardProps {
  banner: Banner;
  onPress?: () => void;
  compact?: boolean;
}

export const BannerCard: React.FC<BannerCardProps> = ({
  banner,
  onPress,
  compact = false,
}) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const bg = banner.backgroundColor || colors.primary;
  const textColor = readableTextColor(
    Array.isArray(bg) ? bg[0] : bg,
  );

  const gradientColors: [string, string] = Array.isArray(bg)
    ? bg.length >= 2
      ? [bg[0], bg[1]]
      : [bg[0], bg[0] + 'CC']
    : [bg, bg + 'CC'];

  const height = compact ? 140 : 180;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={{ height }}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.container, { height }]}
      >
        <View style={styles.inner}>
          <View style={styles.left}>
            {banner.discount && (
              <View style={styles.discount}>
                <Text style={styles.discountText}>{banner.discount}</Text>
              </View>
            )}

            <Text style={styles.title} numberOfLines={2}>
              {banner.title}
            </Text>

            {banner.subtitle && (
              <Text style={styles.subtitle} numberOfLines={2}>
                {banner.subtitle}
              </Text>
            )}

            {banner.actionText && (
              <View style={styles.actionWrap}>
                <View style={styles.actionButton}>
                  <Text style={styles.actionText}>
                    {banner.actionText}
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View style={styles.right}>
            <Image
              source={
                typeof banner.image === 'number'
                  ? banner.image
                  : { uri: banner.image }
              }
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    elevation: 3,
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
  },
  left: {
    width: '60%',
  },
  right: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  discount: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginBottom: 8,
    height:'auto',
    width:'auto'
  },
  discountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  actionWrap: {
    marginTop: 8,
  },
  actionButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#003084',
  },
  image: {
    width: '100%',
    height: '100%',
    maxWidth: 140,
    maxHeight: 140,
  },
});
