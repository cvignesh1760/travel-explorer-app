// Open-Meteo Free Live Weather API Service (Extension Challenge 2)
// No API Key required, 100% free and reliable.

export const fetchLiveWeather = async (latitude, longitude) => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=auto`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather service responded with status ${response.status}`);
    }
    const data = await response.json();
    const current = data.current;

    const weatherInfo = mapWmoCode(current.weather_code, current.is_day === 1);

    return {
      success: true,
      temperature: Math.round(current.temperature_2m),
      apparentTemperature: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      condition: weatherInfo.condition,
      icon: weatherInfo.icon,
      isDay: current.is_day === 1,
      fetchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  } catch (error) {
    console.warn('Live weather fetch error:', error);
    return {
      success: false,
      error: error.message,
      // Graceful fallback to simulated seasonal data
      temperature: 26,
      apparentTemperature: 27,
      humidity: 65,
      windSpeed: 12,
      condition: 'Sunny / Pleasant',
      icon: 'sunny-outline',
      isDay: true,
    };
  }
};

/**
 * Maps WMO weather codes to human-readable text and Ionicons
 */
function mapWmoCode(code, isDay) {
  switch (code) {
    case 0:
      return {
        condition: isDay ? 'Sunny & Clear' : 'Clear Sky',
        icon: isDay ? 'sunny' : 'moon',
      };
    case 1:
    case 2:
      return {
        condition: isDay ? 'Partly Sunny' : 'Partly Cloudy',
        icon: isDay ? 'partly-sunny' : 'cloudy-night',
      };
    case 3:
      return {
        condition: 'Overcast & Cloudy',
        icon: 'cloudy',
      };
    case 45:
    case 48:
      return {
        condition: 'Foggy & Misty',
        icon: 'cloud-outline',
      };
    case 51:
    case 53:
    case 55:
      return {
        condition: 'Light Drizzle',
        icon: 'rainy-outline',
      };
    case 61:
    case 63:
    case 65:
      return {
        condition: 'Rain Showers',
        icon: 'rainy',
      };
    case 71:
    case 73:
    case 75:
      return {
        condition: 'Snowfall',
        icon: 'snow',
      };
    case 80:
    case 81:
    case 82:
      return {
        condition: 'Heavy Showers',
        icon: 'thunderstorm-outline',
      };
    case 95:
    case 96:
    case 99:
      return {
        condition: 'Thunderstorm',
        icon: 'thunderstorm',
      };
    default:
      return {
        condition: 'Pleasant Breeze',
        icon: isDay ? 'sunny-outline' : 'moon-outline',
      };
  }
}
