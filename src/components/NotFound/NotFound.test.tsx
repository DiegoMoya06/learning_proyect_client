import {vi} from "vitest";
import {BrowserRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import NotFound from "./NotFound.tsx";

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

const useDispatchMock = vi.fn();
const useSelectorMock = vi.fn();
vi.mock('react-redux', () => ({
    useDispatch: () => useDispatchMock,
    useSelector: () => useSelectorMock,
}));

describe('NotFound', () => {
    it("renders the 404 message", () => {
        render(
            <BrowserRouter>
                <NotFound/>
            </BrowserRouter>
        );

        expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
        expect(screen.getByText("Oops! The page you are looking for does not exist.")).toBeInTheDocument();
    });

    it("renders the home link", () => {
        render(
            <BrowserRouter>
                <NotFound/>
            </BrowserRouter>
        );

        const homeLink = screen.getByRole("link", {name: /Go Home/i});
        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveAttribute("href", "/");
    });
});
