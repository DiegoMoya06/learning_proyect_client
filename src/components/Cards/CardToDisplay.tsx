import {CardModel} from "../../types/models/CardModel.ts";
import {Box, Card, CardContent, Divider, Typography} from "@mui/material";
import {Fragment} from "react";

interface CardToDisplay {
    cardData: CardModel | null;
}

export default function CardToDisplay(props: Readonly<CardToDisplay>) {
    const {cardData} = props;

    return (
        <Fragment>
            {cardData ? (
                <Card className="card" key={cardData.id}>
                    <CardContent className="card_content">
                        <Box className="card_title">
                            <Typography gutterBottom variant="h6">
                                {cardData.title}
                            </Typography>
                            <Divider/>
                        </Box>

                        <Box className="card_description">
                            <Typography className="description_text" gutterBottom>
                                {cardData.description}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            ) : (
                <Typography gutterBottom variant="h6">
                    No cards available
                </Typography>
            )}
        </Fragment>
    );
}