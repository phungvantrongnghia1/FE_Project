import { combineReducers } from 'redux';
import GeneralReducer from './General/GeneralReducer';
import Home from "modules/Home/redux/reducer"
const rootReducer = combineReducers({
  GeneralReducer,
  Home
});
export default rootReducer;
