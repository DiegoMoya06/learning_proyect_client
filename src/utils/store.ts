import {configureStore} from "@reduxjs/toolkit";
import demoSlice from "../slices/demoSlice.ts";
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        demoInfo: demoSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
