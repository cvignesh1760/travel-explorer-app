import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AttractionCard from '../components/AttractionCard';
import WeatherCard from '../components/WeatherCard';
import { useWishlist } from '../context/WishlistContext';
import { openInGoogleMaps, shareDestination } from '../utils/helpers';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';

export default function DestinationDetailsScreen({ destination, onBack }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(destination.id);

  const categoryStyle = COLORS.categories[destination.category] || {
    bg: COLORS.primaryLight,
    text: COLORS.primary,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Image & Overlay Controls */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: destination.image }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />

          {/* Navigation Bar Icons */}
          <View style={styles.heroHeader}>
            <TouchableOpacity
              style={styles.heroIconButton}
              onPress={onBack}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={22} color={COLORS.surface} />
            </TouchableOpacity>

            <View style={styles.headerRightActions}>
              <TouchableOpacity
                style={styles.heroIconButton}
                onPress={() => shareDestination(destination)}
                activeOpacity={0.8}
              >
                <Ionicons name="share-social-outline" size={20} color={COLORS.surface} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.heroIconButton,
                  wishlisted && styles.heroIconButtonWishlisted,
                ]}
                onPress={() => toggleWishlist(destination.id)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={wishlisted ? 'heart' : 'heart-outline'}
                  size={22}
                  color={wishlisted ? COLORS.secondary : COLORS.surface}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Hero Bottom Info */}
          <View style={styles.heroInfo}>
            <View style={[styles.categoryBadge, { backgroundColor: categoryStyle.bg }]}>
              <Text style={[styles.categoryText, { color: categoryStyle.text }]}>
                {destination.category}
              </Text>
            </View>
            <Text style={styles.heroTitle}>{destination.name}</Text>
            <View style={styles.heroLocationRow}>
              <Ionicons name="location-sharp" size={16} color="#BAE6FD" />
              <Text style={styles.heroLocation}>{destination.location}</Text>
            </View>
          </View>
        </View>

        {/* Content Sheet */}
        <View style={styles.sheetContainer}>
          {/* Quick Metrics Bar */}
          <View style={styles.metricsBar}>
            <View style={styles.metricItem}>
              <Ionicons name="star" size={18} color={COLORS.accent} />
              <Text style={styles.metricValue}>{destination.rating}</Text>
              <Text style={styles.metricLabel}>{destination.reviewsCount} reviews</Text>
            </View>

            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Ionicons name="time-outline" size={18} color={COLORS.primary} />
              <Text style={styles.metricValue}>{destination.duration}</Text>
              <Text style={styles.metricLabel}>Duration</Text>
            </View>

            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Ionicons name="wallet-outline" size={18} color={COLORS.success} />
              <Text style={styles.metricValue}>{destination.priceLevel}</Text>
              <Text style={styles.metricLabel}>Budget</Text>
            </View>
          </View>

          {/* Description Section (Stage 2) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Destination</Text>
            <Text style={styles.description}>{destination.description}</Text>
          </View>

          {/* Best Time to Visit (Stage 2) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Best Time to Visit</Text>
            <View style={styles.bestTimeCard}>
              <View style={styles.bestTimeHeader}>
                <Ionicons name="calendar" size={20} color={COLORS.primary} />
                <Text style={styles.bestTimePeriod}>{destination.bestTimeToVisit}</Text>
              </View>
              {destination.bestTimeReason && (
                <Text style={styles.bestTimeReason}>{destination.bestTimeReason}</Text>
              )}
            </View>
          </View>

          {/* Live Weather Integration (Extension Challenge 2) */}
          <View style={styles.section}>
            <WeatherCard
              coordinates={destination.coordinates}
              destinationName={destination.name}
            />
          </View>

          {/* Google Maps Integration (Extension Challenge 3) */}
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.mapButton}
              onPress={() => openInGoogleMaps(destination)}
              activeOpacity={0.85}
            >
              <View style={styles.mapButtonLeft}>
                <View style={styles.mapIconCircle}>
                  <Ionicons name="map-outline" size={20} color={COLORS.primary} />
                </View>
                <View>
                  <Text style={styles.mapButtonTitle}>View on Google Maps</Text>
                  <Text style={styles.mapButtonSubtitle}>Get directions & explore nearby places</Text>
                </View>
              </View>
              <Ionicons name="open-outline" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* Popular Attractions (Stage 2 - 2 to 3 attractions) */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Popular Attractions</Text>
              <Text style={styles.attractionsCount}>
                {destination.attractions.length} spots
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.attractionsScroll}
            >
              {destination.attractions.map((attraction) => (
                <AttractionCard key={attraction.id} attraction={attraction} />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Action Bar (Stage 4) */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            wishlisted ? styles.actionButtonWishlisted : styles.actionButtonDefault,
          ]}
          onPress={() => toggleWishlist(destination.id)}
          activeOpacity={0.85}
        >
          <Ionicons
            name={wishlisted ? 'heart' : 'heart-outline'}
            size={20}
            color={wishlisted ? COLORS.secondary : COLORS.surface}
          />
          <Text
            style={[
              styles.actionButtonText,
              wishlisted && styles.actionButtonTextWishlisted,
            ]}
          >
            {wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 90,
  },
  heroContainer: {
    width: '100%',
    height: 320,
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
  },
  heroHeader: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
    left: SPACING.md,
    right: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  headerRightActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  heroIconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIconButtonWishlisted: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  heroInfo: {
    position: 'absolute',
    bottom: SPACING.lg,
    left: SPACING.md,
    right: SPACING.md,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.xs,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.surface,
    letterSpacing: -0.5,
  },
  heroLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  heroLocation: {
    fontSize: 14,
    color: '#E2E8F0',
    fontWeight: '500',
  },
  sheetContainer: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    marginTop: -RADIUS.lg,
    paddingTop: SPACING.lg,
  },
  metricsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    ...SHADOWS.sm,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginBottom: SPACING.md,
  },
  metricItem: {
    alignItems: 'center',
    gap: 2,
  },
  metricValue: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  metricLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  metricDivider: {
    width: 1,
    height: 28,
    backgroundColor: COLORS.borderLight,
  },
  section: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  attractionsCount: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },
  bestTimeCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.sm,
  },
  bestTimeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: 4,
  },
  bestTimePeriod: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  bestTimeReason: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginTop: 2,
  },
  mapButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.sm,
  },
  mapButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  mapIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapButtonTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  mapButtonSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  attractionsScroll: {
    paddingVertical: SPACING.xs,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 4,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    ...SHADOWS.lg,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: RADIUS.full,
    gap: SPACING.sm,
  },
  actionButtonDefault: {
    backgroundColor: COLORS.primary,
  },
  actionButtonWishlisted: {
    backgroundColor: COLORS.secondaryLight,
    borderWidth: 1.5,
    borderColor: COLORS.secondary,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.surface,
  },
  actionButtonTextWishlisted: {
    color: COLORS.secondary,
  },
});
