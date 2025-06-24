const openWeatherConfig = {
  lat: process.env.OPEN_WEATHER_LAT,
  lon: process.env.OPEN_WEATHER_LON,
  key: process.env.OPEN_WEATHER_API,
};

export async function getCurrentForecast() {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${openWeatherConfig.lat}&lon=${openWeatherConfig.lon}&units=imperial&appid=${openWeatherConfig.key}`,
  );
}
