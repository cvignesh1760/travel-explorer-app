import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';

export default function AttractionCard({ attraction }) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: attraction.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {attraction.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {attraction.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.sm,
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: COLORS.borderLight,
  },
  content: {
    padding: SPACING.sm + 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
});
