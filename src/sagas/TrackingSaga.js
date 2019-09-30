import { put, takeEvery } from 'redux-saga/effects';
import PatchItemsTrackingControllAPI from './../fetchAPI/PatchItemsTrackingControllAPI';
import getItemTrackingFailAPI from './../fetchAPI/GetItemTrackingFailAPI';
import postListItemCountAPI from './../fetchAPI/PostListItemCountAPI';
import * as type from './../constants';


function* patchTracking(param) {     // lấy total page
      try {
            let res1 = yield PatchItemsTrackingControllAPI(param.payload); //gọi API

            yield put({

                  type: type.PATCH_ITEM_TRACKING_CONTROL_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.PATCH_ITEM_TRACKING_CONTROL_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error
                  }
            })
      }
}

function* getItemTrackingFail(param) {     // lấy total page
      try {
            let res1 = yield getItemTrackingFailAPI(param.payload); //gọi API
            yield put({
                  type: type.GET_ITEM_TRACKING_FAIL_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.GET_ITEM_TRACKING_FAIL_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error
                  }
            })
      }
}

function* postListTrackingCount(param) {     // lấy total page
      try {
            let res1 = yield postListItemCountAPI(param.payload); //gọi API
            yield put({
                  type: type.POST_LIST_TRACKING_COUNT_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.POST_LIST_TRACKING_COUNT_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error
                  }
            })
      }
}

export const TrackingSaga = [
      takeEvery(type.PATCH_ITEM_TRACKING_CONTROL_REQUEST, patchTracking),
      takeEvery(type.GET_ITEM_TRACKING_FAIL_REQUEST, getItemTrackingFail),
      takeEvery(type.POST_LIST_TRACKING_COUNT_REQUEST, postListTrackingCount),



];   