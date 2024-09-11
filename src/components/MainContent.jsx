import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Divider, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Prayer from './Prayer';
import moment from 'moment';
import FajrImage from '../assets/fagr.jpeg';
import DhuhrImage from '../assets/zhur.jpeg';
import AsrImage from '../assets/asr.jpeg';
import SunsetImage from '../assets/marib.jpeg';
import IshaImage from '../assets/isha.jpeg';

moment.locale("ar"); // To format the date in Arabic

export default function MainContent() {
  // STATES
  const [nextPrayerIndex, setNextPrayerIndex] = useState(2);
  const [timings, setTimings] = useState({
    Fajr: "04:20",
    Dhuhr: "11:50",
    Asr: "15:18",
    Sunset: "18:03",
    Isha: "19:33",
  });
  const [remainingTime, setRemainingTime] = useState("");
  const [selectedCity, setSelectedCity] = useState({
    displayName: "القاهرة",
    apiName: "Cairo",
  });
  const [today, setToday] = useState("");

  const availableCities = [
    { displayName: "القاهرة", apiName: "Cairo" },
    { displayName: "الإسكندرية", apiName: "Alexandria" },
    { displayName: "المنصورة", apiName: "Mansoura" },
    { displayName: "طنطا", apiName: "Tanta" },
    { displayName: "الأقصر", apiName: "Luxor" },
  ];

  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Sunset", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];

  const getTimings = async () => {
    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?country=EG&city=${selectedCity.apiName}`
      );
      setTimings(response.data.data.timings);
    } catch (error) {
      console.error("Failed to fetch prayer timings:", error);
    }
  };

  useEffect(() => {
    getTimings();
  }, [selectedCity]);

  useEffect(() => {
    const interval = setInterval(() => {
      setupCountdownTimer();
    }, 1000);

    setToday(moment().format("MMM Do YYYY | h:mm"));

    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  const setupCountdownTimer = () => {
    const momentNow = moment();

    let prayerIndex = 0;
    const prayerTimes = {
      Fajr: moment(timings.Fajr, "HH:mm"),
      Dhuhr: moment(timings.Dhuhr, "HH:mm"),
      Asr: moment(timings.Asr, "HH:mm"),
      Sunset: moment(timings.Sunset, "HH:mm"),
      Isha: moment(timings.Isha, "HH:mm"),
    };

    for (let i = 0; i < prayersArray.length - 1; i++) {
      if (momentNow.isBetween(prayerTimes[prayersArray[i].key], prayerTimes[prayersArray[i + 1].key])) {
        prayerIndex = i + 1;
        break;
      }
    }

    if (prayerIndex === 0 && momentNow.isAfter(prayerTimes.Isha)) {
      prayerIndex = 0; // Assuming next prayer is Fajr
    }

    setNextPrayerIndex(prayerIndex);

    const nextPrayer = prayersArray[prayerIndex];
    const nextPrayerTime = prayerTimes[nextPrayer.key];
    const remainingTime = nextPrayerTime.diff(momentNow);

    const durationRemainingTime = moment.duration(remainingTime);

    setRemainingTime(
      `${String(durationRemainingTime.hours()).padStart(2, '0')} : ${String(durationRemainingTime.minutes()).padStart(2, '0')} : ${String(durationRemainingTime.seconds()).padStart(2, '0')}`
    );
  };

  const handleCityChange = (event) => {
    const cityObject = availableCities.find(city => city.apiName === event.target.value);
    setSelectedCity(cityObject);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <div>
            <h2>{today}</h2>
            <h1>{selectedCity.displayName}</h1>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <h2 >متبقي حتى صلاة {prayersArray[nextPrayerIndex].displayName}</h2>
            <h1>{remainingTime}</h1>
          </div>
        </Grid>
      </Grid>

      <Divider style={{ borderColor: "white", opacity: "0.1" }} />

      <Stack direction="row" justifyContent="space-around" style={{ marginTop: "50px" }}>
        <Prayer name="الفجر" time={timings.Fajr} image={FajrImage} />
        <Prayer name="الظهر" time={timings.Dhuhr} image={DhuhrImage} />
        <Prayer name="العصر" time={timings.Asr} image={AsrImage} />
        <Prayer name="المغرب" time={timings.Sunset} image={SunsetImage} />
        <Prayer name="العشاء" time={timings.Isha} image={IshaImage} />
      </Stack>

      <Stack direction="row" justifyContent="center" style={{ marginTop: "40px" }}>
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="city-select-label"><span style={{ color: "white" }}>المدينة</span></InputLabel>
          <Select
            labelId="city-select-label"
            id="city-select"
            value={selectedCity.apiName}
            onChange={handleCityChange}
            style={{ color: "white"}}
          >
            {availableCities.map(city => (
              <MenuItem  key={city.apiName} value={city.apiName}>
                {city.displayName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
