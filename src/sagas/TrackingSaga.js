import { put, takeEvery } from 'redux-saga/effects';
import getTrackingAPI from './../fetchAPI/GetTrackingAPI';
import * as type from './../constants';




function* getTracking(param) {     // lấy total page
      try {
            let res1 = yield getTrackingAPI(param.payload); //gọi API
            yield put({
                  type: type.GET_TRACKING_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.GET_TRACKING_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error
                  }
            })
      }
}

export const TrackingSaga = [
      takeEvery(type.GET_TRACKING_REQUEST, getTracking),
      



];   