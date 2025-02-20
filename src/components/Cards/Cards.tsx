import {Box, Button, Card, CardContent, Container, Divider, Typography} from "@mui/material";
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
import DraggableArea from "./DraggableArea.tsx";

export default function Cards() {
    const location = useLocation();
    const {deckId} = useParams();
    const {getRandomCard, handleWeight} = useDemo();
    const demoCardsList = useSelector(demoCardsSelector);
    const isDemo = location.state.isDemo ?? false;

    const [dbCards, setDbCards] = useState<CardModel[]>([]);
    const [selectedCard, setSelectedCard] = useState<CardModel | null>();

    useEffect(() => {
        if (isDemo) {
            setDbCards(demoCardsList);

            if (!selectedCard) {
                setSelectedCard(getRandomCard(demoCardsList));
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
            <Box>
                <DraggableArea/>
            </Box>
            
            <Box className="main_content">
                {selectedCard ? (
                    <Card className="card" key={selectedCard.id}>
                        <CardContent className="card_content">
                            <Box className="card_title">
                                <Typography gutterBottom variant="h6">
                                    {selectedCard.title}
                                </Typography>
                                <Divider/>
                            </Box>

                            <Box className="card_description">
                                <Typography className="description_text" gutterBottom>
                                    {selectedCard.description}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ) : (
                    <Typography gutterBottom variant="h6">
                        No cards available
                    </Typography>
                )}

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