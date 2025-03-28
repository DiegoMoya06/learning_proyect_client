import {Box, Button, CircularProgress, Container} from "@mui/material";
import {Fragment, useCallback, useEffect, useState} from "react";
import ReplayIcon from '@mui/icons-material/Replay';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import './cards.css';
import {CardsService} from "../../services/CardsService.ts";
import {useLocation, useParams} from "react-router-dom";
import {CardModel} from "../../types/models/CardModel.ts";
import {useDemo} from "../../hooks/useDemo.ts";
import {useSelector} from "react-redux";
import {demoCardsSelector, updateCardRate} from "../../slices/demoSlice.ts";
import {WeightType} from "../../types/models/DeckModel.ts";
import CardToDisplay from "./CardToDisplay.tsx";
import BreadcrumbOpts from "../Breadcrumbs/BreadcrumbOpts.tsx";
import {Notifications} from "../../slices/notificationSlice.ts";
import {useAppDispatch} from "../../utils/store.ts";

export default function Cards() {
    const location = useLocation();
    const {deckId} = useParams();
    const dispatch = useAppDispatch();
    const {getRandomCard, handleWeight, calculateAdjustedRates} = useDemo();
    const demoCardsList = useSelector(demoCardsSelector);
    const isDemo = location.state?.isDemo ?? false;
    const dbDeck = location.state?.dbDeck;

    const [dbCards, setDbCards] = useState<CardModel[]>([]);
    const [selectedCard, setSelectedCard] = useState<CardModel | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const breadcrumbs = [
        {name: 'Dashboard', url: '/'},
        ...(isDemo ? [] : [{name: 'Library', url: '/library'}]),
        ...(isDemo ?
                [{name: 'Deck Details', url: '/deckDetails/' + isDemo.toString()}] :
                [{name: 'Deck Details', url: '/deckDetails/' + isDemo.toString(), state: {selectedDBDeck: dbDeck}}]
        ),
        {name: 'Cards View', url: ''}
    ];

    useEffect(() => {
        if (isDemo) {
            setDbCards(demoCardsList);
            if (!selectedCard) {
                setSelectedCard(getRandomCard(demoCardsList) ?? null);
                setIsLoading(false);
            }
        } else if (dbDeck) {
            setDbCards(dbDeck.cards);
            setSelectedCard(getRandomCard(dbDeck.cards) ?? null);
            setIsLoading(false);
        } else if (deckId) {
            CardsService.getAllCardsByDeckId(deckId).then((data) => {
                setDbCards(data);
                setSelectedCard(getRandomCard(data) ?? null);
            }).catch((error) => {
                console.error(error);
                dispatch(Notifications.notifyError(error.toString(), 4000))
            }).finally(() => setIsLoading(false));
        }
    }, [isDemo, deckId, demoCardsList, selectedCard, dbDeck]);

    const handleRateCard = useCallback((weightType: WeightType) => {
        if (!selectedCard) return;

        const totalRate = Object.values(dbCards)
            .reduce((sum, cardElement) => sum + cardElement.rate, 0);

        if (isDemo && selectedCard) {
            let updatedCard: CardModel = handleWeight(weightType, selectedCard, totalRate);
            let filteredCards = dbCards.filter(card => card.id !== updatedCard?.id)
                .concat(updatedCard || []);

            const adjustedCards = calculateAdjustedRates(filteredCards,updatedCard?.id);

            setDbCards(adjustedCards);

            adjustedCards.forEach(card => dispatch(updateCardRate(card)));
            const randomCard = getRandomCard(adjustedCards, selectedCard?.id) ?? null;
            setSelectedCard(randomCard);
        } else {
            CardsService.updateCardWeight(weightType, selectedCard.id).then((data) => {
                setDbCards(data.cards ?? []);
                setSelectedCard(getRandomCard(data.cards ?? []) ?? null);
            }).catch((error) => {
                console.error(error);
                dispatch(Notifications.notifyError(error.toString(), 4000))
            });
        }
    }, [dbCards, selectedCard]);

    return (
        <Container maxWidth="lg">
            <BreadcrumbOpts elements={breadcrumbs}/>

            <Box className="main_content">
                {isLoading ? (
                    <CircularProgress size="3rem"/>
                ) : (
                    <Fragment>
                        <CardToDisplay cardData={selectedCard} isEditing={false}/>

                        <Box className="actions">
                            <Button data-testid="again-button" size="large" variant="outlined" endIcon={<ReplayIcon/>}
                                    onClick={() => handleRateCard("Hard")} disabled={!selectedCard}>
                                Again
                            </Button>
                            <Button data-testid="good-button" size="large" variant="outlined" endIcon={<DoneIcon/>}
                                    onClick={() => handleRateCard("Medium")} disabled={!selectedCard}>
                                Good
                            </Button>
                            <Button data-testid="easy-button" size="large" variant="outlined" endIcon={<DoneAllIcon/>}
                                    onClick={() => handleRateCard("Easy")} disabled={!selectedCard}>
                                Easy
                            </Button>
                        </Box>
                    </Fragment>
                )}
            </Box>
        </Container>
    );
}