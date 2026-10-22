import { Linking, Alert, Share, Platform } from 'react-native';

/**
 * Opens the destination in Google Maps (Extension Challenge 3)
 */
export const openInGoogleMaps = async (destination) => {
  const { name, location, coordinates } = destination;
  
  // Construct search query or lat/lng query
  let url = '';
  if (coordinates && coordinates.latitude && coordinates.longitude) {
    url = `https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`;
  } else {
    url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${location}`)}`;
  }

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported || Platform.OS === 'web') {
      await Linking.openURL(url);
    } else {
      Alert.alert('Cannot Open Maps', 'Unable to open Google Maps on this device.');
    }
  } catch (err) {
    console.warn('Error opening Google Maps:', err);
    Linking.openURL(url);
  }
};

/**
 * Share destination details
 */
export const shareDestination = async (destination) => {
  try {
    await Share.share({
      title: `Explore ${destination.name}`,
      message: `Check out ${destination.name} in ${destination.location}! Best time to visit: ${destination.bestTimeToVisit}. Find it on Travel Explorer App.`,
    });
  } catch (error) {
    console.warn('Error sharing destination:', error);
  }
};
