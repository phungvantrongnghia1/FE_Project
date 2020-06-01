import axios from "axios";

export const signUpFromApi = async data => {
  const request = await axios({
    method: "post",
    url: `${process.env.APP_URL}/user/register`,
    data
  });
  return request;
};

export const loginFromApi = async data => {
  const request = await axios({
    method: "post",
    url: `${process.env.APP_URL}/user/login`,
    data
  });
  return request;
};

export const apiLoginSocial = async data => {
  const request = await axios({
    method: "post",
    url: `${process.env.APP_URL}/customer/social-login`,
    data
  });
  return request;
};

export const activeUserFromApi = async data => {
  const request = await axios({
    method: "post",
    url: `${process.env.APP_URL}/customer/active-account`,
    data
  });
  return request;
};

export const forgotPasswordFromApi = async data => {
  const request = await axios({
    method: "post",
    url: `${process.env.APP_URL}/customer/forgot-password`,
    data
  });
  return request;
};

export const checkTokenPasswordFromApi = async data => {
  const request = await axios({
    method: "post",
    url: `${process.env.APP_URL}/customer/forgot-check`,
    data
  });
  return request;
};

export const resetPasswordFromApi = async data => {
  const request = await axios({
    method: "post",
    url: `${process.env.APP_URL}/customer/new-password`,
    data
  });
  return request;
};

export const getInfoUserFromAPI = async token => {
  const request = await axios({
    method: "get",
    headers: { Authorization: `${token}` },
    url: `${process.env.APP_URL}/auth/get-info-customer`
  });
  return request;
};

export const changePasswordFromApi = async (data, token) => {
  const request = await axios({
    method: "post",
    headers: { Authorization: token },
    url: `${process.env.APP_URL}/customer/change-password`,
    data
  });
  return request;
};

export const getOrderFromApi = async token => {
  const request = await axios({
    method: "get",
    headers: { Authorization: token },
    url: `${process.env.APP_URL}/order`
  });
  return request;
};

export const updateProfileFromApi = async (data, token) => {
  const request = await axios({
    method: "post",
    headers: { Authorization: token },
    url: `${process.env.APP_URL}/customer/update-profile`,
    data
  });
  return request;
};

export const apiGetListMessage = async (strQuery, token) =>
  await axios({
    method: "get",
    headers: { Authorization: token },
    url: !!strQuery
      ? `${process.env.APP_URL}/customer/list-message?limit=4${strQuery}`
      : `${process.env.APP_URL}/customer/list-message?limit=4`
  });
