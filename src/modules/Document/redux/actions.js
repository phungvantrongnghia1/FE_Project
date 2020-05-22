import * as Types from "./contants";
export const getDocs = (payload) => {
    return {
        type: Types.GET_DOCS,
        payload
    }
}
export const getDocsSuccess = (payload) => {
    return {
        type: Types.GET_DOCS_SUCCESS,
        payload
    }
}
