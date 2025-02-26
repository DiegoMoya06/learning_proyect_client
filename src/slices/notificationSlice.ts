import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../utils/store.ts";

export enum NotificationSeverity {
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
    Error = 'error',
}

export interface NotificationData {
    readonly severity: NotificationSeverity;
    readonly message: string;
    readonly autoClose: number;
    readonly progressBar?: boolean;
}

export interface StateNotification extends NotificationData {
    readonly open: boolean;
}

const DEFAULT_AUTO_CLOSE = 2000;

const notificationInitialState: StateNotification = {
    autoClose: DEFAULT_AUTO_CLOSE,
    message: '',
    open: false,
    severity: NotificationSeverity.Info,
    progressBar: false
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: notificationInitialState,
    reducers: {
        showNotification(state, action: PayloadAction<NotificationData>) {
            const {
                severity, message, autoClose,
                progressBar
            } = action.payload;

            return {
                ...state,
                severity,
                message,
                autoClose,
                progressBar,
                open: true,
            };
        },
        hideNotification(state) {
            return {
                ...state,
                open: false
            };
        }
    }
});

const {actions} = notificationSlice;

export const notificationSelector = (state: RootState): StateNotification => state.notification;

const createNotification = (
    severity: NotificationSeverity,
    message: string = 'Empty message',
    autoClose: number = DEFAULT_AUTO_CLOSE,
    progressBar?: boolean
) => {
    return actions.showNotification({
        severity,
        message,
        autoClose,
        progressBar,
    });
}

export const Notifications = {
    notifyInfo: (message: string = '', autoClose?: number, progressBar?: boolean) => (
        createNotification(NotificationSeverity.Info, message, autoClose, progressBar)
    ),
    notifySuccess: (message: string = '', autoClose?: number, progressBar?: boolean) => (
        createNotification(NotificationSeverity.Success, message, autoClose, progressBar)
    ),
    notifyWarning: (message: string = '', autoClose?: number, progressBar?: boolean) => (
        createNotification(NotificationSeverity.Warning, message, autoClose, progressBar)
    ),
    notifyError: (message: string = '', autoClose?: number, progressBar?: boolean) => (
        createNotification(NotificationSeverity.Error, message, autoClose, progressBar)
    ),
    hideNotification: () => {
        return actions.hideNotification();
    }
};

export const {
    showNotification, hideNotification
} = notificationSlice.actions;
export default notificationSlice.reducer;