import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DESTINATIONS } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';

const TRAVEL_TYPES = [
  { id: 'Beach / Leisure', label: 'Beach & Leisure', icon: 'water-outline' },
  { id: 'Nature & Relaxing', label: 'Nature & Mountains', icon: 'leaf-outline' },
  { id: 'Heritage / Culture', label: 'Culture & Heritage', icon: 'business-outline' },
  { id: 'Adventure / Thrill', label: 'Adventure & Thrills', icon: 'flame-outline' },
];

const BUDGET_LEVELS = [
  { id: 'Budget', label: 'Budget-Friendly', desc: '₹ Affordable stays & transit', icon: 'wallet-outline' },
  { id: 'Moderate', label: 'Comfort / Mid', desc: '₹₹ Balanced comfort & dining', icon: 'card-outline' },
  { id: 'Luxury', label: 'Premium / Luxury', desc: '₹₹₹ 5-Star resorts & bespoke trips', icon: 'diamond-outline' },
];

const DURATIONS = [
  { id: 'short', label: 'Weekend Getaway', sub: '2-3 Days', icon: 'calendar-outline' },
  { id: 'medium', label: 'Standard Holiday', sub: '4-6 Days', icon: 'airplane-outline' },
  { id: 'long', label: 'Long Expedition', sub: '7+ Days', icon: 'globe-outline' },
];

export default function SmartMatcherScreen({ onSelectDestination, onBack }) {
  const [selectedType, setSelectedType] = useState('Beach / Leisure');
  const [selectedBudget, setSelectedBudget] = useState('Moderate');
  const [selectedDuration, setSelectedDuration] = useState('medium');
  const [hasCalculated, setHasCalculated] = useState(false);

  // Scoring algorithm for smart destination matching (Extension Challenge 1)
  const recommendations = useMemo(() => {
    return DESTINATIONS.map((dest) => {
      let score = 0;

      // 1. Travel Type Match (Weight: 45)
      if (dest.travelType === selectedType) {
        score += 45;
      } else if (
        (selectedType === 'Beach / Leisure' && dest.category === 'Beaches') ||
        (selectedType === 'Nature & Relaxing' && dest.category === 'Mountains') ||
        (selectedType === 'Heritage / Culture' && dest.category === 'Heritage') ||
        (selectedType === 'Adventure / Thrill' && dest.category === 'Adventure')
      ) {
        score += 35;
      } else {
        score += 15;
      }

      // 2. Budget Match (Weight: 35)
      if (dest.priceLevel === selectedBudget) {
        score += 35;
      } else if (
        (selectedBudget === 'Moderate' && (dest.priceLevel === 'Budget' || dest.priceLevel === 'Luxury')) ||
        (selectedBudget === 'Budget' && dest.priceLevel === 'Moderate') ||
        (selectedBudget === 'Luxury' && dest.priceLevel === 'Moderate')
      ) {
        score += 20;
      } else {
        score += 10;
      }

      // 3. Duration Match (Weight: 20)
      const durationStr = dest.duration.toLowerCase();
      if (selectedDuration === 'short' && (durationStr.includes('2') || durationStr.includes('3') || durationStr.includes('4'))) {
        score += 20;
      } else if (selectedDuration === 'medium' && (durationStr.includes('4') || durationStr.includes('5') || durationStr.includes('6'))) {
        score += 20;
      } else if (selectedDuration === 'long' && (durationStr.includes('7') || durationStr.includes('10'))) {
        score += 20;
      } else {
        score += 10;
      }

      // Rating boost
      score += Math.round(dest.rating * 2);

      const matchPercent = Math.min(Math.round((score / 110) * 100), 99);

      return {
        ...dest,
        matchPercent,
      };
    }).sort((a, b) => b.matchPercent - a.matchPercent);
  }, [selectedType, selectedBudget, selectedDuration]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Screen Header */}
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        )}
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Smart Destination Matcher</Text>
          <Text style={styles.subtitle}>Personalized AI-powered Indian travel finder</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Step 1: Travel Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. What is your preferred travel vibe?</Text>
          <View style={styles.grid2}>
            {TRAVEL_TYPES.map((type) => {
              const active = selectedType === type.id;
              return (
                <TouchableOpacity
                  key={type.id}
                  style={[styles.choiceCard, active && styles.choiceCardActive]}
                  onPress={() => setSelectedType(type.id)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={type.icon}
                    size={24}
                    color={active ? COLORS.primary : COLORS.textSecondary}
                  />
                  <Text style={[styles.choiceLabel, active && styles.choiceLabelActive]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Step 2: Budget */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. What is your estimated budget?</Text>
          <View style={styles.optionsList}>
            {BUDGET_LEVELS.map((budget) => {
              const active = selectedBudget === budget.id;
              return (
                <TouchableOpacity
                  key={budget.id}
                  style={[styles.budgetCard, active && styles.budgetCardActive]}
                  onPress={() => setSelectedBudget(budget.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.budgetLeft}>
                    <View
                      style={[
                        styles.budgetIconCircle,
                        active && styles.budgetIconCircleActive,
                      ]}
                    >
                      <Ionicons
                        name={budget.icon}
                        size={20}
                        color={active ? COLORS.surface : COLORS.textSecondary}
                      />
                    </View>
                    <View>
                      <Text style={[styles.budgetLabel, active && styles.budgetLabelActive]}>
                        {budget.label}
                      </Text>
                      <Text style={styles.budgetDesc}>{budget.desc}</Text>
                    </View>
                  </View>
                  {active && (
                    <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Step 3: Trip Duration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. How long do you plan to travel?</Text>
          <View style={styles.durationRow}>
            {DURATIONS.map((dur) => {
              const active = selectedDuration === dur.id;
              return (
                <TouchableOpacity
                  key={dur.id}
                  style={[styles.durCard, active && styles.durCardActive]}
                  onPress={() => setSelectedDuration(dur.id)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={dur.icon}
                    size={20}
                    color={active ? COLORS.primary : COLORS.textSecondary}
                  />
                  <Text style={[styles.durLabel, active && styles.durLabelActive]}>
                    {dur.label}
                  </Text>
                  <Text style={styles.durSub}>{dur.sub}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Recommended Matches */}
        <View style={styles.resultsSection}>
          <View style={styles.resultsHeader}>
            <View>
              <Text style={styles.resultsTitle}>Top Matches For You</Text>
              <Text style={styles.resultsSubtitle}>
                Ranked by vibe, budget & duration compatibility
              </Text>
            </View>
          </View>

          {recommendations.slice(0, 4).map((dest) => (
            <View key={dest.id} style={styles.matchCardWrapper}>
              <View style={styles.matchScoreBadge}>
                <Ionicons name="sparkles" size={13} color="#0284C7" />
                <Text style={styles.matchScoreText}>{dest.matchPercent}% Match</Text>
              </View>
              <DestinationCard
                destination={dest}
                horizontal={true}
                onPress={onSelectDestination}
              />
            </View>
          ))}
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
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xxl + 20,
  },
  section: {
    marginTop: SPACING.md,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  grid2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  choiceCard: {
    width: '48%',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    gap: 8,
    ...SHADOWS.sm,
  },
  choiceCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  choiceLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  choiceLabelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  optionsList: {
    gap: SPACING.sm,
  },
  budgetCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  budgetCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  budgetLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  budgetIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  budgetIconCircleActive: {
    backgroundColor: COLORS.primary,
  },
  budgetLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  budgetLabelActive: {
    color: COLORS.primary,
  },
  budgetDesc: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  durationRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  durCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: SPACING.sm + 4,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    gap: 4,
    ...SHADOWS.sm,
  },
  durCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  durLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  durLabelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  durSub: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  resultsSection: {
    marginTop: SPACING.lg,
  },
  resultsHeader: {
    marginBottom: SPACING.md,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  resultsSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  matchCardWrapper: {
    position: 'relative',
    marginBottom: SPACING.xs,
  },
  matchScoreBadge: {
    position: 'absolute',
    top: -8,
    right: 12,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E0F2FE',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    ...SHADOWS.sm,
  },
  matchScoreText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0284C7',
  },
});
