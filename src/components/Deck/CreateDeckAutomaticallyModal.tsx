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
import React, {useEffect, useMemo, useRef, useState} from "react";
import {isEmpty, Transition} from "../../utils/utils.tsx";
import {Notifications} from "../../slices/notificationSlice.ts";
import {NewADeckModel} from "../../types/models/DeckModel.ts";
import {AIService} from "../../services/AIService.ts";
import {updateDeck} from "../../slices/demoSlice.ts";

interface CreateDeckAutomaticalyModalProps {
    isOpen: boolean;
    isDemo: boolean;
    handleClose: (event: object, reason: string) => void;
}

export default function CreateDeckAutomaticallyModal(props: CreateDeckAutomaticalyModalProps) {
    const {isOpen, isDemo, handleClose} = props;
    const dispatch = useAppDispatch();

    const [file, setFile] = useState<File | null>();
    const [newDeck, setNewDeck] = useState<NewADeckModel | null>(null);
    const [loading, setLoading] = useState(false);
    const [nameError, setNameError] = useState<boolean>(false);
    const [descriptionError, setDescriptionError] = useState<boolean>(false);

    const inputFile = useRef<HTMLInputElement>(null);

    const hasErrors = useMemo(() => nameError || descriptionError, [nameError, descriptionError]);

    const saveChanges = (event: object, reason: string) => {
        if (newDeck) {
            if (isDemo) {
                dispatch(updateDeck(newDeck));
            }

            dispatch(Notifications.notifySuccess(`New Deck ${newDeck?.name} was created!`, 2000));
            handleCloseModal(event, reason);
        }
    }

    const handleResetForm = () => {
        if (inputFile.current) {
            inputFile.current.value = "";
            setNewDeck(null);
        }
    };

    const handleCloseModal = (event: object, reason: string) => {
        handleResetForm();
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
            console.error(error);
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
                        data-testid="input-file"
                        type="file"
                        ref={inputFile}
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

                            <h2>{`${newDeck.cardsList.length === 1 ? "Card" : "Cards"} (${newDeck.cardsList.length})`}:</h2>

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

                <Button data-testid="create-button" onClick={(event: object) => saveChanges(event, "close")}
                        disabled={hasErrors}>Create</Button>
            </DialogActions>
        </Dialog>
    );
}