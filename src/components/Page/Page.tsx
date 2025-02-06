import {PropsWithChildren} from "react";
import {CssBaseline} from "@mui/material";
import Navbar from "../Navbar";


export default function Page(props: PropsWithChildren) {
    return (
        <>
            <CssBaseline/>
            <Navbar/>
            {/*TODO: add Notification here*/}
            {props.children}
        </>
    )
}