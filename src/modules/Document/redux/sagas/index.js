import { all, takeLatest, call, delay, put, fork } from 'redux-saga/effects';
import Cookie from 'js-cookie';
import { showLoadingBtn, hideLoadingBtn } from "base/redux/General/GeneralAction";
import { getDocsFromApi } from "./api";
import { getDocsSuccess } from "../actions"
import * as Types from "../contants";

const MESS_ERR = "Lỗi hệ thống";
function* onGetDocs(action) {
    // const { queryStr } = action.payload;
    yield put(showLoadingBtn());
    try {
        yield delay(500, true);
        const response = yield call(getDocsFromApi, '', Cookie.get('cookie'));
        console.log(response);
        if (response.data.status_code === 200) {
            yield put(getDocsSuccess(response.data.data))
        }
        yield put(hideLoadingBtn());
    } catch (err) {
        console.log(MESS_ERR);
        yield put(hideLoadingBtn());
    }
}



function* watchOnGetDocs() {
    yield takeLatest(Types.GET_DOCS, onGetDocs);
}
export default function* rootSaga() {
    yield all([
        fork(watchOnGetDocs)
    ])
}