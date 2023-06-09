import axios from "axios";
import { descObject } from "../assets/descObject";
import { objectify } from "./objectify";

const weatherApi = axios.create({
  baseURL: "https://api.open-meteo.com/v1",
});

export const fetchCurrentWeather = (long, lat) => {
  return weatherApi
    .get(`/forecast?latitude=${lat}&longitude=${long}&current_weather=true`)
    .then((response) => {
      const temp = response.data.current_weather.temperature;
      const description = descObject[response.data.current_weather.weathercode];
      const time = response.data.current_weather.time
        .replace("T", " ")
        .slice(10);

      return { temp: temp, description: description, time: time };
    })
    .catch((err) => {
      return err;
    });
};

export const fetchHourlyWeather = (startDate, endDate,long,lat) => {
  // the date comes dd/mm/yyyy and it wants yyyy/mm/dd  so this is my fix/patch/bodge
  const start = startDate.toJSON().toString().split("T");
  const end = endDate.toJSON().toString().split("T");

  return weatherApi
    .get(
      `/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,precipitation_probability,cloudcover,weathercode&start_date=${start[0]}&end_date=${end[0]}&timezone=GMT&`
    )
    .then((response) => {
      return response.data.hourly;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const fetchDailyWeather = (startDate, endDate,long,lat) => {
  const start = startDate.toJSON().toString().split("T");
  const end = endDate.toJSON().toString().split("T");
  return weatherApi
    .get(
      `/forecast?latitude=${lat}&longitude=${long}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&start_date=${start[0]}&end_date=${end[0]}&timezone=GMT`
    )
    .then((response) => {
      return response.data.daily;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

// 7 day average
// https://api.open-meteo.com/v1/forecast?latitude=52.57&longitude=-0.25&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max

// hourly today, tomorrow
// /forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation_probability,cloudcover&start_date=${start[0]}&end_date=${end[0]}&timezone=GMT

//7days
// /forecast?latitude=52.57&longitude=-0.25&hourly=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_hours,precipitation_probability_mean,weathercode,sunrise,sunset,windspeed_10m_max,uv_index_max&current_weather=true&forecast_days=1&start_date=${start[0]}&end_date=${end[0]}&timezone=Europe/London
