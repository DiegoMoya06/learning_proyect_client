import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Dashboard from "./Dashboard.tsx";
import Page from "../Page";
import Cards from "../Cards";
import Library from "../Library";


export default function AppRoutes() {
    const dashboard = <Page><Dashboard/></Page>;
    const cardsView = <Page><Cards/></Page>
    const library = <Page><Library/></Page>

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path={"/"} element={dashboard}/>
                <Route path={"library"} element={library}/>
                <Route path={"/library/cards/:deckId"} element={cardsView}/>
            </>
        )
    );

    return <RouterProvider router={router}/>;
}