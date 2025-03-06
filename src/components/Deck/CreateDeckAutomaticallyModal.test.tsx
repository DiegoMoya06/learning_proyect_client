import {configureStore} from "@reduxjs/toolkit";
import {vi} from "vitest";
import notificationSlice, {
    Notifications,
    NotificationSeverity,
    StateNotification
} from "../../slices/notificationSlice.ts";
import {render, screen, waitFor} from "@testing-library/react";
import {Provider} from "react-redux";
import CreateDeckAutomaticallyModal from "./CreateDeckAutomaticallyModal.tsx";
import userEvent from "@testing-library/user-event";

const useDispatchMock = vi.fn();

vi.mock("react-redux", async () => {
    const actual = await vi.importActual<typeof import('react-redux')>('react-redux');

    return {
        ...actual,
        useDispatch: () => useDispatchMock, // Mock useDispatch
        useSelector: vi.fn(), // Mock useSelector if needed
    };
});

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

vi.mock("../../services/AIService", () => ({
    AIService: {
        createDeckFromDS: vi.fn(() =>
            Promise.resolve({
                name: "Test Deck",
                generalDescription: "This is a test deck",
                cardsList: [{title: "Test Card", description: "Card Description"}],
            })
        ),
    },
}));

describe("CreateDeckAutomaticallyModal", () => {
    let store: any;
    let handleCloseMock: (event: object, reason: string) => void;
    const notificationInitialState: StateNotification = {
        autoClose: 2000,
        message: '',
        open: false,
        severity: NotificationSeverity.Info,
        progressBar: false
    }

    beforeEach(() => {
        store = configureStore({
            reducer: {
                notification: notificationSlice,
            },
            preloadedState: {
                notification: notificationInitialState,
            },
        });
        handleCloseMock = vi.fn();
        useDispatchMock.mockClear();
    });

    const renderComponent = (isOpen = true, isDemo = true) =>
        render(
            <Provider store={store}>
                <CreateDeckAutomaticallyModal
                    isOpen={isOpen}
                    isDemo={isDemo}
                    handleClose={handleCloseMock}
                />
            </Provider>
        );

    test("renders the modal with the correct elements", () => {
        renderComponent();

        expect(
            screen.getByText("Upload a PDF file to create a deck automatically")
        ).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Submit"})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Close"})).toBeInTheDocument();
    });

    test("handles file selection", async () => {
        renderComponent();
        const fileInput = screen.getByTestId("input-file") as HTMLInputElement;

        const file = new File(["sample content"], "sample.pdf", {
            type: "application/pdf",
        });

        await userEvent.upload(fileInput, file);

        expect(fileInput.files).toHaveLength(1);
        expect(fileInput.files?.[0].name).toBe("sample.pdf");
    });

    test("displays error notification if no file is selected", async () => {
        renderComponent();

        const submitButton = screen.getByRole("button", {name: "Submit"});
        await userEvent.click(submitButton);

        expect(useDispatchMock).toHaveBeenCalledWith(
            Notifications.notifyError("Please select a file.")
        );
    });

    test("submits form and updates state with new deck", async () => {
        renderComponent();

        const fileInput = screen.getByTestId("input-file") as HTMLInputElement;
        const file = new File(["sample content"], "sample.pdf", {
            type: "application/pdf",
        });

        await userEvent.upload(fileInput, file);
        const submitButton = screen.getByRole("button", {name: "Submit"});

        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(useDispatchMock).toHaveBeenCalledWith(
                Notifications.notifyInfo("Deck created correctly", 2000)
            );
        });

        expect(screen.getByText("New Deck:")).toBeInTheDocument();
        expect(screen.getByText("This is a test deck")).toBeInTheDocument();
        expect(screen.getByText("Card (1):")).toBeInTheDocument();
    });

    test("validates deck name and description inputs", async () => {
        renderComponent();

        const fileInput = screen.getByTestId("input-file") as HTMLInputElement;
        const file = new File(["sample content"], "sample.pdf", {
            type: "application/pdf",
        });

        await userEvent.upload(fileInput, file);
        const submitButton = screen.getByRole("button", {name: "Submit"});

        await userEvent.click(submitButton);

        const nameInput = screen.getByTestId("name-input").querySelector("input");
        const descriptionInput = screen.getByTestId("description-input").querySelector("textarea");
        const createButton = screen.getByTestId("create-button");

        if (nameInput) {
            await userEvent.clear(nameInput);
        }

        if (descriptionInput) {
            await userEvent.clear(descriptionInput);
        }

        expect(screen.getByText("Name can not be empty")).toBeInTheDocument();
        expect(screen.getByText("Description can not be empty")).toBeInTheDocument();
        expect(createButton).toBeDisabled();
    });

    test("closes the modal when clicking the close button", async () => {
        renderComponent();
        const closeButton = screen.getByRole("button", {name: "Close"});

        await userEvent.click(closeButton);
        expect(handleCloseMock).toHaveBeenCalled();
    });
});
