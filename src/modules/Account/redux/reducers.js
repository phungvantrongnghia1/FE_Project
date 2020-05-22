import * as Types from './constants';
import produce from 'immer';
import { forOwn } from 'lodash';
import Cookies from 'js-cookie';

const initialState = {
  authUser: localStorage.getItem('USER')
    ? JSON.parse(localStorage.getItem('USER'))
    : null,
  isLogin: false,
  message: {},
  orders: []
};

export default function AuthReducer(state = initialState, action) {
  const { payload } = action;
  return produce(state, (draft) => {
    switch (action.type) {
      case Types.LOGIN_SUCCESS: {
        draft.authUser = payload;
        break;
      }

      case Types.LOGOUT: {
        const typeRemove = {
          get cookie() {
            Cookies.remove('cookie');
          },
          get user() {
            localStorage.removeItem('USER');
            draft.authUser = null;
          },
          get ip() {
            localStorage.removeItem('IP_ADDRESS');
          },
          get cart() {
            localStorage.removeItem('CART');
          },
          get cartId() {
            localStorage.removeItem('cartId');
          },
          get all() {
            Cookies.remove('cookie');
            localStorage.removeItem('USER');
            localStorage.removeItem('IP_ADDRESS');
            localStorage.removeItem('CART');
            localStorage.removeItem('cartId');
            draft.authUser = null;
          }
        };
        payload.map((value) => typeRemove[`${value}`]);
        break;
      }

      case Types.GET_LIST_MESSAGES_SUCCESS: {
        draft.message = payload;
        break;
      }

      case Types.IS_LOGIN: {
        draft.isLogin = payload;
        break;
      }

      case Types.ACTIVE_ORDER_SUCCESS: {
        draft.orders = draft.orders.filter((order) => order.id !== payload.id);
        break;
      }

      case Types.UPDATE_PROFILE_SUCCESS: {
        if (payload.type === 'profile') {
          forOwn(payload.data, (_value, key) => {
            draft.authUser[`${key}`] = payload.data[`${key}`];
          });
          draft.authUser.full_name = `${payload.data.first_name} ${payload.data.last_name}`;
        } else {
          draft.authUser.image = payload.image;
        }
        localStorage.setItem('USER', JSON.stringify(draft.authUser));
        break;
      }

      case Types.GET_LIST_ORDERS_SUCCESS: {
        draft.orders = payload;
        break;
      }

      case Types.ADD_WISH_LIST_SUCCESS: {
        draft.authUser.wishlist = payload.wishlist;
        draft.authUser.wishCourse = payload.wishCourse;
        localStorage.setItem('USER', JSON.stringify(draft.authUser));
        break;
      }
    }
  });
}
