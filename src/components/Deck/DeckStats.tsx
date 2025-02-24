import {CardModel, CardStatsModel} from "../../types/models/CardModel.ts";
import {Box} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {GridRowSelectionModel} from "@mui/x-data-grid/models/gridRowSelectionModel";

interface DeckStatsProps {
    deckCards: CardModel[];
}

export default function DeckStats(props: Readonly<DeckStatsProps>) {
    const {deckCards} = props;

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
            valueGetter: (value) => new Date(value).toDateString()
        },
        {
            field: 'probability',
            headerName: 'Probability to be displayed',
            type: 'number',
            flex: 1,
            align: 'center',
            valueFormatter: (value) => `${Number(value).toFixed(2)}%`
        },
    ];

    const handleSelectedRow = (selectedRowId:GridRowSelectionModel) => {
        console.log("Selected row:", selectedRowId);
    };

    return (
        <Box sx={{height: 400, width: '100%'}}>
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
        </Box>
    );
}