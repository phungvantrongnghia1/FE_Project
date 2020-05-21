import * as Types from "./contants";
import produce from "immer";

const initialState = {
    featureDocs: [],
    docsShare:[]
};
export default function NewsPreducer(state = initialState, action) {
    const { payload } = action;
    return produce(state, draft => {
        switch (action.type) {
            case Types.GET_FEATURE_DOCS_SUCCESS: {
                draft.featureDocs = payload
                break;
            }
            case Types.GET_DOCS_SHARE_SUCCESS : {
                draft.docsShare = payload
                break;
            }
        }
    });
}
