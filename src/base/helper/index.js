import _ from 'lodash';
import moment from 'moment';

export const formatCurrency = number => {
  if (!_.isNaN(number)) {
    let arr = number.toString().split('.');
    let firstNum = arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let newNum = !!arr[1] ? firstNum.concat('.', arr[1]) : firstNum;
    return newNum;
  }
};

export const compareDate = (promotionFrom, promotionTo) => {
  let isPromotion = false;
  if (promotionFrom && promotionTo) {
    if (moment(promotionTo).diff(new Date(), 'minutes') >= 0 && moment(promotionFrom).diff(new Date(), 'minutes') <= 0)
      isPromotion = true;
  }
  return isPromotion;
};

export const getTotalPrice = arr => {
  return arr.reduce((sum, item) => {
    return sum + item.pricePromotion;
  }, 0);
};

export const getCookie = name => {
  let nameEQ = name + '=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const setCookie = (name, value, days) => {
  let expires = '';
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/; secure';
};

export const delCookie = name => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

/**
 * @function getOSDevice
 * @summary get os_device to submit add to cart
 */
export const getOSDevice = () => {
  let os_device = '';
  if (window.navigator.userAgent.indexOf('Win') !== -1) {
    os_device = 'Windows OS';
  }
  if (window.navigator.userAgent.indexOf('Mac') !== -1) {
    os_device = 'Mac OS';
  }
  if (window.navigator.userAgent.indexOf('Linux') !== -1) {
    os_device = 'Linux OS';
  }
  return os_device;
};
export const urltoFile = (url, filename, mimeType) => {
  mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
  return fetch(url)
    .then(function(res) {
      return res.arrayBuffer();
    })
    .then(function(buf) {
      return new File([buf], filename, { type: mimeType });
    });
};
