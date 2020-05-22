import { all, takeLatest, call, put, fork, delay } from 'redux-saga/effects';
import Cookie from 'js-cookie';
import axios from 'base/axios';
import * as Types from '../constants';
import {
  signUpSuccess,
  loginSuccess,
  activeUserSuccess,
  forgotPasswordSuccess,
  resetPasswordSuccess,
  getOCSuccess,
  changePasswordSuccess,
  getOrderSuccess,
  updateProfileSuccess,
  getListMessageSuccess,
  addWishListSuccess,
  getListOrdersSuccess,
  activeOrderSuccess,
  logOut
} from '../actions';
import {
  showLoader,
  hideLoader,
  showLoadingBtn,
  hideLoadingBtn,
  onLoaderComponent
} from 'base/redux/General/GeneralAction';
import { setCookie, getCookie } from 'base/helper';
import {
  signUpFromApi,
  loginFromApi,
  activeUserFromApi,
  forgotPasswordFromApi,
  resetPasswordFromApi,
  getInfoUserFromAPI,
  changePasswordFromApi,
  getOrderFromApi,
  updateProfileFromApi,
  checkTokenPasswordFromApi,
  apiGetListMessage,
  apiLoginSocial
} from './api';

const MESS_ERR = 'Lỗi hệ thống';

function* onSignUp(action) {
  const { info, callback, errorCallback } = action.payload;
  info['username'] = info.email;
  // info["sponsorKey"] = "test";
  // info["phone_number"] = "123456789";
  // info["country"] = "Vietnam";
  // info["province"] = null;
  // info["address"] = null;
  // info["gender"] = "gay";
  yield put(showLoadingBtn());
  try {
    yield delay(500, true);
    const response = yield call(signUpFromApi, info);
    if (response.data.status_code === 200) {
      yield put(signUpSuccess(response.data.data));
      yield callback(response.data.message, response.data.status_code);
    } else {
      yield errorCallback(response.data.message);
    }
    yield put(hideLoadingBtn());
  } catch (error) {
    yield errorCallback(MESS_ERR);
    yield put(hideLoadingBtn());
  }
}

function* onLogin({ payload }) {
  console.log("vo login");
  const { data, cbSuccess, cbError } = payload;
  try {
    yield delay(500, true);
    let response = yield call(loginFromApi, data);
    console.log(response);
    switch (response.data.status_code) {
      case 200: {
        // Cookie.set('cookie', response.data.data.token, { expires: 15, secure: true });
        Cookie.set('cookie', response.data.data.token, { expires: 15 });
        let session = { ...response.data.data };
        delete session.token;
        // yield put(loginSuccess(response.data.data));
        localStorage.setItem('USER', JSON.stringify(session));
        yield cbSuccess(response.data.message, response.data.status_code);
        break;
      }
      case 404: {
        yield cbSuccess(response.data.message, response.data.status_code);
        break;
      }
      default:
        {
          yield cbError(response.data.message);
        }
        yield put(hideLoadingBtn());
    }
  } catch (error) {
    yield cbError(MESS_ERR);
    yield put(hideLoadingBtn());
  }
}

function* checkAuth({ meta }) {
  const { token } = meta;
  const typeRemoveLogout = ['user', 'cookie'];
  try {
    const response = yield call(
      axios,
      'get',
      'customer/check-auth',
      null,
      token
    );
    if (response.data.status_code === 200) {
      setCookie('cookie', response.data.data.token, 15);
      let session = { ...response.data.data };
      delete session.token;
      yield put(loginSuccess(response.data.data));
      localStorage.setItem('USER', JSON.stringify(session));
    } else {
      yield put(logOut(typeRemoveLogout));
    }
  } catch (error) {
    yield put(logOut(typeRemoveLogout));
  }
}

function* getInfoUser({ callback }) {
  const { errorCallback } = callback;
  try {
    yield delay(500, true);
    const response = yield call(getInfoUserFromAPI, getCookie('token'));
    if (response.data.status_code === 200) {
      yield put(loginSuccess(response.data.data));
      yield put(getOCSuccess(response.data.data.pointOc));
      sessionStorage.setItem('USER', JSON.stringify(response.data.data));
    } else {
      yield errorCallback(response.data.message);
    }
  } catch (error) {
    yield errorCallback(MESS_ERR);
    yield put(hideLoader());
  }
}

function* onActiveUser(action) {
  const { token, callback, errorCallback } = action.payload;
  yield put(showLoader());
  try {
    yield delay(500, true);
    const response = yield call(activeUserFromApi, token);
    if (response.data.status_code === 200) {
      yield put(activeUserSuccess());
      yield callback(response.data.message);
    } else {
      yield errorCallback(response.data.message);
    }
    yield put(hideLoader());
  } catch (error) {
    yield errorCallback(MESS_ERR);
    yield put(hideLoader());
  }
}

function* onForgotPassword(action) {
  const { email, callback, errorCallback } = action.payload;
  yield put(showLoader());
  try {
    yield delay(500, true);
    const response = yield call(forgotPasswordFromApi, email);
    if (response.data.status_code === 200) {
      yield put(forgotPasswordSuccess());
      yield callback(response.data.message);
    } else {
      yield errorCallback(response.message);
    }
    yield put(hideLoader());
  } catch (error) {
    yield errorCallback(MESS_ERR);
    yield put(hideLoader());
  }
}

function* onResetPassword(action) {
  const { info, callback, errorCallback } = action.payload;
  yield put(showLoader());
  try {
    yield delay(500, true);
    const response = yield call(resetPasswordFromApi, info);
    if (response.data.status_code === 200) {
      yield put(resetPasswordSuccess());
      yield callback(response.data.message);
    } else {
      yield errorCallback(response.data.message);
    }
    yield put(hideLoader());
  } catch (error) {
    yield errorCallback(MESS_ERR);
    yield put(hideLoader());
  }
}

function* onCheckTokenPassword(action) {
  const { token, callback, errorCallback } = action.payload;
  yield put(showLoader());
  try {
    const response = yield call(checkTokenPasswordFromApi, token);
    if (response.data.status_code === 200) {
      yield callback();
    } else {
      yield errorCallback();
    }
    yield put(hideLoader());
  } catch (error) {
    yield errorCallback();
    yield put(hideLoader());
  }
}

function* onChangePassword({ payload }) {
  const { data, cbSuccess, cbError, cbHideLoading } = payload;
  try {
    yield delay(500, true);
    const response = yield call(
      changePasswordFromApi,
      data,
      Cookie.get('cookie')
    );
    if (response.data.status_code === 200) {
      yield put(changePasswordSuccess());
      yield cbSuccess(response.data.message);
    } else {
      yield cbError(response.data.message);
    }
    yield cbHideLoading();
  } catch (error) {
    yield cbError(MESS_ERR);
    yield cbHideLoading();
  }
}

function* onUpdateProfile({ payload }) {
  const { data, cbSuccess, cbError, cbHideLoading } = payload;
  try {
    yield delay(500, true);
    const response = yield call(
      updateProfileFromApi,
      data.data,
      Cookie.get('cookie')
    );
    if (response.data.status_code === 200) {
      if (data.type === 'avatar') {
        yield put(
          updateProfileSuccess({
            type: data.type,
            image: response.data.data.image
          })
        );
      } else yield put(updateProfileSuccess(data));
      yield cbSuccess(response.data.message);
    } else {
      yield cbError(response.data.message);
    }
    yield cbHideLoading();
  } catch (error) {
    yield cbError(MESS_ERR);
    yield cbHideLoading();
  }
}

function* onGetOrder(action) {
  const token = action.payload;
  yield put(showLoader());
  try {
    yield delay(500, true);
    const response = yield call(getOrderFromApi, token);
    if (response.data.status_code === 200) {
      yield put(getOrderSuccess(response.data.data));
    }
    yield put(hideLoader());
  } catch (error) {
    yield put(hideLoader());
    throw 'Get List Order failed';
  }
}

function* onGetListMessage({ meta }) {
  const { strQuery } = meta;
  yield put(onLoaderComponent(true));
  try {
    yield delay(100, true);
    const response = yield call(
      apiGetListMessage,
      strQuery,
      Cookie.get('cookie')
    );
    if (response.data.status_code === 200) {
      yield put(getListMessageSuccess(response.data.data));
    }
    yield put(onLoaderComponent(false));
  } catch (error) {
    yield put(onLoaderComponent(false));
    throw 'Get List Message failed';
  }
}

function* onGetListOrders({ meta }) {
  const { strQuery } = meta;
  yield put(onLoaderComponent(true));
  try {
    yield delay(100, true);
    const response = yield call(
      axios,
      'GET',
      `order/list?${strQuery}`,
      null,
      Cookie.get('cookie')
    );
    if (response.data.status_code === 200) {
      yield put(getListOrdersSuccess(response.data.data));
    }
    yield put(onLoaderComponent(false));
  } catch (error) {
    yield put(onLoaderComponent(false));
    throw 'Get List Orders failed';
  }
}

function* onAddWishlist({ meta }) {
  const { data } = meta;
  try {
    yield delay(100, true);
    const response = yield call(
      axios,
      'put',
      'customer/add-wish-list',
      data,
      Cookie.get('cookie')
    );
    if (response.data.status_code === 200) {
      yield put(addWishListSuccess(response.data.data));
    }
  } catch (error) {
    throw 'Add wish list failed';
  }
}

function* onAddReview({ payload }) {
  const { data, cbError, cbLoader, cbSuccess } = payload;
  try {
    yield delay(500, true);
    const response = yield call(
      axios,
      'POST',
      'course/add-review',
      data,
      Cookie.get('cookie')
    );
    if (response.data.status_code !== 200) {
      yield cbError();
    } else yield cbSuccess();
    yield cbLoader();
  } catch (error) {
    throw 'Add review failed';
  }
}

function* onActiveOrder({ payload }) {
  const { data, cbError, cbLoader, cbSuccess } = payload;
  try {
    yield delay(500, true);
    const response = yield call(
      axios,
      'POST',
      'order/pay',
      data,
      Cookie.get('cookie')
    );
    if (response.data.status_code !== 200) {
      yield cbError();
    } else {
      yield put(activeOrderSuccess(response.data.data));
      yield cbSuccess();
    }
    yield cbLoader();
  } catch (error) {
    yield cbError();
    throw 'Active order failed';
  }
}
/********************************* Watcher *********************************/
function* watchOnAddReview() {
  yield takeLatest(Types.ADD_REVIEW, onAddReview);
}

function* watchOnSignUp() {
  yield takeLatest(Types.SIGNUP, onSignUp);
}

function* watchOnLogin() {
  yield takeLatest(Types.LOGIN, onLogin);
}

function* watchOnActiveUser() {
  yield takeLatest(Types.ACTIVE_USER, onActiveUser);
}

function* watchOnForgotPassword() {
  yield takeLatest(Types.FORGOT_PASSWORD, onForgotPassword);
}

function* watchOnResetPassword() {
  yield takeLatest(Types.RESET_PASSWORD, onResetPassword);
}

function* watchOnCheckTokenPassword() {
  yield takeLatest(Types.CHECK_TOKEN_PASSWORD, onCheckTokenPassword);
}

function* watchOnGetInfoUser() {
  yield takeLatest(Types.GET_OC, getInfoUser);
}

function* watchOnChangePassword() {
  yield takeLatest(Types.CHANGE_PASSWORD, onChangePassword);
}

function* watchOnGetOrder() {
  yield takeLatest(Types.GET_ORDER, onGetOrder);
}

function* watchOnUpdateProfile() {
  yield takeLatest(Types.UPDATE_PROFILE, onUpdateProfile);
}

function* watchOnGetListMessage() {
  yield takeLatest(Types.GET_LIST_MESSAGES, onGetListMessage);
}

function* watchOnAddWishlist() {
  yield takeLatest(Types.ADD_WISH_LIST, onAddWishlist);
}

function* watchOnCheckAuth() {
  yield takeLatest(Types.CHECK_AUTH, checkAuth);
}

function* watchOnGetListOrders() {
  yield takeLatest(Types.GET_LIST_ORDERS, onGetListOrders);
}

function* watchOnActiveOrder() {
  yield takeLatest(Types.ACTIVE_ORDER, onActiveOrder);
}

export default function* rootSaga() {
  yield all([
    fork(watchOnSignUp),
    fork(watchOnLogin),
    fork(watchOnActiveUser),
    fork(watchOnForgotPassword),
    fork(watchOnResetPassword),
    fork(watchOnGetInfoUser),
    fork(watchOnChangePassword),
    fork(watchOnGetOrder),
    fork(watchOnUpdateProfile),
    fork(watchOnCheckTokenPassword),
    fork(watchOnGetListMessage),
    fork(watchOnAddWishlist),
    fork(watchOnCheckAuth),
    fork(watchOnAddReview),
    fork(watchOnGetListOrders),
    fork(watchOnActiveOrder)
  ]);
}
