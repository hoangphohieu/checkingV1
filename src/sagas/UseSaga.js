import { put, takeEvery } from 'redux-saga/effects';
import getListByIdAPI from './../fetchAPI/GetListByIdAPI';
import getListByCustomAPI from './../fetchAPI/getListByCustomAPI';

import * as type from './../constants';

function* getUseInfo(param) {     // lấy total page      
      try {
            let res1 = yield getListByIdAPI(param.payload); //gọi API
            yield put({
                  type: type.GET_USE_INFO_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.GET_USE_INFO_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error
                  }
            })
      }
}

function* getListUser(param) {     // lấy total page      
      try {
            let res1 = yield getListByCustomAPI(param.payload); //gọi API
            yield put({
                  type: type.GET_LIST_USER_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.GET_USE_INFO_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error
                  }
            })
      }
}


export const UseSaga = [
      takeEvery(type.GET_USE_INFO_REQUEST, getUseInfo),
      takeEvery(type.GET_LIST_USER_REQUEST, getListUser),





];   