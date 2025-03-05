import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    LinearProgress,
    TextField,
    Typography
} from "@mui/material";
import {useAppDispatch} from "../../utils/store.ts";
import React, {useEffect, useState} from "react";
import {isEmpty, Transition} from "../../utils/utils.tsx";
import {Notifications} from "../../slices/notificationSlice.ts";
import {NewADeck} from "../../types/models/DeckModel.ts";
import {AIService} from "../../services/AIService.ts";

interface CreateDeckAutomaticalyModalProps {
    isOpen: boolean;
    isDemo: boolean;
    handleClose: (event: object, reason: string) => void;
}

export default function CreateDeckAutomaticalyModal(props: CreateDeckAutomaticalyModalProps) {
    const {isOpen, handleClose} = props;
    const dispatch = useAppDispatch();

    // TODO: check "isEditing"
    const [isEditing, setIsEditing] = useState(false);
    const [file, setFile] = useState<File | null>();
    const [newDeck, setNewDeck] = useState<NewADeck | null>(null);
    const [loading, setLoading] = useState(false);
    const [nameError, setNameError] = useState<boolean>(false);
    const [descriptionError, setDescriptionError] = useState<boolean>(false);

    // TODO: check "isEditing"
    const saveChanges = () => {
        setIsEditing(false);
        // dispatch(updateCardTitleAndDescription(cardToUpdate));
        dispatch(Notifications.notifySuccess('Successful update!', 2000));
        // handleClose();
    }

    const handleCloseModal = (event: object, reason: string) => {
        if (isEditing) {
            // setCardToUpdate(selectedCard);
            setIsEditing(false);
        }
        handleClose(event, reason);
    }

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
            setNewDeck(data);
            dispatch(Notifications.notifyInfo("Deck created correctly", 2000));
        }).catch((error) => {
            console.log(error);
            dispatch(Notifications.notifyError(error.toString(), 4000));
        }).finally(() => {
            setLoading(false);
        });
    };

    const handleDeckNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (newDeck) {
            const name = event.target.value;

            setNewDeck({...newDeck, name});
        }
    };

    const handleDeckDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (newDeck) {
            const generalDescription = event.target.value;

            setNewDeck({...newDeck, generalDescription});

        }
    };

    useEffect(() => {
        setNameError(isEmpty(newDeck?.name));
        setDescriptionError(isEmpty(newDeck?.generalDescription));
    }, [newDeck?.name, newDeck?.generalDescription]);

    return (
        <Dialog
            open={isOpen}
            slots={{transition: Transition}}
            keepMounted
            onClose={(event, reason) => handleCloseModal(event, reason)}
            aria-describedby="create-deck-a-modal"
            disableEscapeKeyDown={true}
        >
            <DialogTitle id="create-deck-a-modal-title">Create a deck</DialogTitle>
            <Divider/>
            <DialogContent id="create-deck-a-modal-content">
                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}>
                    <Typography data-testid="create-deck-a-modal-description" gutterBottom variant="body2"
                                sx={{marginBottom: "1rem"}}>
                        Upload a PDF file to create a deck automatically
                    </Typography>
                    <input
                        type="file"
                        onChange={handleFileChange}
                    />
                    <Button onClick={handleSubmit} disabled={loading}>{loading ? 'Loading...' : 'Submit'}</Button>
                    {loading && (
                        <Box sx={{width: '100%'}}>
                            <LinearProgress/>
                        </Box>
                    )}
                    {newDeck && (
                        <Box>
                            <Divider/>
                            <h2>New Deck:</h2>
                            <TextField
                                id="standard-required"
                                data-testid="name-input"
                                label="Deck Name"
                                value={newDeck?.name}
                                onChange={handleDeckNameChange}
                                variant="standard"
                                sx={{width: '100%', marginBottom: "1rem"}}
                                error={nameError}
                                helperText={nameError ? 'Name can not be empty' : ''}
                            />
                            <TextField
                                id="standard-multiline-static"
                                data-testid="description-input"
                                label="Description"
                                multiline
                                rows={4}
                                value={newDeck?.generalDescription}
                                onChange={handleDeckDescriptionChange}
                                variant="standard"
                                sx={{width: '100%'}}
                                error={descriptionError}
                                helperText={descriptionError ? 'Description can not be empty' : ''}
                            />

                            <h2>Cards {`(${newDeck.cardsList.length})`}:</h2>

                            {newDeck.cardsList.map((newCard, index) => (
                                <Box key={newCard.title}>
                                    <Typography data-testid="new-a-card-title" gutterBottom variant="h6">
                                        {`Card ${index + 1}`}
                                    </Typography>
                                    <Typography data-testid="new-a-card-title" gutterBottom variant="body1">
                                        {`Title: ${newCard.title}`}
                                    </Typography>
                                    <Typography data-testid="new-a-card-description" className="description_text"
                                                gutterBottom>
                                        {`Description: ${newCard.description}`}
                                    </Typography>
                                    <Divider/>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
            </DialogContent>
            <Divider/>
            <DialogActions>
                <Button onClick={(event: object) => handleCloseModal(event, "close")}>Close</Button>

                {isEditing ? (
                    <Button onClick={saveChanges} disabled={true}>Save changes</Button>
                ) : (
                    <Button onClick={saveChanges}>Edit</Button>
                )}
            </DialogActions>
        </Dialog>
    );
}