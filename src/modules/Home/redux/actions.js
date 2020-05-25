import * as Types from "./contants";
export const getFeatureDocs = (payload) => {
    return {
        type: Types.GET_FEATURE_DOCS,
        payload
    }
}
export const getFeatureDocsSuccess = (payload) => {
    return {
        type: Types.GET_FEATURE_DOCS_SUCCESS,
        payload
    }
}
export const getDocsShare = () => {
    return {
        type: Types.GET_DOCS_SHARE
    }
}
export const getDocsShareSuccess = (payload) => {
    return {
        type: Types.GET_DOCS_SHARE_SUCCESS,
        payload
    }
}
