import { all, takeLatest, call, delay, put, fork } from 'redux-saga/effects';
import Cookie from 'js-cookie';
import { showLoadingBtn, hideLoadingBtn } from "base/redux/General/GeneralAction";
import { getFeatureDocsFromApi,getDocShareFromApi,getDocPublicFromApi } from "./api";
import { getFeatureDocsSuccess,getDocsShareSuccess,getDocsPublicSuccess } from "../actions"
import * as Types from "../contants";

const MESS_ERR = "Lỗi hệ thống";
function* onGetFeatureDocs() {
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
function* onGetDocsShare() {
    yield put(showLoadingBtn());
    try {
        yield delay(500, true);
        const response = yield call(getDocShareFromApi, Cookie.get('cookie'));
        if (response.data.status_code === 200) {
            yield put(getDocsShareSuccess(response.data.data))
        }
        yield put(hideLoadingBtn());
    } catch (err) {
        console.log(MESS_ERR);
        yield put(hideLoadingBtn());
    }
}
function* onGetPublicDocs() {
    yield put(showLoadingBtn());
    try {
        yield delay(500, true);
        const response = yield call(getDocPublicFromApi);
        if (response.data.status_code === 200) {
            yield put(getDocsPublicSuccess(response.data.data))
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
function* watchOnGetPublicDocs() {
    yield takeLatest(Types.GET_DOCS_PUBLIC, onGetPublicDocs);
}
function* watchOnGetDocsShare() {
    yield takeLatest(Types.GET_DOCS_SHARE, onGetDocsShare);
}
export default function* rootSaga() {
    yield all([
        fork(watchOnGetFeatureDocs),
        fork(watchOnGetDocsShare),
        fork(watchOnGetPublicDocs)
    ])
}