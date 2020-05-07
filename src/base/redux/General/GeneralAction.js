import * as Types from "./GerenalContanst";

export const showModalDynamic = (nameModal, boolean) => {
  return {
    type: Types.SHOW_MODAL_DYNAMIC,
    meta: {
      isShow: boolean,
      nameModal
    }
  };
};

export const showNotificationDynamic = (name, boolean) => {
  return {
    type: Types.SHOW_NOTIFICATION_DYNAMIC,
    meta: {
      name,
      isShow: boolean
    }
  };
};

export const loaderOthers = boolean => {
  return {
    type: Types.ON_LOADER_OTHERS,
    payload: boolean
  };
};

export const showLoader = () => {
  return {
    type: Types.ON_SHOW_LOADER
  };
};

export const hideLoader = () => {
  return {
    type: Types.ON_HIDE_LOADER
  };
};
export const showLoaderPage = () => {
  return {
    type: Types.SHOW_LOADING_PAGE
  };
};
export const hideLoaderPage = () => {
  return {
    type: Types.HIDE_LOADING_PAGE
  };
};
export const showMessError = mess => {
  return {
    type: Types.SHOW_MESS_ERROR,
    payload: mess
  };
};

export const hideMessError = mess => {
  return {
    type: Types.HIDE_MESS_ERROR,
    payload: mess
  };
};

export const showMessSuccess = mess => {
  return {
    type: Types.SHOW_MESS_SUCCESS,
    payload: mess
  };
};

export const hideMessSuccess = mess => {
  return {
    type: Types.HIDE_MESS_SUCCESS,
    payload: mess
  };
};

export const showLoadingBtn = () => {
  return {
    type: Types.SHOW_LOADING_BTN
  };
};

export const hideLoadingBtn = () => {
  return {
    type: Types.HIDE_LOADING_BTN
  };
};

export const getWidthScreen = payload => {
  return {
    type: Types.GET_WIDTH,
    payload
  };
};

export const getProvince = () => {
  return {
    type: Types.GET_PROVINCE
  };
};

export const getProvinceSuccess = payload => {
  return {
    type: Types.GET_PROVINCE_SUCCESS,
    payload
  };
};

export const getWard = idDistrict => {
  return {
    type: Types.GET_WARD,
    idDistrict
  };
};

export const getWardSuccess = payload => {
  return {
    type: Types.GET_WARD_SUCCESS,
    payload
  };
};

export const getDistrict = idProvince => {
  return {
    type: Types.GET_DISTRICT,
    idProvince
  };
};

export const getDistrictSuccess = payload => {
  return {
    type: Types.GET_DISTRICT_SUCCESS,
    payload
  };
};

export const resetWard = () => {
  return {
    type: Types.RESET_WARD
  };
};

export const onLoaderComponent = payload => {
  return {
    type: Types.ON_LOADER_COMPONENT,
    payload
  };
};

export const clearAll = type => {
  return {
    type
  };
};
