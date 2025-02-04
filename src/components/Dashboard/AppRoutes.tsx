import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Dashboard from "./Dashboard.tsx";
import Page from "../Page";


export default function AppRoutes() {
    let dashboard = <Page><Dashboard/></Page>;

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path={""} element={dashboard}/>
            </>
        )
    );

    return <RouterProvider router={router}/>;
}