import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Slide} from "@mui/material";
import React from "react";
import {TransitionProps} from "@mui/material/transitions";
import {CardModel} from "../../types/models/CardModel.ts";
import CardToDisplay from "./CardToDisplay.tsx";

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
    selectedCard: CardModel | null;
    handleClose: () => void;
}

export default function CardModal(props: Readonly<CardModalProps>) {
    const {isOpen, selectedCard, handleClose} = props;

    return (
        <Dialog
            open={isOpen}
            slots={{transition: Transition}}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Card Information"}</DialogTitle>
            <Divider/>
            <DialogContent>
                <CardToDisplay cardData={selectedCard}/>
            </DialogContent>
            <Divider/>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}