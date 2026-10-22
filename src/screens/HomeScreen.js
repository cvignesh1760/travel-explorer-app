import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DESTINATIONS } from '../data/destinations';
import CategoryPills from '../components/CategoryPills';
import DestinationCard from '../components/DestinationCard';
import EmptyState from '../components/EmptyState';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';

export default function HomeScreen({ onSelectDestination, onNavigateSearch, onNavigateMatcher }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Combined Search & Category Filtering
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* App Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appName}>Travel Explorer</Text>
          <Text style={styles.appSubtitle}>Discover incredible places across India</Text>
        </View>

        <TouchableOpacity
          style={styles.aiButton}
          onPress={onNavigateMatcher}
          activeOpacity={0.8}
        >
          <Ionicons name="sparkles" size={18} color={COLORS.primary} />
          <Text style={styles.aiButtonText}>AI Matcher</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar Input */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
          <TextInput
            placeholder="Search destinations, cities, states..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
              <Ionicons name="close-circle" size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filter Pills (Stage 1 & 3) */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <CategoryPills
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </View>

        {/* Featured Hero Banner */}
        {selectedCategory === 'All' && !searchQuery && (
          <TouchableOpacity
            style={styles.promoBanner}
            onPress={() => onSelectDestination(DESTINATIONS[0])}
            activeOpacity={0.9}
          >
            <View style={styles.promoBadge}>
              <Text style={styles.promoBadgeText}>Featured Getaway</Text>
            </View>
            <Text style={styles.promoTitle}>Sun, Sand & Coastal Breeze in Goa</Text>
            <Text style={styles.promoSubtitle}>Discover secret coves and 17th-century forts</Text>
            <View style={styles.promoAction}>
              <Text style={styles.promoActionText}>Explore Now</Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.surface} />
            </View>
          </TouchableOpacity>
        )}

        {/* Destination List (Stage 1 & Stage 3) */}
        <View style={styles.destinationSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'All' ? 'Popular Destinations' : `${selectedCategory} Escapes`}
            </Text>
            <Text style={styles.countText}>
              {filteredDestinations.length} found
            </Text>
          </View>

          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onPress={onSelectDestination}
              />
            ))
          ) : (
            <EmptyState
              icon="search-outline"
              title="No Destinations Found"
              description={`We couldn't find any destinations matching "${searchQuery}".`}
              buttonTitle="Reset Search"
              onButtonPress={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.background,
  },
  appName: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  appSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: RADIUS.full,
    gap: 5,
  },
  aiButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  scrollContent: {
    paddingBottom: SPACING.xxl + 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.sm,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 48,
    ...SHADOWS.sm,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    height: '100%',
  },
  clearBtn: {
    padding: 4,
  },
  categorySection: {
    marginTop: SPACING.xs,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.md,
    marginBottom: 4,
  },
  promoBanner: {
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.md,
    backgroundColor: '#0284C7',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.md,
  },
  promoBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.sm,
  },
  promoBadgeText: {
    color: COLORS.surface,
    fontSize: 12,
    fontWeight: '700',
  },
  promoTitle: {
    color: COLORS.surface,
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
    marginBottom: 6,
  },
  promoSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    marginBottom: SPACING.md,
  },
  promoAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  promoActionText: {
    color: COLORS.surface,
    fontWeight: '700',
    fontSize: 14,
  },
  destinationSection: {
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  countText: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
});
