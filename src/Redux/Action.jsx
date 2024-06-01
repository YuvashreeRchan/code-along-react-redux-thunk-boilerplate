export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS"
export const ERROR = "ERROR"

export function fetchDataSucess(data){
    return {
        type: FETCH_DATA_SUCCESS,
        payload: data
    }
}

export function showError(error){
    return {
        type: ERROR,
        payload: error
    }
}