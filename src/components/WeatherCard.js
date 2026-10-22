import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchLiveWeather } from '../services/weatherService';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';

export default function WeatherCard({ coordinates, destinationName }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadWeather = async () => {
    if (!coordinates) return;
    setLoading(true);
    const data = await fetchLiveWeather(coordinates.latitude, coordinates.longitude);
    setWeather(data);
    setLoading(false);
  };

  useEffect(() => {
    loadWeather();
  }, [coordinates]);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="cloudy-night-outline" size={18} color={COLORS.primary} />
          <Text style={styles.headerTitle}>Live Weather Forecast</Text>
        </View>
        <TouchableOpacity
          onPress={loadWeather}
          style={styles.refreshButton}
          disabled={loading}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <Ionicons name="refresh" size={16} color={COLORS.primary} />
          )}
        </TouchableOpacity>
      </View>

      {weather ? (
        <View style={styles.body}>
          <View style={styles.mainInfo}>
            <View style={styles.iconCircle}>
              <Ionicons
                name={weather.icon || 'partly-sunny'}
                size={32}
                color={COLORS.primary}
              />
            </View>
            <View>
              <Text style={styles.temperature}>{weather.temperature}°C</Text>
              <Text style={styles.condition}>{weather.condition}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="thermometer-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.statLabel}>Feels Like</Text>
              <Text style={styles.statValue}>{weather.apparentTemperature}°C</Text>
            </View>

            <View style={styles.statItem}>
              <Ionicons name="water-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.statLabel}>Humidity</Text>
              <Text style={styles.statValue}>{weather.humidity}%</Text>
            </View>

            <View style={styles.statItem}>
              <Ionicons name="speedometer-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.statLabel}>Wind Speed</Text>
              <Text style={styles.statValue}>{weather.windSpeed} km/h</Text>
            </View>
          </View>

          <View style={styles.sourceTag}>
            <Text style={styles.sourceText}>
              • Live Open-Meteo Real-time Feed
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={COLORS.primary} />
          <Text style={styles.loadingText}>Fetching real-time weather...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F0F9FF',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    marginVertical: SPACING.sm,
    ...SHADOWS.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0369A1',
  },
  refreshButton: {
    padding: 4,
  },
  body: {
    marginTop: 2,
  },
  mainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.sm,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  temperature: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  condition: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0F2FE',
    marginVertical: SPACING.xs,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SPACING.xs,
  },
  statItem: {
    alignItems: 'center',
    gap: 2,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  sourceTag: {
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  sourceText: {
    fontSize: 10,
    color: '#0284C7',
    fontWeight: '500',
  },
  loadingContainer: {
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 6,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
