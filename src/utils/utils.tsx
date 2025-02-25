// TODO: add env variable later
export const baseUrl = "http://localhost:8080/";

export const isEmpty = (value: string | null | undefined): boolean => {
    return !value?.trim();
};