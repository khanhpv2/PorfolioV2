import { configureStore } from "@reduxjs/toolkit";
import achievementReducer from "./achievementSlice";

export const store = configureStore({
  reducer: {
    achievements: achievementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
