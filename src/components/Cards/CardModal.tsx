import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Slide} from "@mui/material";
import React, {useEffect, useMemo, useState} from "react";
import {TransitionProps} from "@mui/material/transitions";
import {CardModel} from "../../types/models/CardModel.ts";
import CardToDisplay from "./CardToDisplay.tsx";
import {useAppDispatch} from "../../utils/store.ts";
import {updateCardTitleAndDescription} from "../../slices/demoSlice.ts";
import {isEmpty} from "../../utils/utils.tsx";
import {demoUser} from "../../testData/userData.ts";
import {Notifications} from "../../slices/notificationSlice.ts";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface CardModalProps {
    isOpen: boolean;
    isDemo: boolean;
    selectedCard: CardModel;
    handleClose: () => void;
}

export default function CardModal(props: Readonly<CardModalProps>) {
    const {isOpen, isDemo, selectedCard, handleClose} = props;
    const dispatch = useAppDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [cardToUpdate, setCardToUpdate] = useState<CardModel>(selectedCard);

    const isDataInvalid = useMemo(() => {
        const {title, description} = cardToUpdate;

        return isEmpty(title) || isEmpty(description);
    }, [cardToUpdate.title, cardToUpdate.description]);

    // TODO: add loggedUser using React Context to provide this data
    const currentUser = useMemo(() => isDemo ? demoUser.name : "", [isDemo]);

    const activateEditMode = () => {
        setIsEditing(true);
    };

    const handleUpdateCardTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCardToUpdate({...cardToUpdate, title: event.target.value, updatedBy: currentUser});
    }

    const handleUpdateCardDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCardToUpdate({...cardToUpdate, description: event.target.value, updatedBy: currentUser});
    }

    const saveChanges = () => {
        setIsEditing(false);
        dispatch(updateCardTitleAndDescription(cardToUpdate));
        dispatch(Notifications.notifySuccess('Successful update!', 2000));
        handleClose();
    }

    const handleCloseModal = () => {
        if (isEditing) {
            setCardToUpdate(selectedCard);
            setIsEditing(false);
        }
        handleClose();
    }

    useEffect(() => {
        setCardToUpdate(selectedCard);
    }, [selectedCard]);

    return (
        <Dialog
            open={isOpen}
            slots={{transition: Transition}}
            keepMounted
            onClose={handleCloseModal}
            aria-describedby="card-modal"
        >
            <DialogTitle id="card-modal-title">{"Card Information"}</DialogTitle>
            <Divider/>
            <DialogContent id="card-modal-description">
                <CardToDisplay cardData={cardToUpdate} isEditing={isEditing} updateCardTitle={handleUpdateCardTitle}
                               updateCardDescription={handleUpdateCardDescription}/>
            </DialogContent>
            <Divider/>
            <DialogActions>
                <Button onClick={handleCloseModal}>Close</Button>
                
                {isEditing ? (
                    <Button onClick={saveChanges} disabled={isDataInvalid}>Save changes</Button>
                ) : (
                    <Button onClick={activateEditMode}>Edit</Button>
                )}
            </DialogActions>
        </Dialog>
    );
}