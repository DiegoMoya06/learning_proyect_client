import {PropsWithChildren} from "react";
import {CssBaseline} from "@mui/material";


export default function Page(props: PropsWithChildren) {
    return (
        <>
            <CssBaseline/>
            {props.children}
        </>
    )
}