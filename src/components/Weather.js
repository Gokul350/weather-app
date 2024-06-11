import React, { useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import "../App.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const getWeather = async (city) => {
    const apiKey = "eac666d1ca22f81c20bfe33fd6a8f157"; // Your actual API key
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      setWeather(response.data);
    } catch (error) {
      setError("Error fetching weather data");
    }
  };

  const getWeatherWeeklyData = async (city) => {
    const apiKey = "eac666d1ca22f81c20bfe33fd6a8f157"; // Your actual API key
    setLoading(true);
    setError("");
    try {
      const responseforweeklyreport = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      console.log("responseforweeklyreport", responseforweeklyreport);
      setWeatherData(responseforweeklyreport.data);
    } catch (error) {
      setError("Error fetching weather data");
    }

    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(city);
    getWeatherWeeklyData(city);
  };

  const getDayOfWeek = (dateString) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return days[dayIndex];
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundImage: `url(./bgimg.jpg)`,
          backgroundSize: "cover", // Ensure the background image covers the entire box
          minHeight: "100vh",
        }}
      >
        <Paper
          sx={{
            // width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <Box>
            <Box
              sx={{
                marginTop: "50px",
                display: "flex",
                justifyContent: "center",
                // whiteSpace: "nowrap",
                marginBottom: "30px",
                top: 0,
                color: "#fff",
              }}
            >
              <header>Weather Forcast Report</header>
            </Box>
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  gap: "20px",
                }}
              >
                <TextField
                  sx={{
                    "& label": {
                      color: "#fff", // Change the color of the label
                    },
                    "& input": {
                      color: "#fff", // Change the color of the input value
                    },
                  }}
                  id="standard-basic"
                  label="Enter city"
                  variant="standard"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                {/* <button type="submit">Get Weather</button> */}
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{
                    color: "white",
                  }}
                >
                  Search
                </Button>
              </Box>
            </form>

            {!loading && weather ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                  }}
                >
                  <h3>{weather?.name}</h3>
                  <img
                    className=""
                    src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                    alt={weather?.weather[0].description}
                    width={100}
                    height={100}
                  />
                  {Math.round(weather?.main.temp)}
                  <sup className="deg">°C</sup>
                </Box>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    marginTop: "50px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              </>
            )}
          </Box>
        </Paper>

        {!loading && weather ? (
          <Box
            sx={{
              width: "100%",
              overflowX: "auto", // Enable horizontal scrolling
              whiteSpace: "nowrap", // Keep children on the same line
              display: "flex",
              gap: "20px",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            {weatherData?.list?.map((forecast, index) => {
              if (index <= 20) {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "20px",
                      color: "#fff",
                    }}
                  >
                    {getDayOfWeek(forecast.dt_txt)}
                    <img
                      className=""
                      src={`https://openweathermap.org/img/wn/${forecast?.weather[0].icon}@2x.png`}
                      alt={weather?.weather[0].description}
                      width={50}
                      height={50}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                      }}
                    >
                      {forecast.main.temp}
                      <sup className="deg">°C</sup>
                    </Box>
                  </Box>
                );
              }
            })}
          </Box>
        ) : (
          <>
            <Box
              sx={{
                marginTop: "50px",

                // width: "100%",
              }}
            >
              <LinearProgress />
              <LinearProgress />
              <LinearProgress />
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
