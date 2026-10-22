import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DESTINATIONS } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';
import EmptyState from '../components/EmptyState';
import { useWishlist } from '../context/WishlistContext';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';

export default function WishlistScreen({ onSelectDestination, onNavigateHome }) {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  // Retrieve full destination objects for wishlisted IDs
  const wishlistedDestinations = DESTINATIONS.filter((item) =>
    wishlist.includes(item.id)
  );

  const handleClearAll = () => {
    if (wishlist.length === 0) return;

    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
        clearWishlist();
      }
    } else {
      Alert.alert(
        'Clear Wishlist',
        'Are you sure you want to remove all destinations from your wishlist?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Clear All', style: 'destructive', onPress: clearWishlist },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Screen Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Wishlist</Text>
          <Text style={styles.subtitle}>
            {wishlistedDestinations.length}{' '}
            {wishlistedDestinations.length === 1 ? 'place saved' : 'places saved'}
          </Text>
        </View>

        {wishlistedDestinations.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearAll}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={16} color={COLORS.error} />
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Wishlist Items List (Stage 4) */}
      <FlatList
        data={wishlistedDestinations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <DestinationCard
            destination={item}
            horizontal={true}
            onPress={onSelectDestination}
            showRemoveButton={true}
            onRemove={removeFromWishlist}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="heart-dislike-outline"
            title="Your Wishlist is Empty"
            description="Explore our curated collection of destinations across India and tap the heart icon to save your favorites."
            buttonTitle="Explore Destinations"
            onButtonPress={onNavigateHome}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#FEE2E2',
    borderRadius: RADIUS.full,
  },
  clearText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.error,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.xxl + 20,
  },
});
