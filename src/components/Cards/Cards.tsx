import {Box, Button, Container} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import ReplayIcon from '@mui/icons-material/Replay';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import './cards.css';
import {CardsService} from "../../services/CardsService.ts";
import {useLocation, useParams} from "react-router-dom";
import {CardModel} from "../../types/models/CardModel.ts";
import {useDemo} from "../../hooks/useDemo.ts";
import {useSelector} from "react-redux";
import {demoCardsSelector} from "../../slices/demoSlice.ts";
import {WeightType} from "../../types/models/DeckModel.ts";
import CardToDisplay from "./CardToDisplay.tsx";
import BreadcrumbOpts from "../Breadcrumbs/BreadcrumbOpts.tsx";

export default function Cards() {
    const location = useLocation();
    const {deckId} = useParams();
    const {getRandomCard, handleWeight} = useDemo();
    const demoCardsList = useSelector(demoCardsSelector);
    const isDemo = location.state?.isDemo ?? false;

    const [dbCards, setDbCards] = useState<CardModel[]>([]);
    const [selectedCard, setSelectedCard] = useState<CardModel | null>(null);

    const breadcrumbs = [
        {name: 'Dashboard', url: '/'},
        {name: 'Deck Details', url: '/deckDetails'},
        {name: 'Cards View', url: ''}
    ];

    useEffect(() => {
        if (isDemo) {
            setDbCards(demoCardsList);

            if (!selectedCard) {
                setSelectedCard(getRandomCard(demoCardsList) ?? null);
            }
        } else if (deckId) {
            CardsService.getAllCadsByDeckId(deckId).then((data) => {
                setDbCards(data);
            }).catch((error) => {
                console.log("Error", error);
            });
        }
    }, [isDemo, deckId, demoCardsList, selectedCard]);

    const handleRateCard = useCallback((weightType: WeightType) => {
        if (!selectedCard) return;

        const totalRate = Object.values(dbCards)
            .reduce((sum, cardElement) => sum + cardElement.rate, 0);
        handleWeight(weightType, selectedCard, totalRate);
        const randomCard = getRandomCard(dbCards, selectedCard?.id) ?? null;
        setSelectedCard(randomCard);
    }, [dbCards, selectedCard]);

    return (
        <Container maxWidth="lg">
            <BreadcrumbOpts elements={breadcrumbs}/>

            <Box className="main_content">
                <CardToDisplay cardData={selectedCard}/>

                <Box className="actions">
                    <Button data-testid="again-button" size="large" variant="outlined" endIcon={<ReplayIcon/>}
                            onClick={() => handleRateCard("Hard")}>
                        Again
                    </Button>
                    <Button data-testid="good-button" size="large" variant="outlined" endIcon={<DoneIcon/>}
                            onClick={() => handleRateCard("Medium")}>
                        Good
                    </Button>
                    <Button data-testid="easy-button" size="large" variant="outlined" endIcon={<DoneAllIcon/>}
                            onClick={() => handleRateCard("Easy")}>
                        Easy
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}