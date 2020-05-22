import { all } from 'redux-saga/effects';
import General from './General/saga';
import Home from "modules/Home/redux/sagas";
import Document from "modules/Document/redux/sagas";
import Account from 'modules/Account/redux/sagas';
export default function* rootSaga() {
  yield all([
    General(),
    Home(),
    Document(),
    Account()
  ]);
}
