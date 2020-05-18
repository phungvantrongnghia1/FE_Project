import * as Types from "./constants";
import produce from "immer";

const initialState = {
    featureDocs: []
};
export default function NewsPreducer(state = initialState, action) {
    const { payload } = action;
    return produce(state, draft => {
        switch (action.type) {
            case Types.GET_FEATURE_DOCS_SUCCESS: {
                draft.featureDocs = payload
            }
        }
    });
}
