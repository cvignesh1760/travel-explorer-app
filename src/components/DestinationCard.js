import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';
import { useWishlist } from '../context/WishlistContext';

export default function DestinationCard({
  destination,
  onPress,
  horizontal = false,
  showRemoveButton = false,
  onRemove,
}) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(destination.id);

  const categoryStyle = COLORS.categories[destination.category] || {
    bg: COLORS.primaryLight,
    text: COLORS.primary,
  };

  const handleHeartPress = (e) => {
    if (Platform.OS === 'web' && e && e.stopPropagation) {
      e.stopPropagation();
    }
    toggleWishlist(destination.id);
  };

  if (horizontal) {
    return (
      <TouchableOpacity
        style={styles.horizontalCard}
        onPress={() => onPress && onPress(destination)}
        activeOpacity={0.85}
      >
        <Image source={{ uri: destination.image }} style={styles.horizontalImage} />
        <View style={styles.horizontalContent}>
          <View style={styles.horizontalHeader}>
            <View style={[styles.categoryBadge, { backgroundColor: categoryStyle.bg }]}>
              <Text style={[styles.categoryText, { color: categoryStyle.text }]}>
                {destination.category}
              </Text>
            </View>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color={COLORS.accent} />
              <Text style={styles.ratingText}>{destination.rating}</Text>
            </View>
          </View>

          <Text style={styles.horizontalTitle} numberOfLines={1}>
            {destination.name}
          </Text>

          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={13} color={COLORS.primary} />
            <Text style={styles.locationText} numberOfLines={1}>
              {destination.location}
            </Text>
          </View>

          <View style={styles.horizontalFooter}>
            <Text style={styles.durationText}>{destination.duration}</Text>
            {showRemoveButton ? (
              <TouchableOpacity
                onPress={() => onRemove && onRemove(destination.id)}
                style={styles.deleteButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="trash-outline" size={18} color={COLORS.error} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleHeartPress}
                style={styles.heartSmallButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name={wishlisted ? 'heart' : 'heart-outline'}
                  size={19}
                  color={wishlisted ? COLORS.secondary : COLORS.textMuted}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress && onPress(destination)}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: destination.image }}
          style={styles.image}
          resizeMode="cover"
        />
        
        {/* Category Badge on top-left of image */}
        <View style={[styles.imageCategoryBadge, { backgroundColor: categoryStyle.bg }]}>
          <Text style={[styles.categoryText, { color: categoryStyle.text }]}>
            {destination.category}
          </Text>
        </View>

        {/* Wishlist Button on top-right of image */}
        <TouchableOpacity
          style={styles.heartButton}
          onPress={handleHeartPress}
          activeOpacity={0.8}
        >
          <Ionicons
            name={wishlisted ? 'heart' : 'heart-outline'}
            size={20}
            color={wishlisted ? COLORS.secondary : COLORS.surface}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>
            {destination.name}
          </Text>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={13} color={COLORS.accent} />
            <Text style={styles.ratingText}>{destination.rating}</Text>
          </View>
        </View>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color={COLORS.textSecondary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {destination.location}
          </Text>
        </View>

        <View style={styles.footerRow}>
          <View style={styles.tag}>
            <Ionicons name="calendar-outline" size={12} color={COLORS.primary} />
            <Text style={styles.tagText}>{destination.duration}</Text>
          </View>
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>{destination.priceLevel}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginBottom: SPACING.md,
    ...SHADOWS.md,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    position: 'relative',
    backgroundColor: COLORS.borderLight,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageCategoryBadge: {
    position: 'absolute',
    top: SPACING.sm + 4,
    left: SPACING.sm + 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    ...SHADOWS.sm,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  heartButton: {
    position: 'absolute',
    top: SPACING.sm + 4,
    right: SPACING.sm + 4,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: SPACING.sm,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accentLight,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: SPACING.sm,
  },
  locationText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    flex: 1,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: SPACING.sm,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tagText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  priceTag: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  priceText: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '600',
  },

  // Horizontal Card Styles (for search & wishlist)
  horizontalCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    marginBottom: SPACING.sm + 4,
    ...SHADOWS.sm,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  horizontalImage: {
    width: 110,
    height: 110,
    backgroundColor: COLORS.borderLight,
  },
  horizontalContent: {
    flex: 1,
    padding: SPACING.sm + 2,
    justifyContent: 'space-between',
  },
  horizontalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horizontalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  horizontalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  durationText: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  deleteButton: {
    padding: 4,
  },
  heartSmallButton: {
    padding: 4,
  },
});
