import {Breadcrumbs, Link, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {DeckModel} from "../../types/models/DeckModel.ts";

export interface BreadcrumbInfo {
    name: string;
    url: string;
    state?: {
        isDemo?: boolean,
        selectedDBDeck?: DeckModel
    };
}

interface BreadcrumbOptsProps {
    // elements: { [key: string]: string };
    elements: BreadcrumbInfo[];
}

export default function BreadcrumbOpts(props: Readonly<BreadcrumbOptsProps>) {
    const {elements} = props;
    const navigate = useNavigate();

    const handleBreadcrumbClick = (breadcrumbData: BreadcrumbInfo) => {
        const {url, state} = breadcrumbData;

        if (url.includes('/deckDetails')) {
            navigate(url, {state: {selectedDBDeck: state?.selectedDBDeck}});
        } else {
            navigate(url);
        }
    };

    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{marginTop: '2rem'}}>
            {elements.map((element, index) => (
                (index + 1) !== elements.length ?
                    <Link key={element.name} underline="hover" component="button" color="inherit"
                          onClick={() => handleBreadcrumbClick(element)}>
                        {element.name}
                    </Link> :
                    <Typography key={element.name} sx={{color: 'text.primary'}}>
                        {element.name}
                    </Typography>
            ))}
        </Breadcrumbs>
    );
};