import * as Types from "./contants";
export const getDocs = (payload) => {
    return {
        type: Types.GET_DOCS,
        payload
    }
}
export const getDocsDetail = (payload) => {
    return {
        type: Types.GET_DOCS_DETAIL,
        payload
    }
}
export const getDocsDetailSuccess = (payload) => {
    return {
        type: Types.GET_DOCS_DETAIL_SUCCESS,
        payload
    }
}
export const searchDocs = (payload) => {
    return {
        type: Types.SEARCH_DOCS,
        payload
    }
}
export const getDocsSuccess = (payload) => {
    return {
        type: Types.GET_DOCS_SUCCESS,
        payload
    }
}

export const getDocsCate = () => {
    return {
        type: Types.GET_DOCS_CATE
    }
}
export const getDocsCateSuccess = (payload) => {
    return {
        type: Types.GET_DOCS_CATE_SUCCESS,
        payload
    }
}
export const createDoc = (payload) => {
    return {
        type: Types.CREATE_DOC,
        payload
    }
}
export const createDocsSuccess = (payload) => {
    return {
        type: Types.CREATE_DOC_SUCCESS,
        payload
    }
}
export const updateDoc = (payload) => {
    return {
        type: Types.UPDATE_DOC,
        payload
    }
}
export const updateDocsSuccess = (payload) => {
    return {
        type: Types.UPDATE_DOC_SUCCESS,
        payload
    }
}
export const deleteDoc = (payload) => {
    return {
        type: Types.DELETE_DOC,
        payload
    }
}
export const deleteDocsSuccess = (payload) => {
    return {
        type: Types.DELETE_DOC_SUCCESS,
        payload
    }
}
export const paginationAction = (payload) => {
    return {
        type: Types.PAGINATION,
        payload
    }
}
export const shareDocsAction = (payload) => {
    return {
        type: Types.SHARE_DOCS,
        payload
    }
}
export const reShareDocsAction = (payload) => {
    return {
        type: Types.RE_SHARE_DOCS,
        payload
    }
}