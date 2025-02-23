import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard.tsx";
import Page from "../Page";
import Cards from "../Cards";
import Library from "../Library";
import Login from "../Login";
import DeckDetails from "../Deck";
import ProtectedRoute from "./ProtectedRoute.tsx";


export default function AppRoutes() {
    const dashboard = <Page><Dashboard/></Page>;
    const login = <Page><Login/></Page>;
    const deckDetails = <Page><DeckDetails/></Page>;
    const library = <Page><Library/></Page>;
    const cardsView = <Page><Cards/></Page>;

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                {/* Public routes */}
                <Route path="/login" element={login} />
                <Route path="/" element={dashboard}/>
                <Route path="/deckDetails" element={deckDetails}/>
                <Route path="/library/cards/:deckId" element={cardsView}/>

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="library" element={library}/>
                    {/*TODO: check will be modified to check how to difference it from demo*/}
                    <Route path="/library/cards/:deckId" element={cardsView}/>
                </Route>
            </>
        )
    );

    return <RouterProvider router={router}/>;
}