import * as Types from "./GerenalContanst";

const initialState = {
  loader: false,
  flagError: false,
  flagSuccess: false,
  loadingBTN: false,
  loaderOthers: false,
  loadingPage:false,
  loaderComponent: false,
  messAlert: "",
  width: window.innerWidth,
  listProvince: localStorage.getItem("PROVINCES") ? JSON.parse(localStorage.getItem("PROVINCES")) : [],
  listWard: localStorage.getItem("WARDS") ? JSON.parse(localStorage.getItem("WARDS")) : [],
  listDistrict: localStorage.getItem("DISTRICTS") ? JSON.parse(localStorage.getItem("DISTRICTS")) : []
};

export default (state = initialState, action) => {
  const { payload, meta } = action;
  switch (action.type) {
    case Types.SHOW_MODAL_DYNAMIC:
      return {
        ...state,
        [`${meta.nameModal}`]: meta.isShow
      };
    case Types.SHOW_NOTIFICATION_DYNAMIC:
      return {
        ...state,
        [`${meta.name}`]: meta.isShow
      };
    case Types.ON_SHOW_LOADER:
      return {
        ...state,
        loader: true
      };
      case Types.ON_LOADER_OTHERS:
        return {
          ...state,
          loaderOthers: payload
        };
    case Types.ON_HIDE_LOADER: {
      return {
        ...state,
        loader: false
      };
    }
    case Types.GET_WIDTH:
      return {
        ...state,
        width: payload
      };
    case Types.HIDE_LOADING_BTN:
      return {
        ...state,
        loadingBTN: false
      };
    case Types.SHOW_LOADING_BTN: {
      return {
        ...state,
        loadingBTN: true
      };
    }
    case Types.SHOW_LOADING_PAGE: {
      return {
        ...state,
        loadingPage: true
      };
    }
    case Types.HIDE_LOADING_PAGE: {
      return {
        ...state,
        loadingPage: false
      };
    }
    case Types.SHOW_MESS_ERROR: {
      return {
        ...state,
        flagError: true,
        messAlert: payload
      };
    }
    case Types.HIDE_MESS_ERROR: {
      return {
        ...state,
        flagError: false,
        messAlert: ""
      };
    }
    case Types.SHOW_MESS_SUCCESS: {
      return {
        ...state,
        flagSuccess: true,
        messAlert: payload
      };
    }
    case Types.HIDE_MESS_SUCCESS: {
      return {
        ...state,
        flagSuccess: false,
        messAlert: ""
      };
    }
    case Types.GET_PROVINCE_SUCCESS: {
      return {
        ...state,
        listProvince: payload
      };
    }
    case Types.GET_DISTRICT_SUCCESS: {
      return {
        ...state,
        listDistrict: payload
      };
    }
    case Types.GET_WARD_SUCCESS: {
      return {
        ...state,
        listWard: payload
      };
    }
    case Types.RESET_WARD: {
      return {
        ...state,
        listWard: []
      };
    }
    case Types.ON_LOADER_COMPONENT: {
      return {
        ...state,
        loaderComponent: payload
      }
    }
    default:
      return state;
  }
};
