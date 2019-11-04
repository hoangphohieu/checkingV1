import { put, takeEvery } from 'redux-saga/effects';
import getByCustomAPI from './../fetchAPI/getByCustomAPI';
import * as type from './../constants';

function* getListById(param) {     // lấy total page
      try {
            let res1 = yield getByCustomAPI(param.payload); //gọi API
            yield put({
                  type: type.GET_LIST_BY_ID_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.GET_LIST_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error.Message
                  }
            })
      }
}

function* getListDayById(param) {     // lấy total page
      try {
            let res1 = yield getByCustomAPI(param.payload); //gọi API
            yield put({
                  type: type.GET_LIST_DAY_BY_ID_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.GET_LIST_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error.Message
                  }
            })
      }
}


function* getListByCustom(param) {     // lấy total page
      try {
            let res1 = yield getByCustomAPI(param.payload); //gọi API
            yield put({
                  type: type.GET_LIST_BY_CUSTOM_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.GET_LIST_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error.Message
                  }
            })
      }
}

export const PartnerSaga = [
      takeEvery(type.GET_LIST_BY_ID_REQUEST, getListById),
      takeEvery(type.GET_LIST_DAY_BY_ID_REQUEST, getListDayById),
      takeEvery(type.GET_LIST_BY_CUSTOM_REQUEST, getListByCustom),

];   