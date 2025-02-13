import {Box, Card, CardActionArea, CardContent, Container, Typography} from "@mui/material";

const cards = [
    {
        id: 1,
        title: 'Demo',
        description: 'Example of the application.',
    },
    {
        id: 2,
        title: 'Login',
        description: 'Start learning with your own decks and cards.',
    },
];

export default function Dashboard() {

    return (
        <Container maxWidth="lg">
            <Typography sx={{mt: 4, mb: 6}} variant="h6" component="div">
                Choose one of the following options
            </Typography>

            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                {cards.map((card) => (
                    <Card key={card.id} sx={{marginLeft: '3rem', width: '17rem'}}>
                        <CardActionArea
                            onClick={() => {
                            }}
                            sx={{
                                height: '100%',
                                '&[data-active]': {
                                    backgroundColor: 'action.selected',
                                    '&:hover': {
                                        backgroundColor: 'action.selectedHover',
                                    },
                                },
                            }}
                        >
                            <CardContent sx={{height: '100%'}}>
                                <Typography variant="h5" component="div">
                                    {card.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {card.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Container>
    );
}