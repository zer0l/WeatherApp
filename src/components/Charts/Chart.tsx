import { useState } from "react";

//Библиотека chart.js + react chart.js для отрисовки графиков 
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import type { WeatherParams } from "../../api/openmeteo/openmeteo.types";
import useWeather from "../../hooks/useWeather";
import Loader from '../ui/Loader';

interface ChartProps {
  city: string,
  WeatherParams: WeatherParams,
}

const Chart = ({ city, WeatherParams }: ChartProps,) => {

  const PERIOD_WEATHER = [1, 3, 7];

  const [forecastDays, setForecastDays] = useState(1);

  const { weatherData, error, loading } = useWeather({ ...WeatherParams, forecast_days: forecastDays });

  if (loading) return <div className="chart"><Loader /></div>;
  if (error) return <div className="chart">Ошибка: {error.message}</div>;
  if (!weatherData) return <div className="chart">Нет данных</div>;

  const getProccesedData = () => {
    const result: { time: string[], temperature: number[] } = {
      time: [],
      temperature: [],
    };

    if (forecastDays === 1) {
      const now = new Date();
      const Ago24H = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      weatherData.hourly.time.forEach((time, index) => {
        const date = new Date(time);
        if (date >= Ago24H && date <= now) {
          result.time.push(time);
          result.temperature.push(weatherData.hourly.temperature_2m[index]);
        }
      });
    }
    if (forecastDays === 3) {
      result.time = (weatherData.hourly.time).slice(24);
      result.temperature = (weatherData.hourly.temperature_2m).slice(24);
    }

    if (forecastDays === 7) {
      result.time = (weatherData.hourly.time).slice(24);;
      result.temperature = (weatherData.hourly.temperature_2m).slice(24);
    }

    return result;
  };

  const proccedData = getProccesedData()

  const chartData = {
    labels: proccedData?.time,
    datasets: [{
      label: 'Температура (°C)',
      data: proccedData?.temperature,
      borderColor: 'rgba(20, 98, 64, 1)',
      backgroundColor: 'rgba(20, 98, 64, 1)',
      borderWidth: 1,
      tension: 1,
      pointRadius: 1,
      pointHoverRadius: 3,
    }]
  };

  return (
    <div className="chart">
      <h2>{city}</h2>
      <span>{forecastDays === 1 ? 'За последние 24 часа' : forecastDays === 3 ? 'На 3 дня' : 'На 7 дней'}</span>
      <Line data={chartData} />
      <div className="buttonGroup">
        {PERIOD_WEATHER.map(period => (
          <button
            className={forecastDays === period ? 'active' : ''}
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
