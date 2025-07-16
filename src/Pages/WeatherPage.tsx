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
      city : "Казань",
      queryParams: {
        latitude: 54.54,
        longitude: 30.18,
        hourly: "temperature_2m",
        forecast_days: 1,
        past_days: 1,
      }
    },
    {
      city : "Заинск",
      queryParams: {
        latitude: 54.54,
        longitude: 10.18,
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