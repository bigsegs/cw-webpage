import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchHourlyWeather } from "../utils/fetchWeatherApi";
import {
  MainContainer,
  Container,
  BarChartContainer,
  Temp,
  Time,
  BlackLine,
  MakeBar,
} from "../styles";
import { objectify } from "../utils/objectify";
import { Spinner } from "react-bootstrap";

// uses js in css imported styled components

export const HourlyChart = ({ startDate, endDate, long,lat }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherObj, setWeatherObj] = useState([]);

  useEffect(() => {
    fetchHourlyWeather(startDate, endDate, long, lat).then((result) => {
      setWeatherObj(result);
      setIsLoading(false);
    });
  }, [lat,long]);

  // weatherObj is an object delivered from the api
  // it contains keys of time (iso8601), temperature_2m (*c), precipitation_probability (%), cloudcover (%) and weathercode (number)
  // each key is an array of 24 item

  if (isLoading)
    return (
      <div id="spinner-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  const weatherArray = objectify(weatherObj);
  // comes back as an array of 24 objects
  // each object has temp,time,rain,cloud,desc
  // (description from weathercode)

  return (
    <Container>
      <MainContainer>
        {weatherArray.map(({ temp, time, rain, cloud, desc, day }, index) => {
          return (
            <BarChartContainer key={index}>
              <Temp color={["black"]}>{Math.round(temp)}℃</Temp>
              <MakeBar
                height={temp * 2}
                colors={[
                  "rgb(207,53,33)",
                  "rgb(144,218,24)",
                  "rgb(62,141,173)",
                ]}
              />
              <Time color={["blue"]}>{day}</Time>
              <Time color={["black"]}>{time}:00</Time>
              <Time color={["blue"]}>{rain}%</Time>
              <img
                style={{
                  width: "100%",
                  border: "none",
                  backgroundColor: "blue",
                }}
                src={desc}
              ></img>
            </BarChartContainer>
          );
        })}
        ;
      </MainContainer>
      <BlackLine />
    </Container>
  );
};
