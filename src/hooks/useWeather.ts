// Кастомный хук для получения  погоды

import { useEffect, useState } from "react";

import { fetchWeather } from '../api/openmeteo/openmeteo.services';
import type { WeatherParams, WeatherResponse } from "../api/openmeteo/openmeteo.types";

const useWeather = ({ latitude, longitude, hourly, forecast_days,past_days }: WeatherParams) => {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        setLoading(true);
        const data = await fetchWeather({ latitude, longitude, hourly, forecast_days, past_days });
        setWeatherData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    loadWeather();
  }, [latitude, longitude, hourly, forecast_days,past_days]);


  return { weatherData, loading, error }
}

export default useWeather;

