import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Achievement {
  id: number;
  title: string;
  description: string;
  temperature: string;
  humidity: string;
}

// API Endpoint
const API_URL = "https://api-open.data.gov.sg/v2/real-time/api/twenty-four-hr-forecast";

export const fetchWeatherData = createAsyncThunk("achievements/fetchWeather", async () => {
  const response = await axios.get(API_URL);
  const forecast = response.data?.data?.items?.[0]?.general;

  return {
    temperature: `${forecast?.temperature?.low}°C - ${forecast?.temperature?.high}°C`,
    humidity: `${forecast?.relative_humidity?.low}% - ${forecast?.relative_humidity?.high}%`,
  };
});

// Initial State
const initialState: Achievement[] = [];

// Slice
const achievementSlice = createSlice({
  name: "achievements",
  initialState,
  reducers: {
    addAchievement: (state, action: PayloadAction<Omit<Achievement, "id">>) => {
      const newAchievement = { id: Date.now(), ...action.payload };
      state.push(newAchievement);
    },
    updateAchievement: (state, action: PayloadAction<Achievement>) => {
      const index = state.findIndex((ach) => ach.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteAchievement: (state, action: PayloadAction<number>) => {
      return state.filter((ach) => ach.id !== action.payload);
    },
  },
});

export const { addAchievement, updateAchievement, deleteAchievement } = achievementSlice.actions;
export default achievementSlice.reducer;
