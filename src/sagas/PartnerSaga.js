import { put, takeEvery } from 'redux-saga/effects';
import getListByIdAPI from './../fetchAPI/GetListByIdAPI';

import * as type from './../constants';

function* getListById(param) {     // lấy total page
      try {
            let res1 = yield getListByIdAPI(param.payload); //gọi API
            yield put({
                  type: type.GET_LIST_BY_ID_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.GET_LIST_BY_ID_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error.Message
                  }
            })
      }
}



export const PartnerSaga = [
      takeEvery(type.GET_LIST_BY_ID_REQUEST, getListById),

];   