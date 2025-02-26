import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import Notification from './Notification';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import notificationSlice, {
    hideNotification,
    NotificationSeverity,
    StateNotification
} from "../../slices/notificationSlice.ts";

describe('Notification', () => {

    const renderWithStore = (initialState: StateNotification) => {
        const store = configureStore({
            reducer: {
                notification: notificationSlice,
            },
            preloadedState: {
                notification: initialState,
            },
        });

        return render(
            <Provider store={store}>
                <Notification/>
            </Provider>
        );
    };

    it('renders the Snackbar and Alert when open is true', () => {
        renderWithStore({
            open: true,
            message: 'Test message',
            severity: NotificationSeverity.Info,
            autoClose: 5000,
            progressBar: false,
        });

        expect(screen.getByTestId('notification-snackbar')).toBeInTheDocument();
        expect(screen.getByTestId('notification.alert')).toBeInTheDocument();
        expect(screen.getByTestId('notification.message')).toHaveTextContent('Test message');
    });

    it('does not render the Snackbar when open is false', () => {
        renderWithStore({
            open: false,
            message: 'Test message',
            severity: NotificationSeverity.Info,
            autoClose: 5000,
            progressBar: false,
        });

        expect(screen.queryByTestId('notification-snackbar')).not.toBeInTheDocument();
    });

    it('renders the LinearProgress when progressBar is true', () => {
        renderWithStore({
            open: true,
            message: 'Test message',
            severity: NotificationSeverity.Info,
            autoClose: 5000,
            progressBar: true,
        });

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('calls hideNotification when the Snackbar is closed', () => {
        const store = configureStore({
            reducer: {
                notification: notificationSlice,
            },
            preloadedState: {
                notification: {
                    open: true,
                    message: 'Test message',
                    severity: NotificationSeverity.Info,
                    autoClose: 5000,
                    progressBar: false,
                },
            },
        });

        const dispatchSpy = vi.spyOn(store, 'dispatch');

        render(
            <Provider store={store}>
                <Notification/>
            </Provider>
        );

        const snackbar = screen.getByTestId('notification-snackbar');
        fireEvent.keyDown(snackbar, {key: 'Escape'});

        expect(dispatchSpy).toHaveBeenCalledWith(hideNotification());
    });

    it('does not call hideNotification when the Snackbar is closed due to clickaway', () => {
        const store = configureStore({
            reducer: {
                notification: notificationSlice,
            },
            preloadedState: {
                notification: {
                    open: true,
                    message: 'Test message',
                    severity: NotificationSeverity.Info,
                    autoClose: 5000,
                    progressBar: false,
                },
            },
        });

        const dispatchSpy = vi.spyOn(store, 'dispatch');

        render(
            <Provider store={store}>
                <Notification/>
            </Provider>
        );

        const snackbar = screen.getByTestId('notification-snackbar');
        fireEvent.click(snackbar);

        expect(dispatchSpy).not.toHaveBeenCalledWith(hideNotification());
    });
});