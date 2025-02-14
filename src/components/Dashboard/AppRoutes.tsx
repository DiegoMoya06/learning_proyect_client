import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Dashboard from "./Dashboard.tsx";
import Page from "../Page";
import Cards from "../Cards";
import Library from "../Library";
import Login from "../Login";
import Demo from "../Demo";


export default function AppRoutes() {
    const dashboard = <Page><Dashboard/></Page>;
    const login = <Page><Login/></Page>;
    const demo = <Page><Demo/></Page>;
    const library = <Page><Library/></Page>;
    const cardsView = <Page><Cards/></Page>;

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path={"/"} element={dashboard}/>
                <Route path={"/login"} element={login}/>
                <Route path={"/demo"} element={demo}/>
                <Route path={"library"} element={library}/>
                <Route path={"/library/cards/:deckId"} element={cardsView}/>
            </>
        )
    );

    return <RouterProvider router={router}/>;
}