import { all, takeLatest, call, delay, put, fork } from 'redux-saga/effects';
import { showLoadingBtn, hideLoadingBtn } from "base/redux/General/GeneralAction";
import { getCookie } from 'base/helper/cookie';
import { getFeatureDocsFromApi } from "./api";
import { getFeatureDocsSuccess } from "../actions"
import * as Types from "../constants";

const MESS_ERR = "Lỗi hệ thống";
function* onGetFeatureDocs(action) {
    const { queryStr } = action.payload;
    yield put(showLoadingBtn());
    try {
        yield delay(500, true);
        const response = yield call(getFeatureDocsFromApi, queryStr.lastIndexOf("post") > 0 ? '' : queryStr);
        if (response.data.status_code === 200) {
            yield put(getFeatureDocsSuccess(response.data.data))
        }
        yield put(hideLoadingBtn());
    } catch (err) {
        console.log(MESS_ERR);
        yield put(hideLoadingBtn());
    }
}


function* watchOnGetFeatureDocs() {
    yield takeLatest(Types.GET_FEATURE_DOCS, onGetFeatureDocs);
}
export default function* rootSaga() {
    yield all([
        fork(watchOnGetFeatureDocs)
    ])
}