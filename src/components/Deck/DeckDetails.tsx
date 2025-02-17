import {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {demoDeckSelector, isDemoSelector} from "../../slices/demoSlice.ts";
import {DeckModel} from "../../types/models/DeckModel.ts";
import {Box, Button, Card, CardActions, CardContent, CircularProgress, Container, Typography} from "@mui/material";


export default function DeckDetails() {
    // TODO: remove
    // const dispatch = useAppDispatch();
    const isDemo = useSelector(isDemoSelector);
    const demoDeckObj = useSelector(demoDeckSelector);

    const [deck, setDeck] = useState<DeckModel>();

    const learnedCards = useMemo(() =>
        deck?.cards?.filter(card => card.displayedTimes === 0)?.length ?? 0, [deck]);

    useEffect(() => {
        if (isDemo && demoDeckObj.cards) {
            setDeck(demoDeckObj);
        } else {
            //     TODO: call service to fill cards
        }
    }, []);


    return (
        <Container maxWidth="lg">
            {/*TODO: remove*/}
            {/*<Typography sx={{mt: 4, mb: 6}} variant="h6" component="div">*/}
            {/*    Deck*/}
            {/*</Typography>*/}
            <Card sx={{maxWidth: 345}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {deck?.name}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        {deck?.description}
                    </Typography>

                    <Box sx={{position: 'relative', display: 'inline-flex'}}>
                        <CircularProgress variant="determinate"/>
                        <Box
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography
                                variant="caption"
                                component="div"
                                sx={{color: 'text.secondary'}}
                            >{`${Math.round(((deck?.cards?.length ?? 0) - learnedCards))}%`}</Typography>
                        </Box>
                    </Box>
                </CardContent>
                <CardActions>
                    <Button size="small">Start learning</Button>
                    <Button size="small">Show deck details</Button>
                </CardActions>
            </Card>
            <Box>

            </Box>
        </Container>
    );
}