import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '../data/destinations';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';

export default function CategoryPills({ selectedCategory, onSelectCategory }) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Beaches':
        return 'water-outline';
      case 'Mountains':
        return 'trail-sign-outline';
      case 'Heritage':
        return 'business-outline';
      case 'Adventure':
        return 'flame-outline';
      default:
        return 'grid-outline';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          const iconName = getCategoryIcon(category);

          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.pill,
                isSelected ? styles.pillActive : styles.pillInactive,
              ]}
              onPress={() => onSelectCategory(category)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={iconName}
                size={16}
                color={isSelected ? COLORS.surface : COLORS.textSecondary}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.pillText,
                  isSelected ? styles.pillTextActive : styles.pillTextInactive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.sm,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: RADIUS.full,
    ...SHADOWS.sm,
  },
  pillActive: {
    backgroundColor: COLORS.primary,
  },
  pillInactive: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  icon: {
    marginRight: 6,
  },
  pillText: {
    fontSize: 14,
    fontWeight: '600',
  },
  pillTextActive: {
    color: COLORS.surface,
  },
  pillTextInactive: {
    color: COLORS.textSecondary,
  },
});
