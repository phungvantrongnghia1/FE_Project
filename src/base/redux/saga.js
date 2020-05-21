import { all } from 'redux-saga/effects';
import General from './General/saga';
import Home from "modules/Home/redux/sagas"
export default function* rootSaga() {
  yield all([
    General(),
    Home()
  ]);
}
