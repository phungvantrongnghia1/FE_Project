import { all, takeLatest, call, put, fork, delay } from "redux-saga/effects";
import axios from "axios";
import * as Types from './GerenalContanst';
import { getProvinceSuccess, getWardSuccess, getDistrictSuccess } from "./GeneralAction";

const getProvinceListFromApi = async () => {
    const response = await axios({
        method: 'get',
        url: `${process.env.APP_URL}/general/province`
    })
    return response;
}

const getDistrictListFromApi = async (idProvince) => {
  const response = await axios({
      method: 'get',
      url: `${process.env.APP_URL}/general/districts?id=${idProvince}`
  })
  return response;
}

const getWardListFromApi = async (idDistrict) => {
  const response = await axios({
      method: 'get',
      url: `${process.env.APP_URL}/shipping/wards?id=${idDistrict}`
  })
  return response;
}

/****************** Implement ********************** */
function* onGetProvinceList() {
  try {
    yield delay(500, true);
    const response = yield call(getProvinceListFromApi, "Vietnam");
    if (response.data.status_code === 200) {
      localStorage.setItem("PROVINCES", JSON.stringify(response.data.data))
      yield put(getProvinceSuccess(response.data.data));
    }
  } catch (error) {
    console.log("List Province", error);
  }
}

function* onGetDistrictList({idProvince}) {
  try {
    yield delay(500, true);
    const response = yield call(getDistrictListFromApi, idProvince);
    if (response.data.status_code === 200) {
      localStorage.setItem("DISTRICTS", JSON.stringify(response.data.data))
      yield put(getDistrictSuccess(response.data.data));
    }
  } catch (error) {
    console.log("List district", error);
  }
}

function* onGetWardList({idDistrict}) {
  try {
    yield delay(500, true);
    const response = yield call(getWardListFromApi, idDistrict);
    if (response.data.status_code === 200 && !!response.data.data) {
      localStorage.setItem("WARDS", JSON.stringify(response.data.data))
      yield put(getWardSuccess(response.data.data));
    }
  } catch (error) {
    console.log("List ward", error);
  }
}

/********************** Watcher *********************** */

function* watchOnGetProvinceList() {
  yield takeLatest(Types.GET_PROVINCE, onGetProvinceList);
}

function* watchOnGetDistrictList() {
  yield takeLatest(Types.GET_DISTRICT, onGetDistrictList);
}

function* watchOnGetWardList() {
  yield takeLatest(Types.GET_WARD, onGetWardList);
}

export default function* rootSaga() {
  yield all([
    fork(watchOnGetProvinceList),
    fork(watchOnGetWardList),
    fork(watchOnGetDistrictList)
  ]);
}
