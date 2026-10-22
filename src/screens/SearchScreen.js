import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DESTINATIONS, CATEGORIES } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';
import CategoryPills from '../components/CategoryPills';
import EmptyState from '../components/EmptyState';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';

export default function SearchScreen({ onSelectDestination, onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Search & Category Filtering
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        item.name.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header with Search Input */}
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        )}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, state, category..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={false}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
              <Ionicons name="close-circle" size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Pills Filter */}
      <CategoryPills
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Results Header */}
      <View style={styles.resultsInfo}>
        <Text style={styles.resultsCount}>
          {filteredDestinations.length}{' '}
          {filteredDestinations.length === 1 ? 'Destination found' : 'Destinations found'}
        </Text>
        {selectedCategory !== 'All' && (
          <TouchableOpacity
            onPress={() => setSelectedCategory('All')}
            style={styles.resetFilter}
          >
            <Text style={styles.resetFilterText}>Clear Filter</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filtered Destinations List */}
      <FlatList
        data={filteredDestinations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <DestinationCard
            destination={item}
            horizontal={true}
            onPress={onSelectDestination}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="compass-outline"
            title="No Results Found"
            description={`No destinations found for "${searchQuery}" in ${selectedCategory}. Try another keyword or filter.`}
            buttonTitle="Reset Filters"
            onButtonPress={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          />
        }
      />
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
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xs,
    gap: SPACING.sm,
  },
  backButton: {
    padding: SPACING.xs,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.lg,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
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
  resultsInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  resultsCount: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  resetFilter: {
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  resetFilterText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xxl + 20,
  },
});
