import {useCallback, useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {demoDeckSelector} from "../../slices/demoSlice.ts";
import {DeckModel} from "../../types/models/DeckModel.ts";
import {Box, Button, Card, CardActions, CardContent, Chip, Container, Typography} from "@mui/material";
import CircularProgressWithLabel from "./CircularProgressWithLabel.tsx";
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useLocation, useNavigate} from "react-router-dom";
import './deckDetails.css';
import DeckStats from "./DeckStats.tsx";
import BreadcrumbOpts from "../Breadcrumbs/BreadcrumbOpts.tsx";
import {Notifications} from "../../slices/notificationSlice.ts";
import {useAppDispatch} from "../../utils/store.ts";
import {AIService} from "../../services/AIService.ts";

export default function DeckDetails() {
    const navigate = useNavigate();
    const location = useLocation();

    const demoDeckObj = useSelector(demoDeckSelector);

    const [deck, setDeck] = useState<DeckModel>();

    const isDemo = useMemo(() => location.state?.isDemo ?? false, [location.state]);
    const cardsTotal = deck?.cards?.length ?? 0;
    const learnedCards = deck?.cards?.filter((card) => card.timesDisplayed > 0).length ?? 0;
    const percentage = cardsTotal > 0 ? (learnedCards * 100) / cardsTotal : 0;

    const breadcrumbs = [{name: 'Dashboard', url: '/'}, {name: 'Deck Details', url: ''}];

    const handleStartLearning = useCallback(() => (
        navigate('../library/cards/' + deck?.id, {state: {isDemo: true}})
    ), [navigate, deck?.id]);

    useEffect(() => {
        if (isDemo) {
            setDeck(demoDeckObj);
        } else {
            //     TODO: call service to fill cards
        }
    }, [isDemo, demoDeckObj]);

    // TODO: AI CODE
    const dispatch = useAppDispatch();

    const [file, setFile] = useState<File | null>();
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            dispatch(Notifications.notifyError('Please select a file.'));
            return;
        }

        setLoading(true);

        AIService.createDeckFromDS(file).then((data) => {
            setResult(data);
        }).catch((error) => {
            console.log(error);
            dispatch(Notifications.notifyError(error.toString(), 4000));
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <Container maxWidth="lg">
            <BreadcrumbOpts elements={breadcrumbs}/>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2rem',
                marginTop: '2rem',
            }}>
                <input
                    type="file"
                    onChange={handleFileChange}
                />
                <Button onClick={handleSubmit} disabled={loading}>{loading ? 'Loading...' : 'Submit'}</Button>
                {result && (
                    <div>
                        <h2>Result:</h2>
                        <pre>{JSON.stringify(result, null, 2)}</pre>
                    </div>
                )}
                <Card sx={{maxWidth: 800}}>
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
                        <Button size="small" onClick={handleStartLearning} disabled={!deck?.id}>
                            Start learning
                        </Button>
                    </CardActions>
                </Card>

                <DeckStats deckCards={deck?.cards || []} isDemo={isDemo}/>
            </Box>
        </Container>
    );
}