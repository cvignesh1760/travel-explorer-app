import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { WishlistProvider, useWishlist } from './src/context/WishlistContext';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import DestinationDetailsScreen from './src/screens/DestinationDetailsScreen';
import WishlistScreen from './src/screens/WishlistScreen';
import SmartMatcherScreen from './src/screens/SmartMatcherScreen';
import { COLORS, SPACING, RADIUS, SHADOWS } from './src/styles/theme';

function MainNavigator() {
  const [currentTab, setCurrentTab] = useState('Home'); // 'Home' | 'Search' | 'Matcher' | 'Wishlist'
  const [selectedDestination, setSelectedDestination] = useState(null);
  const { wishlist } = useWishlist();

  const handleSelectDestination = (dest) => {
    setSelectedDestination(dest);
  };

  const handleBackFromDetails = () => {
    setSelectedDestination(null);
  };

  const renderActiveScreen = () => {
    if (selectedDestination) {
      return (
        <DestinationDetailsScreen
          destination={selectedDestination}
          onBack={handleBackFromDetails}
        />
      );
    }

    switch (currentTab) {
      case 'Home':
        return (
          <HomeScreen
            onSelectDestination={handleSelectDestination}
            onNavigateSearch={() => setCurrentTab('Search')}
            onNavigateMatcher={() => setCurrentTab('Matcher')}
          />
        );
      case 'Search':
        return (
          <SearchScreen
            onSelectDestination={handleSelectDestination}
            onBack={() => setCurrentTab('Home')}
          />
        );
      case 'Matcher':
        return (
          <SmartMatcherScreen
            onSelectDestination={handleSelectDestination}
            onBack={() => setCurrentTab('Home')}
          />
        );
      case 'Wishlist':
        return (
          <WishlistScreen
            onSelectDestination={handleSelectDestination}
            onNavigateHome={() => setCurrentTab('Home')}
          />
        );
      default:
        return (
          <HomeScreen
            onSelectDestination={handleSelectDestination}
            onNavigateSearch={() => setCurrentTab('Search')}
            onNavigateMatcher={() => setCurrentTab('Matcher')}
          />
        );
    }
  };

  const tabs = [
    { key: 'Home', label: 'Home', icon: 'home-outline', activeIcon: 'home' },
    { key: 'Search', label: 'Search', icon: 'search-outline', activeIcon: 'search' },
    { key: 'Matcher', label: 'AI Match', icon: 'sparkles-outline', activeIcon: 'sparkles' },
    { key: 'Wishlist', label: 'Wishlist', icon: 'heart-outline', activeIcon: 'heart', badge: wishlist.length },
  ];

  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar style={selectedDestination ? 'light' : 'dark'} />

      {/* Screen View */}
      <View style={styles.screenWrapper}>{renderActiveScreen()}</View>

      {/* Persistent Bottom Navigation Bar (Hidden when on Details Screen for full immersion) */}
      {!selectedDestination && (
        <View style={styles.bottomNav}>
          {tabs.map((tab) => {
            const isActive = currentTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={styles.navItem}
                onPress={() => {
                  setSelectedDestination(null);
                  setCurrentTab(tab.key);
                }}
                activeOpacity={0.7}
              >
                <View style={styles.navIconContainer}>
                  <Ionicons
                    name={isActive ? tab.activeIcon : tab.icon}
                    size={22}
                    color={isActive ? COLORS.primary : COLORS.textSecondary}
                  />
                  {tab.badge > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{tab.badge}</Text>
                    </View>
                  )}
                </View>
                <Text
                  style={[
                    styles.navLabel,
                    isActive ? styles.navLabelActive : styles.navLabelInactive,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <WishlistProvider>
      <MainNavigator />
    </WishlistProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screenWrapper: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 76 : 64,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingHorizontal: SPACING.md,
    paddingBottom: Platform.OS === 'ios' ? 16 : 8,
    paddingTop: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    ...SHADOWS.md,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navIconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 11,
    marginTop: 3,
    fontWeight: '600',
  },
  navLabelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  navLabelInactive: {
    color: COLORS.textSecondary,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: COLORS.secondary,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: COLORS.surface,
    fontSize: 10,
    fontWeight: '800',
  },
});
