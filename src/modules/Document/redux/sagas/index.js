import { all, takeLatest, call, delay, put, fork } from 'redux-saga/effects';
import Cookie from 'js-cookie';
import {
  showLoadingBtn,
  hideLoadingBtn
} from 'base/redux/General/GeneralAction';
import {
  getDocsFromApi,
  getDocsCateFromApi,
  createDocFromApi,
  updateDocFromApi,
  deleteDocFromApi,
  shareDocsFromApi,
  getDocsDetailFromApi,
  reShareDocsFromApi
} from './api';
import {
  getDocsSuccess,
  getDocsCateSuccess,
  createDocsSuccess,
  updateDocsSuccess,
  deleteDocsSuccess,
  getDocsDetailSuccess
} from '../actions';
import * as Types from '../contants';

const MESS_ERR = 'Lỗi hệ thống';
function* onGetDocs(action) {
  // const { queryStr } = action.payload;
  yield put(showLoadingBtn());
  try {
    yield delay(500, true);
    const response = yield call(getDocsFromApi, Cookie.get('cookie'));
    if (response.data.status_code === 200) {
      yield put(getDocsSuccess(response.data.data));
    }
    yield put(hideLoadingBtn());
  } catch (err) {
    console.log(MESS_ERR);
    yield put(hideLoadingBtn());
  }
}
function* ongetDocsDetail(action) {
  const { payload } = action;
  yield put(showLoadingBtn());
  try {
    yield delay(500, true);
    const response = yield call(
      getDocsDetailFromApi,
      payload,
      Cookie.get('cookie')
    );
    if (response.data.status_code === 200) {
      yield put(getDocsDetailSuccess(response.data.data));
    }
    yield put(hideLoadingBtn());
  } catch (err) {
    console.log(MESS_ERR);
    yield put(hideLoadingBtn());
  }
}
function* onGetDocsCate() {
  yield put(showLoadingBtn());
  try {
    yield delay(500, true);
    const response = yield call(getDocsCateFromApi, Cookie.get('cookie'));
    if (response.data.status_code === 200) {
      yield put(getDocsCateSuccess(response.data.data));
    }
    yield put(hideLoadingBtn());
  } catch (err) {
    console.log(MESS_ERR);
    yield put(hideLoadingBtn());
  }
}

function* onCreateDoc(action) {
  const { payload, callbackSuccess, callbackEror } = action.payload;
  yield put(showLoadingBtn());
  try {
    yield delay(500, true);
    const response = yield call(
      createDocFromApi,
      payload,
      Cookie.get('cookie')
    );
    console.log(response);
    if (response.data.status_code === 200) {
      yield callbackSuccess(response.data.message);
      yield put(createDocsSuccess(response.data.data));
    } else {
      yield callbackEror();
    }
    yield put(hideLoadingBtn());
  } catch (err) {
    console.log(MESS_ERR);
    yield put(hideLoadingBtn());
  }
}
function* onUpdateDoc(action) {
  const { payload, callbackSuccess, callbackEror } = action.payload;
  yield put(showLoadingBtn());
  try {
    yield delay(500, true);
    const response = yield call(
      updateDocFromApi,
      payload,
      Cookie.get('cookie')
    );
    console.log(response);
    if (response.data.status_code === 200) {
      yield callbackSuccess(response.data.message);
      yield put(updateDocsSuccess(response.data.data));
    } else {
      yield callbackEror();
    }
    yield put(hideLoadingBtn());
  } catch (err) {
    console.log(MESS_ERR);
    yield put(hideLoadingBtn());
  }
}
function* onDeleteDoc(action) {
  const { payload, callbackSuccess, callbackEror } = action.payload;
  yield put(showLoadingBtn());
  try {
    yield delay(500, true);
    const response = yield call(
      deleteDocFromApi,
      payload,
      Cookie.get('cookie')
    );
    console.log(response);
    if (response.data.status_code === 200) {
      yield callbackSuccess(response.data.message);
      yield put(deleteDocsSuccess(response.data.data));
    } else {
      yield callbackEror();
    }
    yield put(hideLoadingBtn());
  } catch (err) {
    console.log(MESS_ERR);
    yield put(hideLoadingBtn());
  }
}
function* onShareDocs(action) {
  const { payload, callbackSuccess, callbackEror } = action.payload;
  yield put(showLoadingBtn());
  try {
    yield delay(500, true);
    const response = yield call(
      shareDocsFromApi,
      payload,
      Cookie.get('cookie')
    );
    console.log(response);
    if (response.data.status_code === 200) {
      yield callbackSuccess(response.data.message);
      // yield put(deleteDocsSuccess(response.data.data))
    } else {
      yield callbackEror();
    }
    yield put(hideLoadingBtn());
  } catch (err) {
    console.log(MESS_ERR);
    yield put(hideLoadingBtn());
  }
}

function* onReShareDocs(action) {
  const { payload, callbackSuccess, callbackEror } = action.payload;
  yield put(showLoadingBtn());
  try {
    yield delay(500, true);
    const response = yield call(
      reShareDocsFromApi,
      payload,
      Cookie.get('cookie')
    );
    console.log(response);
    if (response.data.status_code === 200) {
      yield callbackSuccess(response.data.message);
      // yield put(deleteDocsSuccess(response.data.data))
    } else {
      yield callbackEror();
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

function* watchOnGetDocsDetail() {
  yield takeLatest(Types.GET_DOCS_DETAIL, ongetDocsDetail);
}

function* watchOnGetDocsCate() {
  yield takeLatest(Types.GET_DOCS_CATE, onGetDocsCate);
}

function* watchOnCreateDoc() {
  yield takeLatest(Types.CREATE_DOC, onCreateDoc);
}
function* watchOnUpdateDoc() {
  yield takeLatest(Types.UPDATE_DOC, onUpdateDoc);
}
function* watchOnDeleteDoc() {
  yield takeLatest(Types.DELETE_DOC, onDeleteDoc);
}

function* watchOnShareDocs() {
  yield takeLatest(Types.SHARE_DOCS, onShareDocs);
}

function* watchOnReShareDocs() {
  yield takeLatest(Types.RE_SHARE_DOCS, onReShareDocs);
}
export default function* rootSaga() {
  yield all([
    fork(watchOnGetDocs),
    fork(watchOnGetDocsCate),
    fork(watchOnCreateDoc),
    fork(watchOnUpdateDoc),
    fork(watchOnDeleteDoc),
    fork(watchOnShareDocs),
    fork(watchOnGetDocsDetail),
    fork(watchOnReShareDocs)
  ]);
}
