import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Dashboard from "./Dashboard.tsx";


export default function AppRoutes(){
    let dashboard = <Dashboard/>;

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={dashboard}/>
            </>
        )
    );

    return <RouterProvider router={router}/>;
}