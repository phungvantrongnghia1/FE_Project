import { all, takeLatest, call, delay, put, fork } from 'redux-saga/effects';
import Cookie from 'js-cookie';
import { showLoadingBtn, hideLoadingBtn } from "base/redux/General/GeneralAction";
import { getFeatureDocsFromApi,getDocShareFromApi } from "./api";
import { getFeatureDocsSuccess,getDocsShareSuccess } from "../actions"
import * as Types from "../contants";

const MESS_ERR = "Lỗi hệ thống";
function* onGetFeatureDocs(action) {
    // const { queryStr } = action.payload;
    yield put(showLoadingBtn());
    try {
        yield delay(500, true);
        const response = yield call(getFeatureDocsFromApi);
        if (response.data.status_code === 200) {
            yield put(getFeatureDocsSuccess(response.data.data))
        }
        yield put(hideLoadingBtn());
    } catch (err) {
        console.log(MESS_ERR);
        yield put(hideLoadingBtn());
    }
}
function* onGetDocsShare(action) {
    console.log("vovovo");
    // const { queryStr } = action.payload;
    yield put(showLoadingBtn());
    try {
        yield delay(500, true);
        const response = yield call(getDocShareFromApi, Cookie.get('cookie'));
        console.log(response);
        if (response.data.status_code === 200) {
            yield put(getDocsShareSuccess(response.data.data))
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
function* watchOnGetDocsShare() {
    yield takeLatest(Types.GET_DOCS_SHARE, onGetDocsShare);
}
export default function* rootSaga() {
    yield all([
        fork(watchOnGetFeatureDocs),
        fork(watchOnGetDocsShare)
    ])
}