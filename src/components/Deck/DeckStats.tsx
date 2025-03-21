import {CardModel, CardStatsModel} from "../../types/models/CardModel.ts";
import {Box} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {GridRowSelectionModel} from "@mui/x-data-grid/models/gridRowSelectionModel";
import {useCallback, useState} from "react";
import CardModal from "../Cards/CardModal.tsx";

interface DeckStatsProps {
    deckCards: CardModel[];
    isDemo: boolean;
}

export default function DeckStats(props: DeckStatsProps) {
    const {deckCards, isDemo} = props;

    const [openCardModal, setOpenCardModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState<CardModel | null>(null);

    const columns: GridColDef<(CardStatsModel[])[number]>[] = [
        {
            field: 'id',
            headerName: 'ID',
        },
        {
            field: 'title',
            headerName: 'Title',
            flex: 1,
        },
        {
            field: 'timesDisplayed',
            headerName: 'Times displayed',
            flex: 1,
            align: 'center'
        },
        {
            field: 'lastDisplayed',
            headerName: 'Last displayed',
            flex: 1,
            valueGetter: (value) => value ? new Date(value).toDateString() : "Not displayed yet"
        },
        {
            field: 'probability',
            headerName: 'Probability to be displayed',
            type: 'number',
            flex: 1,
            align: 'center',
            valueFormatter: (value) => `${Number(value).toFixed(3)}%`
        },
    ];

    const handleSelectedRow = useCallback((selectedRowId: GridRowSelectionModel) => {
        const filtered = deckCards.find(card => card.id === selectedRowId[0]);

        setSelectedCard(filtered ?? null);
        setOpenCardModal(true);
    }, [deckCards]);

    const handleClose = () => {
        setOpenCardModal(false);
    };

    return (
        <Box sx={{height: 400, width: '100%', marginBottom: '1rem'}}>
            <DataGrid
                rows={deckCards}
                columns={columns}
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                            id: false
                        }
                    },
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[5, 10, 20]}
                density="standard"
                onRowSelectionModelChange={handleSelectedRow}
            />

            {selectedCard && (
                <CardModal isOpen={openCardModal} isDemo={isDemo} selectedCard={selectedCard}
                           handleClose={handleClose}/>
            )}
        </Box>
    );
}