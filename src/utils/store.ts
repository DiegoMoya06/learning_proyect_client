import {configureStore} from "@reduxjs/toolkit";
import demoSlice from "../slices/demoSlice.ts";
import {useDispatch} from "react-redux";
import {NotificationReducer} from "../slices/notificationSlice.ts";

export const store = configureStore({
    reducer: {
        demoInfo: demoSlice,
        notification: NotificationReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
