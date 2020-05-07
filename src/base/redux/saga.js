import { all } from 'redux-saga/effects';
import General from './General/saga';

export default function* rootSaga() {
  yield all([
    General()
  ]);
}
