import * as Types from "./contants";
import produce from "immer";

const initialState = {
    docsList: []
};
export default function NewsPreducer(state = initialState, action) {
    const { payload } = action;
    return produce(state, draft => {
        switch (action.type) {
            case Types.GET_DOCS_SUCCESS: {
                draft.docsList = payload
                break;
            }

        }
    });
}
