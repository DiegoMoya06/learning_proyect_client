import {Breadcrumbs, Link, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export interface BreadcrumbInfo {
    name: string;
    url: string;
}

interface BreadcrumbOptsProps {
    // elements: { [key: string]: string };
    elements: BreadcrumbInfo[];
}

export default function BreadcrumbOpts(props: Readonly<BreadcrumbOptsProps>) {
    const {elements} = props;
    const navigate = useNavigate();

    const handleBreadcrumbClick = (url: string) => {
        if (url === '/deckDetails') {
            navigate(url, {state: {isDemo: true}});
        } else {
            navigate(url);
        }
    };

    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{marginTop: '2rem'}}>
            {elements.map((element, index) => (
                (index + 1) !== elements.length ?
                    <Link key={element.name} underline="hover" component="button" color="inherit"
                          onClick={() => handleBreadcrumbClick(element.url)}>
                        {element.name}
                    </Link> :
                    <Typography key={element.name} sx={{color: 'text.primary'}}>
                        {element.name}
                    </Typography>
            ))}
        </Breadcrumbs>
    );
};