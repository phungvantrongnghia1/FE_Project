import { combineReducers } from 'redux';
import GeneralReducer from './General/GeneralReducer';
import Home from "modules/Home/redux/reducer";
import Document from "modules/Document/redux/reducer";
import AuthReducer from 'modules/Account/redux/reducers';

const rootReducer = combineReducers({
  GeneralReducer,
  Home,
  Document,
  AuthReducer
});
export default rootReducer;
