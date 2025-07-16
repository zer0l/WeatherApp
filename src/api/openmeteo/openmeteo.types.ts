// Типизация получаемых данных
export interface WeatherResponse {
  latitude: number,
  longitude: number,
  generationtime_ms: number,
  utc_offset_seconds: number,
  timezone: string,
  timezone_abbreviation: string,
  elevation: number,
  hourly_units: {
    time: string,
    temperature_2m: string,
  },
  hourly: {
    time: string[],
    temperature_2m: number[],
  },
}

// Типизация отправляемых параметров
export interface WeatherParams {
  latitude: number,
  longitude: number,
  hourly: string,
  forecast_days: number,
  past_days: number,
}