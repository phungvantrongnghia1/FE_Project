import * as Types from "./contants";
export const getFeatureDocs = (payload) => {
    return {
        type: Types.GET_BLOGS_CATE_LIST,
        payload
    }
}
export const getFeatureDocsSuccess = (payload) => {
    return {
        type: Types.GET_FEATURE_DOCS_SUCCESS,
        payload
    }
}