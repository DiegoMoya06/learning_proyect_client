export interface Base {
    readonly id: string;
    readonly created: Date | string;
    updated: Date | string;
    readonly createdBy: string;
    updatedBy: string;
}