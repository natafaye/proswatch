import { configureStore } from "@reduxjs/toolkit";
import { colorReducer } from "./colorSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    colors: colorReducer,
  }
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()