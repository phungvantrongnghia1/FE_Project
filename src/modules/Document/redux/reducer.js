import * as Types from "./contants";
import produce from "immer";

const initialState = {
    docsList: [],
    docsCate: [],
    docsSearch: {
        status: false,
        data: []
    },
    pagination: {
        totalItems: 0,
        currentPage: 1,
        pageSize: 12,
        totalPages: 0
    },
    docsDetail:{}
};
export default function NewsPreducer(state = initialState, action) {
    const { payload } = action;
    return produce(state, draft => {
        switch (action.type) {
            case Types.GET_DOCS_SUCCESS: {
                draft.docsList = payload;
                let paginationUpdate = { ...state.pagination };
                paginationUpdate.totalItems = payload.length;
                paginationUpdate.totalPages = Math.ceil(payload.length / 12);
                draft.pagination = paginationUpdate;
                break;
            }
            case Types.GET_DOCS_CATE_SUCCESS: {
                draft.docsCate = payload
                break;
            }
            case Types.CREATE_DOC_SUCCESS: {
                draft.docsList = [...state.docsList, payload[0]];
                break;
            }
            case Types.UPDATE_DOC_SUCCESS: {
                let docsUpdate = state.docsList.map(item => item.Id === payload[0].Id ? payload[0] : item);
                draft.docsList = [...docsUpdate]
                break;
            }
            case Types.SEARCH_DOCS: {
                if (payload === '') {
                    draft.docsSearch = {
                        status: false,
                        data: []
                    }
                } else {
                    let docsUpdate = state.docsList.filter(doc => doc.Title.indexOf(payload) >= 0 ? doc : '');
                    draft.docsSearch = {
                        status: true,
                        data: docsUpdate
                    }
                }
                break;
            } case Types.DELETE_DOC_SUCCESS: {
                console.log(payload);
                let docsUpdate = state.docsList.filter(item => item.Id !== payload[0].Id);
                draft.docsList = [...docsUpdate]
                break;
            } case Types.PAGINATION: {
                let paginationUpdate = { ...state.pagination };
                paginationUpdate.currentPage = payload;
                draft.pagination = paginationUpdate
                break;
            }
            case Types.GET_DOCS_DETAIL_SUCCESS: {
                draft.docsDetail = payload
                break;
            }
        }
    });
}
