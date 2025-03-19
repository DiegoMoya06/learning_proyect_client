import {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {demoDeckSelector} from "../../slices/demoSlice.ts";
import {DeckModel} from "../../types/models/DeckModel.ts";
import {Box, Button, Card, CardActions, CardContent, Chip, Container, Typography} from "@mui/material";
import CircularProgressWithLabel from "./CircularProgressWithLabel.tsx";
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import './deckDetails.css';
import DeckStats from "./DeckStats.tsx";
import BreadcrumbOpts from "../Breadcrumbs/BreadcrumbOpts.tsx";
import CreateDeckAutomaticallyModal from "./CreateDeckAutomaticallyModal.tsx";

export default function DeckDetails() {
    const navigate = useNavigate();
    const {isDemo} = useParams();
    const isDemoType = isDemo === 'true';
    const demoDeckObj = useSelector(demoDeckSelector);
    const location = useLocation();

    const selectedDBDeck: DeckModel = location.state?.selectedDBDeck;

    const [deck, setDeck] = useState<DeckModel>();
    const [openCreateADeckModal, setOpenCreateADeckModal] = useState<boolean>(false);

    const cardsTotal = deck?.cards?.length ?? 0;
    const learnedCards = deck?.cards?.filter((card) => card.timesDisplayed > 0).length ?? 0;
    const percentage = cardsTotal > 0 ? (learnedCards * 100) / cardsTotal : 0;

    const breadcrumbs = [
        {name: 'Dashboard', url: '/'},
        ...(isDemoType ? [] : [{name: 'Library', url: '/library'}]),
        {name: 'Deck Details', url: ''}
    ];

    const handleStartLearning = useCallback(() => (
        navigate('../library/cards/' + deck?.id, {state: {isDemo: isDemoType, dbDeck: deck}})
    ), [navigate, deck, isDemoType]);

    const handleCreateADeck = () => {
        setOpenCreateADeckModal(true);
    };

    const handleCloseCreateADeckModal = (_event: object, reason: string) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            setOpenCreateADeckModal(false);
        }
    };

    useEffect(() => {
        setDeck(isDemoType ? demoDeckObj : selectedDBDeck);
    }, [isDemoType, demoDeckObj, selectedDBDeck]);

    return (
        <Container maxWidth="lg">
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
                <BreadcrumbOpts elements={breadcrumbs}/>
                {isDemoType && (
                    <Button variant="outlined" size="small" startIcon={<AddIcon/>} onClick={handleCreateADeck}>
                        Create Deck
                    </Button>
                )}
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2rem',
                marginTop: '2rem',
            }}>

                <Card sx={{maxWidth: 800}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" data-testid="deck-name">
                            {deck?.name ? deck?.name : ""}
                        </Typography>
                        <Typography variant="body1" sx={{color: 'text.secondary'}} data-testid="deck-description">
                            {deck?.description ?? ""}
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
                        <Button size="small" onClick={handleStartLearning} disabled={!deck?.id}>
                            Start learning
                        </Button>
                    </CardActions>
                </Card>

                <DeckStats deckCards={deck?.cards || []} isDemo={isDemoType}/>
            </Box>
            <CreateDeckAutomaticallyModal isOpen={openCreateADeckModal} isDemo={isDemoType}
                                          handleClose={handleCloseCreateADeckModal}/>
        </Container>
    );
}