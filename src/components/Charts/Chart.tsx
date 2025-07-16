import { useState } from "react";
import styles  from './Chart.module.css'

//Библиотека chart.js + react chart.js для отрисовки графиков 
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import type { WeatherParams } from "../../api/openmeteo/openmeteo.types";
import useWeather from "../../hooks/useWeather";
import Loader from '../ui/Loader';
import useFormatDate from "../../hooks/useFormatDate";

interface ChartProps {
  city: string,
  WeatherParams: WeatherParams,
}

const Chart = ({ city, WeatherParams }: ChartProps,) => {

  const PERIOD_WEATHER = [1, 3, 7];

  const [forecastDays, setForecastDays] = useState(1);

  const { weatherData, error, loading } = useWeather({ ...WeatherParams, forecast_days: forecastDays });

  if (loading) return <div className={styles.chart}><Loader /></div>;
  if (error) return <div className={styles.chart}>Ошибка: {error.message}</div>;
  if (!weatherData) return <div className={styles.chart}>Нет данных</div>;

  const {time,temperature} = useFormatDate(weatherData.hourly.time, weatherData.hourly.temperature_2m, forecastDays);

  const chartData = {
    labels: time,
    datasets: [{
      label: 'Температура (°C)',
      data: temperature,
      borderColor: '#146240',
      backgroundColor: '#146240',
      borderWidth: 1,
      tension: 0.85,
      pointRadius: 1,
      pointHoverRadius: 3,
    }]
  };

  return (
    <div className={styles.chart}>
      <h2>{city}</h2>
      <span>{forecastDays === 1 ? 'За последние 24 часа' : forecastDays === 3 ? 'На 3 дня' : 'На 7 дней'}</span>
      <Line data={chartData} />
      <div className={styles.buttonGroup}>
        {PERIOD_WEATHER.map(period => (
          <button
            className={forecastDays === period ? styles.active : ''}
            onClick={() => setForecastDays(period)}
            key={period}
          >
            {period === 1 ? '24 часа' : period === 3 ? '3 дня' : '7 дней'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chart;
