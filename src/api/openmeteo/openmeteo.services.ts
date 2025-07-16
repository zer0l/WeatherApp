// Сервис получения данных от api Open-Meteo
import type { WeatherParams, WeatherResponse } from "./openmeteo.types";

const URL_API = "https://api.open-meteo.com/v1/forecast?";

export const fetchWeather = async (params: WeatherParams): Promise<WeatherResponse | null> => {
  try {
    const queryParams = new URLSearchParams({
      latitude: params.latitude.toString(),
      longitude: params.longitude.toString(),
      hourly: params.hourly,
      forecast_days: params.forecast_days.toString(),
      past_days: params.past_days.toString()
    });

    const url = URL_API + queryParams;

    const response = await fetch(url);

    if(!response.ok){
      throw new Error(`Error : ${response.status}`)
    }

    const data: WeatherResponse = await response.json();

    return data;

  } catch (error) {

    return null;

  }
}