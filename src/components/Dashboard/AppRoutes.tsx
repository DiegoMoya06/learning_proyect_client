import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Dashboard from "./Dashboard.tsx";
import Page from "../Page";
import Cards from "../Cards";


export default function AppRoutes() {
    const dashboard = <Page><Dashboard/></Page>;
    const cardsView = <Page><Cards/></Page>

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path={"/"} element={dashboard}/>
                <Route path={"cards"} element={cardsView}/>
            </>
        )
    );

    return <RouterProvider router={router}/>;
}