// import React from "react";
import Chart from "../components/Charts/Chart";

const WeatherPage = () => {

  const weatherParams = [
    {
      city : "Альметьевск",
      queryParams: {
        latitude: 54.54,
        longitude: 52.18,
        hourly: "temperature_2m",
        forecast_days: 1,
        past_days: 1,
      }
    },
    {
      city : "Москва",
      queryParams: {
        latitude: 55.55,
        longitude: 37.36,
        hourly: "temperature_2m",
        forecast_days: 1,
        past_days: 1,
      }
    },
    {
      city : "Нью-Йорк",
      queryParams: {
        latitude: 40.43,
        longitude: 73.59,
        hourly: "temperature_2m",
        forecast_days: 1,
        past_days: 1,
      }
    }
  ];

  return (
    <div className="weatherBlock">
      <h1>
        Работа с API Open-Metio.
      </h1>
      <div className="charts">
        {weatherParams.map((params, index) => (
          <Chart 
            key={index}
            city={params.city}
            WeatherParams={params.queryParams}
          />
        ))}
      </div>
    </div>
  )
}

export default WeatherPage;