import * as Types from './constants';

export const signUp = (info) => {
  return {
    type: Types.SIGNUP,
    payload: info
  };
};

export const signUpSuccess = () => {
  return {
    type: Types.SIGNUP_SUCCESS
  };
};

export const showModalLogin = (payload) => {
  return {
    type: Types.IS_LOGIN,
    payload
  };
};

export const login = (account) => {
  return {
    type: Types.LOGIN,
    payload: account
  };
};

export const loginSuccess = (data) => {
  return {
    type: Types.LOGIN_SUCCESS,
    payload: data
  };
};

export const logOut = (payload = ['all']) => {
  return {
    type: Types.LOGOUT,
    payload
  };
};

export const forgotPassword = (email) => {
  return {
    type: Types.FORGOT_PASSWORD,
    payload: email
  };
};

export const forgotPasswordSuccess = () => {
  return {
    type: Types.FORGOT_PASSWORD_SUCCESS
  };
};

export const resetPassword = (info) => {
  return {
    type: Types.RESET_PASSWORD,
    payload: info
  };
};

export const resetPasswordSuccess = () => {
  return {
    type: Types.RESET_PASSWORD_SUCCESS
  };
};

export const activeUser = (token) => {
  return {
    type: Types.ACTIVE_USER,
    payload: token
  };
};

export const activeUserSuccess = () => {
  return {
    type: Types.ACTIVE_USER_SUCCESS
  };
};
export const getOC = (callback) => {
  return {
    type: Types.GET_OC,
    callback
  };
};

export const getOCSuccess = (ocPoint) => {
  return {
    type: Types.GET_OC_SUCCESS,
    payload: ocPoint
  };
};

export const changePassword = (info) => {
  return {
    type: Types.CHANGE_PASSWORD,
    payload: info
  };
};

export const changePasswordSuccess = () => {
  return {
    type: Types.CHANGE_PASSWORD_SUCCESS
  };
};

export const getOrder = (token) => {
  return {
    type: Types.GET_ORDER,
    payload: token
  };
};

export const getOrderSuccess = (data) => {
  return {
    type: Types.GET_ORDER_SUCCESS,
    payload: data
  };
};

export const updateProfile = (payload) => {
  return {
    type: Types.UPDATE_PROFILE,
    payload
  };
};

export const updateProfileSuccess = (payload) => {
  return {
    type: Types.UPDATE_PROFILE_SUCCESS,
    payload
  };
};

export const checkTokenPassWord = (data) => {
  return {
    type: Types.CHECK_TOKEN_PASSWORD,
    payload: data
  };
};

export const getListMessage = (strQuery) => ({
  type: Types.GET_LIST_MESSAGES,
  meta: { strQuery }
});

export const getListMessageSuccess = (payload) => ({
  type: Types.GET_LIST_MESSAGES_SUCCESS,
  payload
});

export const addWishList = (data) => ({
  type: Types.ADD_WISH_LIST,
  meta: { data }
});

export const addWishListSuccess = (payload) => ({
  type: Types.ADD_WISH_LIST_SUCCESS,
  payload
});

export const getListOrders = (strQuery) => ({
  type: Types.GET_LIST_ORDERS,
  meta: { strQuery }
});

export const getListOrdersSuccess = (payload) => ({
  type: Types.GET_LIST_ORDERS_SUCCESS,
  payload
});

export const checkAuth = (token) => ({
  type: Types.CHECK_AUTH,
  meta: { token }
});

export const addReview = (payload) => ({
  type: Types.ADD_REVIEW,
  payload
});

export const activeOrder = ({ data, cbError, cbSuccess, cbLoader }) => ({
  type: Types.ACTIVE_ORDER,
  payload: { data, cbError, cbSuccess, cbLoader }
});

export const activeOrderSuccess = (payload) => ({
  type: Types.ACTIVE_ORDER_SUCCESS,
  payload
});
