import * as Types from "./contants";
import produce from "immer";

const initialState = {
    docsList: [],
    docsCate: []
};
export default function NewsPreducer(state = initialState, action) {
    const { payload } = action;
    return produce(state, draft => {
        switch (action.type) {
            case Types.GET_DOCS_SUCCESS: {
                draft.docsList = payload
                break;
            }
            case Types.GET_DOCS_CATE_SUCCESS: {
                draft.docsCate = payload
                break;
            }
            case Types.CREATE_DOC_SUCCESS: {
                draft.docsList = [...state.docsList, payload]
                break;
            }
            case Types.UPDATE_DOC_SUCCESS: {
                let docsUpdate = state.docsList.map(item => item.Id === payload[0].Id ? payload[0] : item);
                draft.docsList = [...docsUpdate]
                break;
            }
        }
    });
}
