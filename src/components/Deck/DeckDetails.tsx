import {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {demoDeckSelector} from "../../slices/demoSlice.ts";
import {DeckModel} from "../../types/models/DeckModel.ts";
import {Box, Button, Card, CardActions, CardContent, Chip, Container, Typography} from "@mui/material";
import CircularProgressWithLabel from "./CircularProgressWithLabel.tsx";
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useLocation, useNavigate} from "react-router-dom";
import './deckDetails.css';

export default function DeckDetails() {
    const navigate = useNavigate();
    const location = useLocation();

    const demoDeckObj = useSelector(demoDeckSelector);

    const [deck, setDeck] = useState<DeckModel>();

    const isDemo = location.state.isDemo ?? false;
    const cardsTotal = deck?.cards?.length ?? 0;
    const learnedCards = deck?.cards?.filter((card) => card.displayedTimes > 0).length ?? 0;
    const percentage = cardsTotal > 0 ? (learnedCards * 100) / cardsTotal : 0;

    const handleStartLearning = useCallback(() => navigate('../library/cards/' + deck?.id), [navigate, deck?.id]);

    useEffect(() => {
        console.log("IS DEMOO",isDemo);
        if (isDemo) {
            console.log("demoDeckObj", demoDeckObj);
            setDeck(demoDeckObj);
        } else {
            //     TODO: call service to fill cards
        }
    }, [isDemo, demoDeckObj]);

    useEffect(() => {
        console.log("PRINTING DECK", deck);
    }, [deck]);

    return (
        <Container maxWidth="lg">
            <Card sx={{maxWidth: 345}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {deck?.name}
                    </Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary'}}>
                        {deck?.description}
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        margin: '2rem 2rem 0 2rem'
                    }}>
                        <Box className="centered_box">
                            <CircularProgressWithLabel value={percentage}/>
                        </Box>
                        <Box className="centered_box" sx={{marginBottom: '1rem'}}>
                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                {`Total number of cards: ${cardsTotal}`}
                            </Typography>
                        </Box>
                        <Box className="centered_box" sx={{margin: '0.5rem'}}>
                            <Chip sx={{margin: '0 0.2rem'}} icon={<PendingIcon/>}
                                  label={`${(cardsTotal - learnedCards)} ${(cardsTotal - learnedCards) === 1 ? 'card' : 'cards'} to learn`}
                                  variant="outlined"/>
                            <Chip sx={{margin: '0 0.2rem'}} icon={<CheckCircleIcon/>}
                                  label={`${learnedCards} ${learnedCards === 1 ? 'card' : 'cards'} to repeat`}
                                  variant="outlined"/>
                        </Box>
                    </Box>
                </CardContent>
                <CardActions className="centered_box">
                    <Button size="small" onClick={handleStartLearning} disabled={!deck?.id}>Start learning</Button>
                    <Button size="small">Show deck details</Button>
                </CardActions>
            </Card>
        </Container>
    );
}