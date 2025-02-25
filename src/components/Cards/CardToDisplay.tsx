import {CardModel} from "../../types/models/CardModel.ts";
import {Box, Card, CardContent, Divider, TextField, Typography} from "@mui/material";
import React, {Fragment} from "react";

interface CardToDisplay {
    cardData: CardModel | null;
    isEditing: boolean;
    updateCardTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
    updateCardDescription: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CardToDisplay(props: Readonly<CardToDisplay>) {
    const {cardData, isEditing, updateCardTitle, updateCardDescription} = props;

    return (
        <Fragment>
            {cardData ? (
                <Card className="card" key={cardData.id}>
                    <CardContent className="card_content">
                        <Box className="card_title">
                            {isEditing ? (
                                <TextField
                                    id="standard-required"
                                    data-testid="title-input"
                                    label="Title"
                                    value={cardData.title}
                                    onChange={updateCardTitle}
                                    variant="standard"
                                    sx={{width: '100%'}}
                                />
                            ) : (
                                <Typography data-testid="title-field" gutterBottom variant="h6">
                                    {cardData.title}
                                </Typography>
                            )}
                            <Divider/>
                        </Box>

                        <Box className="card_description">
                            {isEditing ? (
                                <TextField
                                    id="standard-multiline-static"
                                    data-testid="description-input"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    value={cardData.description}
                                    onChange={updateCardDescription}
                                    variant="standard"
                                    sx={{width: '100%'}}
                                />
                            ) : (
                                <Typography data-testid="description-field" className="description_text" gutterBottom>
                                    {cardData.description}
                                </Typography>
                            )}
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