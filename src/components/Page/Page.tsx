import {PropsWithChildren} from "react";
import {CssBaseline} from "@mui/material";
import Navbar from "../Navbar";
import Notification from "./Notification.tsx";


export default function Page(props: PropsWithChildren) {
    return (
        <>
            <CssBaseline/>
            <Navbar/>
            <Notification/>
            {props.children}
        </>
    )
}