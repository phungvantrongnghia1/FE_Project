import * as Types from "./contants";
import produce from "immer";

const initialState = {
    featureDocs: [],
    docsShare: [],
    docsSearch: {
        status: false,
        data: []
    },
    pagination: {
        totalItems: 0,
        currentPage: 1,
        pageSize: 12,
        totalPages: 0
    }
};
export default function NewsPreducer(state = initialState, action) {
    const { payload } = action;
    return produce(state, draft => {
        switch (action.type) {
            case Types.GET_FEATURE_DOCS_SUCCESS: {
                draft.featureDocs = payload
                break;
            }
            case Types.GET_DOCS_SHARE_SUCCESS: {
                draft.docsShare = payload;
                let paginationUpdate = { ...state.pagination };
                paginationUpdate.totalItems = payload.length;
                paginationUpdate.totalPages = Math.ceil(payload.length / 12);
                draft.pagination = paginationUpdate;
                break;
            }
            case Types.SEARCH_DOCS_HEADER: {
                if (payload === '') {
                    draft.docsSearch = {
                        status: false,
                        data: []
                    }
                } else {
                    let docsUpdate = state.docsShare.filter(doc => doc.Title.indexOf(payload) >= 0 ? doc : '');
                    draft.docsSearch = {
                        status: true,
                        data: docsUpdate
                    }
                }
                break;
            } 
            case Types.PAGINATION: {
                let paginationUpdate = { ...state.pagination };
                paginationUpdate.currentPage = payload;
                draft.pagination = paginationUpdate
                break;
            }
        }
    });
}
